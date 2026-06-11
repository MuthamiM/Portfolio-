"use client";
import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

const MeetMe = () => {
  const { theme } = useTheme();

  const getHighlightClass = () => {
    if (theme === "dark") {
      return "text-white font-bold";
    }
    return "text-black font-bold";
  };

  const getStatClass = () => {
    if (theme === "dark") {
      return "border border-white/10 bg-white/[0.03]";
    }
    return "border border-black/10 bg-black/[0.02]";
  };

  const getMutedClass = () => {
    return theme === "dark" ? "text-white/50" : "text-black/50";
  };

  return (
    <section
      id="meet-me"
      className="flex items-center justify-center h-full w-full overflow-auto"
      suppressHydrationWarning
    >
      <div
        className="w-full h-full mx-auto max-w-4xl p-2.5 pl-4 md:p-10 flex items-center md:justify-center"
        suppressHydrationWarning
      >
        <div className="space-y-10 md:space-y-14">
          {/* About Section */}
          <div className="text-center">
            <h2 className="text-xl md:text-2xl xl:text-3xl font-bold tracking-wider mb-3 md:mb-4">
              ABOUT ME
            </h2>
            <p className="text-sm lg:text-base xl:text-md leading-relaxed max-w-3xl mx-auto">
              Hi! I&apos;m{" "}
              <span className={getHighlightClass()}>Musa Mwange</span>, a{" "}
              <span className={getHighlightClass()}>
                Cybersecurity Specialist & Frontend Developer
              </span>
              . I bridge the gap between secure technology and exceptional user experiences. I specialize in{" "}
              <span className={getHighlightClass()}>
                penetration testing
              </span>
              ,{" "}
              <span className={getHighlightClass()}>
                vulnerability assessment
              </span>
              , and building secure full-stack applications with{" "}
              <span className={getHighlightClass()}>Next.js</span> and{" "}
              <span className={getHighlightClass()}>Flutter</span>. I create apps that deliver excellent performance while keeping user data protected.
            </p>
          </div>

          {/* Key Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            {[
              { value: "6+", label: "Projects Shipped" },
              { value: "3+", label: "Years Experience" },
              { value: "4", label: "Security Audits" },
              { value: "∞", label: "Threat Mitigated" },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`rounded-xl p-3 md:p-4 text-center transition-all duration-300 ${getStatClass()}`}
              >
                <p className="text-lg md:text-2xl font-bold tracking-wide">
                  {stat.value}
                </p>
                <p
                  className={`text-[10px] md:text-xs font-medium mt-1 ${getMutedClass()}`}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Hire Me Section */}
          <div className="text-center">
            <h2 className="text-xl md:text-2xl xl:text-3xl font-bold tracking-wider mb-3 md:mb-4">
              LET&apos;S WORK TOGETHER
            </h2>
            <p className="text-sm lg:text-base xl:text-md leading-relaxed max-w-3xl mx-auto">
              I&apos;m available for{" "}
              <span className={getHighlightClass()}>
                cybersecurity consulting, frontend engineering, and full-stack development roles
              </span>
              . If you need a security-minded developer to secure your existing system or build a robust application from scratch — let&apos;s build together.
            </p>
            <div className="flex items-center justify-center gap-3 mt-5">
              <Link
                href="https://mail.google.com/mail/u/0/?fs=1&to=musamwange2@gmail.com&tf=cm"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-5 py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-white text-black hover:bg-white/90"
                    : "bg-black text-white hover:bg-black/90"
                }`}
              >
                Get In Touch →
              </Link>
              <Link
                href="https://www.linkedin.com/in/musa-mwange-046688377"
                target="_blank"
                rel="noopener noreferrer"
                className={`px-5 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 border ${
                  theme === "dark"
                    ? "border-white/20 text-white/80 hover:bg-white/10"
                    : "border-black/20 text-black/80 hover:bg-black/5"
                }`}
              >
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetMe;
