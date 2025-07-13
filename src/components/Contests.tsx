"use client";
import { useEffect, useRef, useState } from "react";
import CachedImage from "./CachedImage";
import { toCorsUrl, fromCorsUrl } from "../utils/url";
import { cachedFetch } from "../utils/cachedFetch";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface Contest {
  id: number;
  companyName: string;
  certificateName: string;
  date: string;
  img: string;
}

export default function Contests() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    cachedFetch<Contest[]>("https://aoueesah.pythonanywhere.com/api/contest/", 86400)
      .then((data) => {
        const sorted = data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setContests(sorted.map((c) => ({ ...c, img: toCorsUrl(c.img) })));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const scrollLeft = () => {
    listRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    listRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section id="contests" className="min-h-screen flex items-center justify-center fade-in-up">
      <div className="container mx-auto space-y-8 overflow-visible">
        <h2 className="text-3xl font-bold text-center">Contests</h2>
        {loading ? (
          <div className="flex items-center justify-center w-20 h-20 mx-auto">
            <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex items-stretch overflow-visible">
            <button
              onClick={scrollLeft}
              className="hover:text-[var(--bg)] hover:opacity-25 hover:bg-[var(--accent)] text-[var(--accent)] p-2 rounded-l opacity-50 self-stretch"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <div ref={listRef} className="overflow-x-scroll py-10 no-scrollbar flex-1 overflow-visible">
              <div className="flex gap-4 snap-x overflow-visible relative">
                {contests.map((contest) => (
                  <div
                    key={contest.id}
                    className="relative min-w-full sm:min-w-1/2 lg:min-w-1/3 xl:min-w-1/4 transform transition-transform duration-300 hover:z-10 hover:scale-105 snap-start border-x border-dashed rounded-xl p-4 bg-[var(--accent)]/10"
                    style={{ borderColor: 'var(--accent)', willChange: 'transform' }}
                  >
                    <a href={fromCorsUrl(contest.img)} target="_blank" rel="noopener noreferrer">
                      <CachedImage
                        src={contest.img}
                        alt={contest.certificateName}
                        className="w-full h-10/16 object-cover rounded"
                      />
                    </a>
                    <div className="mt-2 space-y-1">
                      <h3 className="text-xl font-semibold text-[var(--accent)]">{contest.certificateName}</h3>
                      <p className="text-sm">{contest.companyName}</p>
                      <p className="text-sm">{contest.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={scrollRight}
              className="text-[var(--accent)] p-2 rounded-r hover:text-[var(--bg)] hover:opacity-25 hover:bg-[var(--accent)] self-stretch"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
