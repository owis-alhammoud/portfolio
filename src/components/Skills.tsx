"use client";
import { useEffect, useState } from "react";
import {
  CircularProgressbar,
  buildStyles
} from 'react-circular-progressbar';
import { cachedFetch } from "../utils/cachedFetch";
import useFadeIn from "@/utils/useFadeIn";
import 'react-circular-progressbar/dist/styles.css';


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
  const sectionRef = useFadeIn<HTMLElement>();

  useEffect(() => {
    cachedFetch<Skill[]>("https://aoueesah.pythonanywhere.com/api/skill/", )
      .then((data) => setSkills(data))
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
    <section ref={sectionRef} id="skills" className="min-h-screen flex items-center justify-center fade-in-up">
      <div className="container mx-auto px-4 text-center space-y-4">
        <h2 className="text-3xl font-bold">Skills</h2>
        {loading ? (
          <div className="flex items-center justify-center w-20 h-20 mx-auto">
            <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2">
            {Object.entries(categories).map(([cat, skills]) => (
             /* <div key={cat} className="p-4 border-1 border-[var(--accent)] border-dashed rounded-4xl space-y-4">
                <h3 className="text-2xl font-semibold ">{cat}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                  {skills.map((skill) => (
                    <div key={skill.id} className="group relative w-24 h-24 mx-auto">
                    <CircularProgressbar
                      value={skill.level}
                      styles={buildStyles({
                        pathColor: 'var(--accent)',       
                        textColor: 'transparent',    
                      })}
                    />
                  
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-medium pointer-events-none">
                      <span className="group-hover:hidden">{skill.title}</span>
                      <span className="hidden group-hover:block">{skill.level}%</span>
                    </div>
                  </div>
                  
                  ))}
                </div>
              </div>*/
              <div  key={cat} className="relative p-6 rounded-xl">
                {/* Corner borders */}
                <span className="absolute top-0 left-0 w-15 h-15 border-t-1 border-l-1  border-dashed rounded-tl-3xl" style={{ borderColor: 'var(--accent)' }} />
                <span className="absolute top-0 right-0 w-15 h-15 border-t-1 border-r-1  border-dashed rounded-tr-3xl " style={{ borderColor: 'var(--accent)' }} />
                <span className="absolute bottom-0 left-0 w-15 h-15 border-b-1 border-l-1 border-dashed rounded-bl-3xl" style={{ borderColor: 'var(--accent)' }} />
                <span className="absolute bottom-0 right-0 w-15 h-15 border-b-1 border-r-1 border-dashed rounded-br-3xl" style={{ borderColor: 'var(--accent)' }} />

                {/* Content */}
                <div className="space-y-4 ">
                <h3 className="text-2xl  font-semibold  ">{cat}</h3>
                <div className="grid md:grid-cols-3 grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {skills.map((skill) => (
                    <div key={skill.id} className="group relative w-24 h-24 mx-auto transform transition-transform duration-300  hover:scale-110">
                    <CircularProgressbar
                      value={skill.level}
                      styles={buildStyles({
                        pathColor: 'var(--accent)',       
                        textColor: 'transparent',  
                      })}
                    />
                  
                    <div className=" absolute inset-0 flex items-center justify-center text-sm font-medium pointer-events-none">
                      <span className="group-hover:hidden">{skill.title}</span>
                      <span className="hidden group-hover:block">{skill.level}%</span>
                    </div>
                  </div>
                  
                  ))}
                </div>
                </div>
              </div>

            ))}
          </div>
        )}
      </div>
    </section>
  );
}
