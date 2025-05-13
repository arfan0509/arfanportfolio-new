"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

export default function ProjectsComponent() {
  const [activeFilter, setActiveFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "Medipaws Expert",
      description:
        "Web-based expert system using Dempster-Shafer method for early diagnosis of cat diseases and treatment recommendations.",
      image: "project1.png",
      category: "web",
      technologies: [
        "React.js",
        "Typescript",
        "Node.js",
        "TailwindCSS",
        "MySQL",
      ],
      links: {
        live: "https://medipaws-expert.my.id/",
        github: "https://github.com/username/medipaws",
      },
    },
    {
      id: 2,
      title: "Petpals Care",
      description:
        "Application for finding veterinarians and an online pet adoption platform connecting owners with pet care services.",
      image: "project2.png",
      category: "web",
      technologies: ["React.js", "Node.js", "TailwindCSS", "Express", "MySQL"],
      links: {
        live: "https://petpals-care.vercel.app/",
        github: "https://github.com/username/petpals-care",
      },
    },
    {
      id: 3,
      title: "SatuHati",
      description:
        "Educational platform and discussion forum addressing sexual harassment stigma and providing support for victims.",
      image: "project3.png",
      category: "web",
      technologies: ["Laravel", "MySQL", "TailwindCSS", "jQuery"],
      links: {
        github: "https://github.com/CodeWithRey/satu-hati.git",
      },
    },
    {
      id: 4,
      title: "Roid Resto Catalog",
      description:
        "Responsive web application with mobile-first design, PWA features, and automated testing using CI/CD deployment.",
      image: "project4.png",
      category: "web",
      technologies: [
        "JavaScript",
        "HTML5",
        "CSS3",
        "PWA",
        "Jest",
        "Webpack",
        "API",
      ],
      links: {
        live: "https://roidresto-dist.vercel.app/",
        github: "https://github.com/username/resto-catalog",
      },
    },
    {
      id: 5,
      title: "Movie Catalog",
      description:
        "Web application displaying the latest movies currently showing along with their complete information.",
      image: "project5.png",
      category: "web",
      technologies: [
        "Javascript",
        "API TMDb",
        "HTML5",
        "CSS3",
        "Jest",
        "Webpack",
      ],
      links: {
        live: "https://movie-catalogue-one.vercel.app/",
        github: "https://github.com/username/movie-catalog",
      },
    },
    {
      id: 6,
      title: "Addictive Clothing App",
      description:
        "Mobile application for a clothing store SME in Kediri as a product promotion media and online ordering platform.",
      image: "project6.png",
      category: "mobile",
      technologies: ["Flutter", "Dart", "UI/UX Design", "MySQL"],
      links: {
        github: "https://github.com/arfan0509/Adictcloth-Mobile.git",
      },
    },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex justify-center mb-8 px-4"
      >
        <div className="flex flex-wrap justify-center gap-2 bg-zinc-900 p-2 rounded-full">
          {["all", "web", "mobile"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base transition-colors ${
                activeFilter === filter
                  ? "bg-amber-500 text-black"
                  : "text-white hover:bg-zinc-800"
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="bg-zinc-900 rounded-lg overflow-hidden group"
          >
            <div className="relative overflow-hidden h-48 sm:h-56">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-amber-500 text-black p-2 rounded-full hover:bg-amber-600 transition-colors"
                    aria-label="Visit Live Site"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-zinc-800 text-white p-2 rounded-full hover:bg-zinc-700 transition-colors"
                  aria-label="View Source Code"
                >
                  <Github size={18} />
                </a>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-zinc-800 text-amber-500 px-2 sm:px-3 py-1 rounded-full text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
