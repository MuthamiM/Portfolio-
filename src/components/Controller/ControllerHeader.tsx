"use client";
import React from "react";
import { RiTwitterXLine, RiInstagramLine } from "react-icons/ri";
import { FiLinkedin, FiGithub } from "react-icons/fi";
import { TbMailUp } from "react-icons/tb";
import { useTheme } from "next-themes";
import Link from "next/link";

const ControllerHeader = () => {
  const { theme } = useTheme();

  const iconColorClass = theme === "dark" ? "text-white/70" : "text-black/60";
  const iconHoverClass =
    theme === "dark" ? "hover:text-white" : "hover:text-black";

  return (
    <div className="flex justify-end w-full p-3 pb-2" suppressHydrationWarning>
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-3 items-center">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://x.com/SkiNnyWallk"
            className="cursor-pointer"
          >
            <RiTwitterXLine
              className={`h-5 w-5 ${iconColorClass} ${iconHoverClass}`}
            />
          </Link>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/_cantroll"
            className="cursor-pointer"
          >
            <RiInstagramLine
              className={`h-5 w-5 ${iconColorClass} ${iconHoverClass}`}
            />
          </Link>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/musa-mwange-046688377"
            className="cursor-pointer"
          >
            <FiLinkedin
              className={`h-5 w-5 ${iconColorClass} ${iconHoverClass}`}
            />
          </Link>
        </div>
        <div className="flex gap-3 items-center">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/MuthamiM"
            className="cursor-pointer"
          >
            <FiGithub
              className={`h-5 w-5 ${iconColorClass} ${iconHoverClass}`}
            />
          </Link>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://mail.google.com/mail/u/0/?fs=1&to=musamwange2@gmail.com&tf=cm"
            className="cursor-pointer"
          >
            <TbMailUp
              className={`h-5 w-5  ${iconColorClass} ${iconHoverClass}`}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ControllerHeader;
