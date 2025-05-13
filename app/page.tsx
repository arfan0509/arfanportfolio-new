"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLaravel,
  faReact,
  faNodeJs,
  faJs,
  faCss3Alt,
  faInstagram,
  faSteam,
  faDiscord,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import ProjectsComponent from "../components/ProjectsComponent";
import AnimatedTitle from "../components/animated-title";
import TypewriterLoop from "../components/TypewriterLoop";
import MiniGame from "../components/MiniGame";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home");
  const sections = [
    "home",
    "about",
    "experience",
    "achievements",
    "projects",
    "contact",
  ];

  // Mobile navigation state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const achievementsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  // Adjust threshold for better section detection
  const homeInView = useInView(homeRef, { amount: 0.3 });
  const aboutInView = useInView(aboutRef, { amount: 0.3 });
  const experienceInView = useInView(experienceRef, { amount: 0.3 });
  const achievementsInView = useInView(achievementsRef, { amount: 0.3 });
  const projectsInView = useInView(projectsRef, { amount: 0.3 });
  const contactInView = useInView(contactRef, { amount: 0.3 });

  useEffect(() => {
    // Gunakan pendekatan prioritas untuk section yang tepat
    if (homeInView) {
      setActiveSection("home");
    }
    if (aboutInView) {
      setActiveSection("about");
    }
    if (experienceInView) {
      setActiveSection("experience");
    }
    if (achievementsInView) {
      setActiveSection("achievements");
    }
    if (projectsInView) {
      setActiveSection("projects");
    }
    if (contactInView) {
      setActiveSection("contact");
    }
  }, [
    homeInView,
    aboutInView,
    experienceInView,
    achievementsInView,
    projectsInView,
    contactInView,
  ]);

  const { scrollYProgress } = useScroll();
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Close mobile menu when clicking a section
  const handleSectionClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="relative bg-black text-white min-h-screen">
      {/* Progress Bar */}
      <motion.div
        className="fixed left-0 top-0 bottom-0 w-1 bg-amber-500 origin-top z-50"
        style={{ height: progressHeight }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold text-amber-500"
          >
            Arfan Astaraja
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex space-x-6"
          >
            {sections.map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={`capitalize transition-colors ${
                  activeSection === section
                    ? "text-amber-500"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {section}
              </a>
            ))}
          </motion.div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              <div className="w-6 flex flex-col items-end justify-center">
                <span
                  className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                    mobileMenuOpen
                      ? "rotate-45 translate-y-1"
                      : "-translate-y-0.5"
                  }`}
                ></span>
                <span
                  className={`bg-white block transition-all duration-300 ease-out h-0.5 w-5 rounded-sm my-0.5 ${
                    mobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`bg-white block transition-all duration-300 ease-out h-0.5 w-4 rounded-sm ${
                    mobileMenuOpen
                      ? "-rotate-45 -translate-y-1"
                      : "translate-y-0.5"
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-zinc-900 border-t border-zinc-800"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {sections.map((section) => (
                  <a
                    key={section}
                    href={`#${section}`}
                    onClick={handleSectionClick}
                    className={`capitalize transition-colors py-2 ${
                      activeSection === section
                        ? "text-amber-500"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {section}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        ref={homeRef}
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
      >
        <ParticleBackground />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4"
            >
              {Array.from("Arfan").map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 * index,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
              <span className="mx-2"></span>
              {Array.from("Astaraja").map((letter, index) => (
                <motion.span
                  key={index + 5}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 * (index + 5),
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  className="inline-block text-amber-500"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-300"
            >
              <motion.span
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 1.5 }}
                className="inline-block overflow-hidden whitespace-nowrap"
              >
                Frontend & Backend Web Developer
              </motion.span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12"
            >
              <div className="flex items-center gap-2 text-gray-300">
                <Phone size={16} className="text-amber-500" />
                <span>+62851-7424-8344</span>
              </div>
              <div className="hidden md:block h-4 w-px bg-gray-700"></div>
              <div className="flex items-center gap-2 text-gray-300">
                <Mail size={16} className="text-amber-500" />
                <span>arfandev.id@gmail.com</span>
              </div>
              <div className="hidden md:block h-4 w-px bg-gray-700"></div>
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin size={16} className="text-amber-500" />
                <span>Kediri, Indonesia</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <a
                href="#about"
                className="inline-flex items-center gap-2 bg-amber-500 text-black px-6 py-3 rounded-full font-medium hover:bg-amber-600 transition-colors"
              >
                Explore My Work
                <ArrowDown size={16} />
              </a>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-0 right-0 flex justify-center"
        >
          <a href="#about" className="animate-bounce">
            <ArrowDown size={24} className="text-amber-500" />
          </a>
        </motion.div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={aboutRef}
        className="py-16 md:py-20 min-h-screen flex items-center"
      >
        <div className="container mx-auto px-4">
          <SectionHeader title="About Me" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mt-12 md:mt-16">
            {/* Image section remains unchanged */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="w-[200px] h-[200px] md:w-[280px] md:h-[280px] mx-auto rounded-full overflow-hidden border-4 border-amber-500/30">
                <img
                  src="/about.jpg"
                  alt="Arfan Astaraja"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-12 md:mt-0"
            >
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                I'm Arfan <span className="text-amber-500">Astaraja</span>
              </h3>

              <TypewriterLoop
                phrases={[
                  "I began my journey in web development with a focus on frontend development using React and Laravel. Over time, I also deepened my expertise in backend development, particularly with Node.js. My passion for technology continuously drives me to learn and grow, creating digital solutions that are not only functional but also efficient and elegant.",

                  "Sometimes I push rank in Mobile Legends or Honor of Kings, and other times I enjoy hunting monsters with Switch Axe in Monster Hunter. When boredom hits, Call of Duty Mobile is my go-to escape. For me, gaming isn't just entertainment—it's a fun way to sharpen strategic thinking, boost reaction time, and strengthen creative problem-solving skills.",

                  "My ideal weekend? A refreshing swim and food adventure. Exploring flavors and vibes is just as exciting to me as exploring new tools or frameworks. Swimming clears my mind and gives me balance after long hours at my desk, while trying out new food introduces me to different cultures and ways of seeing the world. It's my perfect balance to coding.",
                ]}
                typingSpeed={10} // Faster typing speed
                deletingSpeed={5} // Faster deleting speed
                pauseDuration={8000} // 3 second pause between phrases
                className="text-gray-300 mb-6 md:mb-4 min-h-[220px] md:min-h-[120px]" // Adjusted height for content
              />

              <div className="mt-6 md:mt-4">
                <h3 className="text-lg font-semibold mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-amber-100/20 text-amber-500 px-4 py-2 rounded-full flex items-center gap-2 border border-amber-500/30">
                    <FontAwesomeIcon icon={faLaravel} className="w-5 h-5" />
                    Laravel
                  </span>
                  <span className="bg-amber-100/20 text-amber-500 px-4 py-2 rounded-full flex items-center gap-2 border border-amber-500/30">
                    <FontAwesomeIcon icon={faReact} className="w-5 h-5" />
                    React
                  </span>
                  <span className="bg-amber-100/20 text-amber-500 px-4 py-2 rounded-full flex items-center gap-2 border border-amber-500/30">
                    <FontAwesomeIcon icon={faNodeJs} className="w-5 h-5" />
                    Node.js
                  </span>
                  <span className="bg-amber-100/20 text-amber-500 px-4 py-2 rounded-full flex items-center gap-2 border border-amber-500/30">
                    <FontAwesomeIcon icon={faJs} className="w-5 h-5" />
                    Express
                  </span>
                  <span className="bg-amber-100/20 text-amber-500 px-4 py-2 rounded-full flex items-center gap-2 border border-amber-500/30">
                    <FontAwesomeIcon icon={faCss3Alt} className="w-5 h-5" />
                    Tailwind
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  href="#experience"
                  className="bg-amber-500 text-black px-6 py-3 rounded-full font-medium hover:bg-amber-600 transition-colors"
                >
                  Experience
                </Link>
                <Link
                  href="https://drive.google.com/uc?export=download&id=1uJuCELhZ_PMEuimzvRKZtU8v1wHwYVxV"
                  target="_blank"
                  className="border border-amber-500 text-amber-500 px-6 py-3 rounded-full font-medium hover:bg-amber-500/10 transition-colors"
                >
                  Download CV
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        ref={experienceRef}
        className="py-16 md:py-20 min-h-screen flex items-center bg-zinc-900"
      >
        <div className="container mx-auto px-4">
          <SectionHeader title="Experience" />

          <div className="mt-12 md:mt-16 relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-amber-500/30"></div>

            <ExperienceItem
              company="PT Pyxis Ultimate Solution"
              position="Web Developer - Internship"
              period="Aug 2024 – Dec 2024"
              location="Malang, Indonesia – On-site"
              description={[
                "Built a web system using React integrated with WebSocket to ensure machine data can be monitored in real-time and connected with other applications that need the data.",
                "Implemented encryption and decryption processes using the AES-256 algorithm to maintain security and integrity of data processed in the system.",
                "Collaborated with cross-functional teams to ensure that solutions built meet operational needs and improve production process efficiency.",
                "Developed simple and easy-to-use user interfaces, optimizing frontend performance and APIs from PT Pyxis.",
              ]}
              index={0}
            />

            <ExperienceItem
              company="Infinite Learning Indonesia"
              position="Web Development & UI UX Design - Internship"
              period="Feb 2024 – Jun 2024"
              location="Batam, Indonesia – Remote"
              description={[
                "Conducted Project Research and Development, UI/UX Design, and web prototyping using Figma.",
                "Built the PetPals Care website, a platform to find nearby veterinarians in the Kediri area, conduct online consultations, and adopt pets to reduce the number of stray animals.",
                "Website developed using React and Tailwind CSS, with Node.js (Express) backend.",
              ]}
              index={1}
            />

            <ExperienceItem
              company="Dicoding Indonesia"
              position="Front-End Web and Back-End Development - Internship"
              period="Aug 2023 – Dec 2023"
              location="Bandung, Indonesia – Remote"
              description={[
                "Learned frontend basics with JavaScript using Browser Object Model (BOM) and Document Object Model (DOM).",
                "Created a restaurant catalog website using JavaScript, Webpack, and Progressive Web App (PWA), and performed testing and optimization.",
                "Built the SatuHati website using Laravel for harassment reporting and real-time discussion forums about harassment.",
              ]}
              index={2}
            />
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section
        id="achievements"
        ref={achievementsRef}
        className="py-16 md:py-20 min-h-screen flex items-center bg-zinc-900"
      >
        <div className="container mx-auto px-4">
          <SectionHeader title="Achievements" />

          <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-zinc-800 rounded-xl p-6 md:p-8 border-l-4 border-amber-500 hover:shadow-lg hover:shadow-amber-500/20 transition-all"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">Best Massive Project</h3>
                  <p className="text-amber-500">
                    Infinite Learning X Kampus Merdeka
                  </p>
                </div>
                <span className="text-gray-400 mt-2 sm:mt-0">June 2024</span>
              </div>
              <p className="text-gray-300 mb-4">
                Recognized for outstanding contribution and innovative approach
                in developing the PetPals Care platform.
              </p>
              <a
                href="https://drive.google.com/file/d/17VemOBLioqEKr7FXMUnglKvaYuXL7llE/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors"
              >
                <span className="text-sm">View Credential</span>
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className="w-3 h-3"
                />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-zinc-800 rounded-xl p-6 md:p-8 border-l-4 border-amber-500 hover:shadow-lg hover:shadow-amber-500/20 transition-all"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">Best Capstone Project</h3>
                  <p className="text-amber-500">
                    SIB Dicoding X Kampus Merdeka
                  </p>
                </div>
                <span className="text-gray-400 mt-2 sm:mt-0">
                  December 2023
                </span>
              </div>
              <p className="text-gray-300 mb-4">
                Awarded for the development of SatuHati, a platform addressing
                social issues through technology.
              </p>
              <a
                href="https://drive.google.com/file/d/1CLdor6bajs1h0lqdwmEPkZZFXL-oEiga/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors"
              >
                <span className="text-sm">View Credential</span>
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className="w-3 h-3"
                />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-zinc-800 rounded-xl p-6 md:p-8 border-l-4 border-amber-500 hover:shadow-lg hover:shadow-amber-500/20 transition-all"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">
                    Frontend Web Dev Certification
                  </h3>
                  <p className="text-amber-500">Dicoding</p>
                </div>
                <span className="text-gray-400 mt-2 sm:mt-0">
                  November 2023
                </span>
              </div>
              <p className="text-gray-300 mb-4">
                Completed an expert-level course focused on building accessible,
                responsive, high-performance front-end web apps with
                mobile-first design, PWA features, automation testing, and CI/CD
                deployment.
              </p>
              <a
                href="https://www.dicoding.com/certificates/53XE468RYZRN"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors"
              >
                <span className="text-sm">View Credential</span>
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className="w-3 h-3"
                />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-zinc-800 rounded-xl p-6 md:p-8 border-l-4 border-amber-500 hover:shadow-lg hover:shadow-amber-500/20 transition-all"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">
                    Software Developer Career Preparation
                  </h3>
                  <p className="text-amber-500">Dicoding</p>
                </div>
                <span className="text-gray-400 mt-2 sm:mt-0">October 2023</span>
              </div>
              <p className="text-gray-300 mb-4">
                Completed a career-focused certification program in Software
                Development fundamentals, covering industry-standard career
                paths including Android, iOS, Flutter, Front-End Web, Machine
                Learning, and Azure Cloud development, with insights from expert
                developers.
              </p>
              <a
                href="https://www.dicoding.com/certificates/KEXLLV520XG2"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors"
              >
                <span className="text-sm">View Credential</span>
                <FontAwesomeIcon
                  icon={faArrowUpRightFromSquare}
                  className="w-3 h-3"
                />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        ref={projectsRef}
        className="py-16 md:py-20 min-h-screen flex items-center"
      >
        <div className="container mx-auto px-4">
          <SectionHeader title="Projects" />

          <div className="mt-12 md:mt-16">
            <ProjectsComponent />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={contactRef}
        className="py-16 md:py-20 min-h-screen flex items-center bg-zinc-900 relative overflow-hidden"
      >
        <ParticleBackground />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader title="Get In Touch" />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12"
          >
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-zinc-800 p-6 md:p-8 rounded-xl border-l-4 border-amber-500 shadow-lg"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl md:text-2xl font-bold mb-6 text-amber-500">
                Contact Information
              </h3>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-amber-500/10 rounded-full">
                    <Mail className="text-amber-500" size={20} />
                  </div>
                  <div>
                    <h4 className="text-gray-400">Email</h4>
                    <a
                      href="mailto:arfandev.id@gmail.com"
                      className="text-white hover:text-amber-500 transition-colors break-all"
                    >
                      arfandev.id@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-amber-500/10 rounded-full">
                    <Phone className="text-amber-500" size={20} />
                  </div>
                  <div>
                    <h4 className="text-gray-400">Phone</h4>
                    <a
                      href="tel:+6285174248344"
                      className="text-white hover:text-amber-500 transition-colors"
                    >
                      +62 851-7424-8344
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-amber-500/10 rounded-full">
                    <MapPin className="text-amber-500" size={20} />
                  </div>
                  <div>
                    <h4 className="text-gray-400">Location</h4>
                    <p className="text-white">Kediri, Indonesia</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-10 pt-8 border-t border-zinc-700">
                <h4 className="text-gray-400 mb-4">Connect with me</h4>
                <div className="flex flex-wrap gap-4">
                  {[
                    {
                      icon: (
                        <FontAwesomeIcon
                          icon={faLinkedin}
                          className="w-5 h-5"
                        />
                      ),
                      url: "https://www.linkedin.com/in/arfan-astaraja/",
                      label: "LinkedIn",
                    },
                    {
                      icon: (
                        <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
                      ),
                      url: "https://github.com/arfan0509",
                      label: "GitHub",
                    },
                    {
                      icon: (
                        <FontAwesomeIcon
                          icon={faInstagram}
                          className="w-5 h-5"
                        />
                      ),
                      url: "https://www.instagram.com/arfan_a_r/",
                      label: "Instagram",
                    },
                    {
                      icon: (
                        <FontAwesomeIcon icon={faSteam} className="w-5 h-5" />
                      ),
                      url: "https://steamcommunity.com/profiles/76561198887227378",
                      label: "Steam",
                    },
                    {
                      icon: (
                        <FontAwesomeIcon icon={faDiscord} className="w-5 h-5" />
                      ),
                      url: "https://discordapp.com/users/291123703654121472",
                      label: "Discord",
                    },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="p-3 bg-zinc-700 rounded-full hover:bg-amber-500 hover:text-black transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Game */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-zinc-800 p-4 md:p-6 rounded-xl shadow-lg border border-zinc-700"
            >
              <h3 className="text-xl font-bold text-white mb-4">
                Tech Memory Match
              </h3>
              <MiniGame />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 md:py-8 bg-black border-t border-zinc-800">
        <div className="container mx-auto px-4">
          <p className="text-gray-400 text-center">
            © 2025 Arfan Astaraja. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Components
function ParticleBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <div id="particles-js" className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 md:w-2 md:h-2 bg-amber-500 rounded-full"
            initial={{ opacity: 0 }}
            animate={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: 0.8,
              transition: {
                duration: Math.random() * 20 + 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              },
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black"></div>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return <AnimatedTitle title={title} />;
}

function ExperienceItem({
  company,
  position,
  period,
  location,
  description,
  index,
}: {
  company: string;
  position: string;
  period: string;
  location: string;
  description: string[];
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`relative mb-12 ${
        isEven ? "md:pr-12 md:text-right" : "md:pl-12"
      } md:w-1/2 ${isEven ? "md:ml-0" : "md:ml-auto"}`}
    >
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-zinc-800 p-6 rounded-lg border-l-4 border-amber-500"
      >
        <div
          className={`absolute top-6 ${
            isEven ? "md:-right-3" : "md:-left-3"
          } hidden md:block w-6 h-6 rounded-full bg-amber-500 border-4 border-zinc-900`}
        ></div>

        <h3 className="text-xl font-bold">{company}</h3>
        <p className="text-amber-500 mb-2">{position}</p>
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 text-sm text-gray-400 mb-4">
          <span>{period}</span>
          <span className="hidden md:block">•</span>
          <span>{location}</span>
        </div>

        <ul className="space-y-2 text-gray-300">
          {description.map((item, i) => (
            <li key={i} className="flex items-start">
              <span className="text-amber-500 mr-2 mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
