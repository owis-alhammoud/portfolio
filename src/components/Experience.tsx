"use client";
import { useEffect, useState } from "react";

interface Experience {
  id: number;
  position: string;
  companyName: string;
  desc: string;
  startDate: string;
  endDate: string;
}

function formatDuration(start: string, end: string) {
  const startDate = new Date(start)
  const endDate = new Date(end)
  let months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth())
  if (endDate.getDate() < startDate.getDate()) {
    months -= 1
  }
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12
  const parts = [] as string[]
  if (years) parts.push(`${years} year${years > 1 ? 's' : ''}`)
  if (remainingMonths) parts.push(`${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`)
  return parts.join(' ')
}

export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("https://aoueesah.pythonanywhere.com/api/experience/")
      .then((res) => res.json())
      .then((data: Experience[]) => {
        const sorted = data.sort(
          (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
        );
        setExperiences(sorted);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="experience" className="min-h-screen flex items-center justify-center fade-in-up">
      <div className="container mx-auto px-4 space-y-8">
        <h2 className="text-3xl font-bold text-center">Experience</h2>
        {loading ? (
          <div className="flex items-center justify-center w-20 h-20 mx-auto">
            <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="relative overflow-hidden">

              <div className="absolute w-full left-0 right-0 top-1/2 border-t-2 border-[var(--accent)] -z-10  " />
              <ul className=" py-50 overflow-x-auto no-scrollbar flex -space-x-20">
                {experiences.map((exp, index) => {
                  const desc = exp.desc.replaceAll("\\r\\n", "\n");
                  const dur = formatDuration(exp.startDate, exp.endDate);
                  const isEven = index % 2 === 0;
                  return (
                    <li
                    key={exp.id}
                      className="min-w-full sm:min-w-1/2 lg:min-w-1/3 xl:min-w-1/4 relative text-center"
                      >
                      <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-[var(--accent)] rounded-full -translate-x-1/2 -translate-y-1/2" />
                      <div
                        className={`${
                          isEven ? "-translate-y-2/3" : "translate-y-2/3"
                        } p-4 rounded-xl bg-[var(--accent)]/10 border border-dashed transform transition-transform duration-300 hover:z-10 hover:scale-105`}
                        style={{ borderColor: "var(--accent)" }}
                        >
                        <h3 className="text-xl font-semibold text-[var(--accent)]">{exp.position}</h3>
                        <p className="text-sm">{exp.companyName}</p>
                        <p className="text-sm">
                          {exp.startDate} - {exp.endDate} ({dur})
                        </p>
                        <p className="text-sm text-left whitespace-pre-line">{desc}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            
        )}
      </div>
    </section>
  );
}

