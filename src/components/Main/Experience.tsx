import React, { useState, useRef, useEffect, useMemo } from "react";
import { CiLocationArrow1 } from "react-icons/ci";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { repos } from "@/data/data";
import Link from "next/link";
import { PiGitMergeDuotone } from "react-icons/pi";

const Experience = () => {
  const totalPRs = useMemo(() => {
    return repos.reduce((acc, r) => acc + (r.prs?.length ?? 0), 0);
  }, []);

  return (
    <section
      id="experience"
      className="flex flex-col items-center justify-center min-h-full w-full py-8 md:py-12 p-2.5 pl-4 md:p-8"
      suppressHydrationWarning
    >
      <div className="w-full mx-auto max-w-3xl text-center" suppressHydrationWarning>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-widest mb-4">
            EXPERIENCE
          </h2>
        </div>

        {/* Professional Experience Section */}
        <div className="w-full pt-2 md:pt-4 mt-2 md:mt-4 border-t border-current border-opacity-20 mb-0">
          <h3 className="text-2xl md:text-[28px] font-semibold tracking-wide text-left mb-4">
            Professional Experience
          </h3>
          <div className="space-y-6 text-left">
            {/* ZeTheta */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h4 className="text-lg font-bold">Software Developer</h4>
                <span className="text-xs sm:text-sm opacity-80">2025 – Present</span>
              </div>
              <p className="text-sm font-medium opacity-90">ZeTheta &middot; Nairobi, Kenya</p>
              <ul className="list-disc list-inside mt-2 text-xs sm:text-sm opacity-85 space-y-1 pl-1">
                <li>Architecting a production Open Banking API Gateway unifying Kenya&apos;s mobile money providers (M-Pesa Daraja, Airtel Money) with a unified REST/GraphQL interface and developer sandbox</li>
                <li>Building a Real-Time Fraud Detection Microservices Engine using Apache Kafka, FastAPI, and gradient-boosted ML models tuned to East African mobile money transaction patterns</li>
                <li>Developed a secure offline healthcare application utilizing CRYSTALS-Kyber post-quantum cryptography to secure patient health reports, with the working prototype submitted to the MidNight Hackers 2026 hackathon</li>
              </ul>
            </div>

            {/* The Virtual CTO */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h4 className="text-lg font-bold">Software Developer (Part-Time Internship)</h4>
                <span className="text-xs sm:text-sm opacity-80">2024 – 2025</span>
              </div>
              <p className="text-sm font-medium opacity-90">The Virtual CTO &middot; Remote / India</p>
              <ul className="list-disc list-inside mt-2 text-xs sm:text-sm opacity-85 space-y-1 pl-1">
                <li>Developed and maintained front-end features for SaaS client platforms using React.js and Next.js</li>
                <li>Implemented responsive UI components, API integrations, and performance optimisations</li>
                <li>Collaborated asynchronously with international engineering team across multiple time zones</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="w-full pt-4 md:pt-6 mt-6 md:mt-8 border-t border-current border-opacity-20 text-left">
          <h3 className="text-2xl md:text-[28px] font-semibold tracking-wide mb-4">
            Education
          </h3>
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h4 className="text-lg font-bold">Bachelor of Science — Information Technology</h4>
              <span className="text-xs sm:text-sm opacity-80">2022 – 2026 (Expected)</span>
            </div>
            <p className="text-sm font-medium opacity-90">KCA University &middot; Nairobi, Kenya</p>
            <ul className="list-disc list-inside mt-2 text-xs sm:text-sm opacity-85 space-y-1 pl-1">
              <li>Dual specialisation: Cybersecurity and Full-Stack Software Development</li>
              <li>Relevant coursework: Distributed Systems, Network Security, Data Structures &amp; Algorithms, Database Systems, Software Engineering, AI &amp; Machine Learning</li>
              <li>Active member of the KCA University Developer Community</li>
            </ul>
          </div>
        </div>

        <div className="pt-2 md:pt-4 mt-2 md:mt-4 border-t border-current border-opacity-20 text-left">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-2xl md:text-[28px] font-semibold tracking-wide leading-tight mb-1">
              Open Source
            </h3>
            <span className="inline-flex items-center border border-current/20 rounded-full px-3 py-1 text-[11px] md:text-xs opacity-75 font-medium whitespace-nowrap">
              {totalPRs} PRs merged
            </span>
          </div>
          <OpenSourceSummary />
          <Link
            href="https://github.com/MuthamiM"
            target="_blank"
            rel="noopener noreferrer"
            className="underline flex items-center gap-1 text-xs md:text-sm font-medium pt-2 md:pt-4 mt-2 md:mt-4 border-t border-current border-opacity-20 pb-2 md:pb-4 mb-2 md:mb-4 border-b"
          >
            GitHub
            <CiLocationArrow1 className="inline-block ml-0.5 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Experience;

function OpenSourceSummary() {
  const [openRepo, setOpenRepo] = useState<number | null>(null);
  const contentRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [maxHeights, setMaxHeights] = useState<Record<number, string>>({});
  const sortedRepos = useMemo(() => {
    return [...repos].sort(
      (a, b) => (b.prs?.length ?? 0) - (a.prs?.length ?? 0)
    );
  }, []);

  useEffect(() => {
    const newHeights: Record<number, string> = {};
    sortedRepos.forEach((_, idx) => {
      const el = contentRefs.current[idx];
      if (!el) {
        newHeights[idx] = "0px";
        return;
      }
      if (openRepo === idx) {
        newHeights[idx] = `${el.scrollHeight}px`;
      } else {
        newHeights[idx] = "0px";
      }
    });
    setMaxHeights(newHeights);
  }, [openRepo, sortedRepos]);

  const toggleRepo = (idx: number) => {
    setOpenRepo((cur) => (cur === idx ? null : idx));
  };

  return (
    <div className="mt-1">
      <div>
        {sortedRepos.map((repo, idx) => (
          <div key={repo.name}>
            <button
              onClick={() => toggleRepo(idx)}
              aria-expanded={openRepo === idx}
              className="w-full flex items-center justify-between px-1 rounded-sm cursor-pointer hover:bg-accent-foreground/10"
            >
              <div className="flex items-center justify-start gap-2">
                <p className="font-medium text-md cursor-pointer">
                  {repo.name}
                </p>
                <span className="text-[10px] opacity-70 mt-0.5">
                  {repo.prs.length} PRs
                </span>
              </div>
              <span>
                {openRepo === idx ? (
                  <IoIosArrowDropup className="h-5 w-5" />
                ) : (
                  <IoIosArrowDropdown className="h-5 w-5" />
                )}
              </span>
            </button>

            <div
              ref={(el) => {
                contentRefs.current[idx] = el;
              }}
              style={{
                maxHeight: maxHeights[idx] ?? "0px",
                transition: "max-height 300ms ease",
              }}
              className="overflow-hidden"
            >
              <div className="p-2 flex flex-col items-start gap-1.5 text-sm md:text-base">
                {repo.prs.map((pr, pIdx) => (
                  <div
                    key={pr.url}
                    className={`flex items-center gap-2 transform transition-all duration-300 ${
                      openRepo === idx
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-2"
                    }`}
                    style={{ transitionDelay: `${pIdx * 40}ms` }}
                  >
                    <PiGitMergeDuotone className="h-4 w-4" />
                    {pr.url === "#" ? (
                      <span className="text-xs">{pr.title}</span>
                    ) : (
                      <Link
                        href={pr.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-xs"
                      >
                        {pr.title}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
