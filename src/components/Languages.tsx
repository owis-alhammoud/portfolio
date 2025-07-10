"use client";
import { useEffect, useState } from "react";

interface Language {
  id: number;
  title: string;
  level: number;
}

export default function Languages() {
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
    <section id="languages" className="min-h-screen flex items-center justify-center fade-in-up">
      <div className="container mx-auto px-4 text-center space-y-4">
        <h2 className="text-3xl font-bold">my Languages</h2>
        {loading ? (
          <div className="flex items-center justify-center w-20 h-20 mx-auto">
            <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-4 max-w-xl mx-auto">
            {langs.map((lang) => (
              <div key={lang.id}>
                <div className="flex justify-between mb-1">
                  <span>{lang.title}</span>
                  <span>{lang.level}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded h-3">
                  <div className="bg-[var(--accent)] h-3 rounded" style={{ width: `${lang.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
