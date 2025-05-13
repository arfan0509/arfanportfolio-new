// components/TypewriterLoop.js
import { useState, useEffect, useRef } from "react";

const TypewriterLoop = ({
  phrases,
  typingSpeed = 10,
  deletingSpeed = 1,
  pauseDuration = 8000,
  className = "",
}) => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1, // Aktif ketika 10% komponen terlihat
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const currentPhrase = phrases[currentIndex % phrases.length];

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing phase
        setText(currentPhrase.substring(0, text.length + 1));

        if (text === currentPhrase) {
          // Pause at end of typing
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        // Deleting phase
        setText(currentPhrase.substring(0, text.length - 1));

        if (text === "") {
          setIsDeleting(false);
          setCurrentIndex(currentIndex + 1);
        }
      }
    };

    const timer = setTimeout(
      handleTyping,
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [
    text,
    isDeleting,
    currentIndex,
    phrases,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    isActive, // Tambahkan isActive ke dependencies
  ]);

  return (
    <div ref={ref} className={className}>
      {text}
      {isActive && <span className="animate-pulse">|</span>}{" "}
      {/* Cursor hanya muncul ketika aktif */}
    </div>
  );
};

export default TypewriterLoop;
