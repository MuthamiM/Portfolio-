"use client";
import React, { useState } from "react";
import { useTheme } from "next-themes";
import { CiLocationArrow1 } from "react-icons/ci";
import { projects } from "@/data/data";
import Link from "next/link";
import Image from "next/image";

const Projects = () => {
  const { theme } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeImageIndexes, setActiveImageIndexes] = useState<Record<string, number>>({});

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "Released":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "In Development":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getCardClass = (index: number) => {
    const isHovered = hoveredIndex === index;
    const baseClass =
      "group relative rounded-xl overflow-hidden transition-all duration-500 cursor-pointer";

    if (theme === "dark") {
      return `${baseClass} ${
        isHovered
          ? "bg-white/[0.06] border-white/20 shadow-lg shadow-white/5"
          : "bg-white/[0.02] border-white/[0.08] hover:border-white/15"
      } border`;
    } else {
      return `${baseClass} ${
        isHovered
          ? "bg-black/[0.04] border-black/20 shadow-lg shadow-black/10"
          : "bg-black/[0.01] border-black/[0.08] hover:border-black/15"
      } border`;
    }
  };

  const getTechClass = () => {
    return theme === "dark" ? "text-white/50" : "text-black/50";
  };

  const getDescClass = () => {
    return theme === "dark" ? "text-white/70" : "text-black/70";
  };

  const getLinkClass = (isPrimary: boolean) => {
    if (isPrimary) {
      if (theme === "dark") {
        return "bg-white text-black hover:bg-white/90 font-semibold";
      } else {
        return "bg-black text-white hover:bg-black/90 font-semibold";
      }
    } else {
      if (theme === "dark") {
        return "bg-white/10 text-white/80 hover:bg-white/20 border border-white/10";
      } else {
        return "bg-black/5 text-black/80 hover:bg-black/10 border border-black/10";
      }
    }
  };

  const getImageLabel = (path: string, index: number) => {
    if (path.includes("admin")) return "Admin Dashboard";
    if (path.includes("student")) return "Student Dashboard";
    return `View ${index + 1}`;
  };

  return (
    <section
      id="projects"
      className="flex flex-col items-center justify-center min-h-full w-full p-2.5 pl-4 md:p-8"
      suppressHydrationWarning
    >
      <div
        className="w-full max-w-3xl mx-auto space-y-4 md:space-y-6"
        suppressHydrationWarning
      >
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-widest">
            PROJECTS
          </h2>
          <p
            className={`text-xs md:text-sm mt-2 ${
              theme === "dark" ? "text-white/50" : "text-black/50"
            }`}
          >
            A selection of things I&apos;ve built
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {projects.map((project, index) => {
            const activeImageIndex = activeImageIndexes[project.name] ?? 0;
            const currentImage = project.images[activeImageIndex] || project.images[0];

            return (
              <div
                key={project.name}
                className={getCardClass(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Project Image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  <Image
                    src={currentImage}
                    alt={`${project.name} preview`}
                    fill
                    className={`object-cover transition-transform duration-700 ease-out ${
                      hoveredIndex === index ? "scale-105" : "scale-100"
                    }`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      theme === "dark"
                        ? "bg-gradient-to-t from-black/85 via-black/20 to-transparent"
                        : "bg-gradient-to-t from-white/85 via-white/20 to-transparent"
                    }`}
                  />
                  {/* Status badge */}
                  <div className="absolute top-2.5 right-2.5 z-20">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border backdrop-blur-sm ${getStatusColor(
                        project.status
                      )}`}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* Multi-image toggler */}
                  {project.images.length > 1 && (
                    <div className="absolute bottom-2.5 left-2.5 z-20 flex gap-1.5">
                      {project.images.map((img, imgIdx) => (
                        <button
                          key={imgIdx}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveImageIndexes((prev) => ({
                              ...prev,
                              [project.name]: imgIdx,
                            }));
                          }}
                          className={`px-2 py-1 rounded-md text-[9px] font-bold border backdrop-blur-sm transition-all duration-300 ${
                            activeImageIndex === imgIdx
                              ? theme === "dark"
                                ? "bg-white text-black border-white"
                                : "bg-black text-white border-black"
                              : theme === "dark"
                              ? "bg-black/60 text-white/75 border-white/10 hover:border-white/30"
                              : "bg-white/60 text-black/75 border-black/10 hover:border-black/30"
                          }`}
                        >
                          {getImageLabel(img, imgIdx)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="p-3 md:p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base md:text-lg font-bold tracking-wide leading-tight">
                      {project.name}
                    </h3>
                  </div>
                  <p
                    className={`text-[10px] md:text-xs font-medium tracking-wide ${getTechClass()}`}
                  >
                    {project.tech}
                  </p>
                  <p
                    className={`text-xs md:text-sm leading-relaxed ${getDescClass()}`}
                  >
                    {project.desc}
                  </p>

                  {/* Action buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-3 py-1.5 rounded-lg text-[11px] md:text-xs transition-all duration-300 ${getLinkClass(
                        false
                      )}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Source Code
                    </Link>
                    {project.liveLink && project.liveLink !== "#" && (
                      <Link
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-3 py-1.5 rounded-lg text-[11px] md:text-xs transition-all duration-300 flex items-center gap-1 ${getLinkClass(
                          true
                        )}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Live Demo
                        <CiLocationArrow1 className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Link
          href="https://github.com/MusaMuthami1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="text-center flex items-center justify-center w-full pt-4 md:pt-8 mt-4 border-t border-current">
            <p className="text-xs md:text-sm font-bold underline [text-decoration-thickness:1px]">
              More projects on GitHub
            </p>
            <CiLocationArrow1 className="inline-block ml-1 h-5 w-5" />
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Projects;
