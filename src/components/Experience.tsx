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

export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

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
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 border-l-2 border-dashed" style={{ borderColor: 'var(--accent)' }} />
            <ul className="space-y-8 ml-12">
              {experiences.map((exp) => (
                <li key={exp.id} className="relative">
                  <div className="absolute -left-7 top-2 w-4 h-4 bg-[var(--accent)] rounded-full" />
                  <div className="p-4 rounded-xl bg-[var(--accent)]/10 border border-dashed" style={{ borderColor: 'var(--accent)' }}>
                    <h3 className="text-xl font-semibold text-[var(--accent)]">{exp.position}</h3>
                    <p className="text-sm">{exp.companyName}</p>
                    <p className="text-sm">{exp.startDate} - {exp.endDate}</p>
                    <p className="text-sm whitespace-pre-line">{exp.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

