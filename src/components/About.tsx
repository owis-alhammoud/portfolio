"use client";
import { useEffect, useState } from "react";

interface Language {
  id: number;
  title: string;
  level: number;
}

export default function About() {
  const [langs, setLangs] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://aoueesah.pythonanywhere.com/api/lang/")
      .then((res) => res.json())
      .then((data: Language[]) => setLangs(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="about" className="min-h-screen flex items-center justify-center fade-in-up">
      <div className="container mx-auto px-4 space-y-8">
        <h2 className="text-3xl font-bold text-center">About me</h2>
        <div className="grid gap-8 md:grid-cols-2">
        <div className=" border-y p-4  border-dashed border-[var(--accent)] rounded-2xl bg-[var(--accent)]/10 flex items-center min-h-full">
        <ul className="list-disc list-inside text-lg space-y-2">
          <li>
            I was born on
            <a
              href="https://goo.gl/maps/ziHfGdRhgPUruPG18"
              className="text-[var(--accent)] mx-1"
            >
              syria-hama-mourk
            </a>
            in 30-1-2001 with syrian nationality
          </li>
          <li>I hope to be a positive influncer everywhere</li>
        </ul>
      </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-[var(--accent)] text-center md:text-start">
              My Languages
            </h3>
            {loading ? (
              <div className="flex items-center justify-center w-20 h-20 mx-auto">
                <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="space-y-4">
                {langs.map((lang) => (
                  <div key={lang.id}>
                    <div className="flex justify-between mb-1">
                      <span>{lang.title}</span>
                      <span>{lang.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded h-3">
                      <div
                        className="bg-[var(--accent)] h-3 rounded"
                        style={{ width: `${lang.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
