"use client";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  title: string;
}
interface Skill {
  id: number;
  title: string;
  level: number;
  category: Category;
}

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://aoueesah.pythonanywhere.com/api/skill/")
      .then((res) => res.json())
      .then((data: Skill[]) => setSkills(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const key = skill.category.title;
    if (!acc[key]) acc[key] = [];
    acc[key].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="min-h-screen flex items-center justify-center fade-in-up">
      <div className="container mx-auto px-4 text-center space-y-4">
        <h2 className="text-3xl font-bold">skills</h2>
        {loading ? (
          <div className="flex items-center justify-center w-20 h-20 mx-auto">
            <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {Object.entries(categories).map(([cat, skills]) => (
              <div key={cat} className="space-y-4">
                <h3 className="text-2xl font-semibold text-[var(--accent)]">{cat}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                  {skills.map((skill) => (
                    <div key={skill.id} className="flex flex-col items-center group">
                      <div className="w-24 h-24 relative rounded-full">
                        <div className="absolute inset-0 rounded-full bg-gray-200 dark:bg-gray-700" />
                        <div
                          className="absolute inset-0 rounded-full"
                          style={{ background: `conic-gradient(var(--accent) ${skill.level}%, transparent 0)` }}
                        />
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-1 text-xs rounded bg-gray-800 text-white hidden group-hover:block">
                          {skill.level}%
                        </span>
                      </div>
                      <span className="mt-2">{skill.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
