"use client";
import { useEffect, useRef, useState } from "react";
import CachedImage from "./CachedImage";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface TrainingCourse {
  id: number;
  companyName: string;
  certificateName: string;
  description: string;
  date: string;
  img: string;
}

export default function TrainingCourses() {
  const [courses, setCourses] = useState<TrainingCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("https://aoueesah.pythonanywhere.com/api/tranning-course/")
      .then((res) => res.json())
      .then((data: TrainingCourse[]) => {
        const sorted = data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setCourses(sorted);
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
    <section id="training" className="min-h-screen flex items-center justify-center fade-in-up">
      <div className="container mx-auto px-4 space-y-8">
        <h2 className="text-3xl font-bold text-center">Training Courses</h2>
        {loading ? (
          <div className="flex items-center justify-center w-20 h-20 mx-auto">
            <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[var(--accent)] text-[var(--bg)] p-2 rounded-full hover:opacity-80"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <div ref={listRef} className="overflow-x-scroll no-scrollbar">
              <div
                className="grid grid-flow-col gap-4 pb-4 auto-cols-[100%] sm:auto-cols-[50%] lg:auto-cols-[25%] snap-x"
              >
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="border-x border-dashed rounded-xl p-4 bg-[var(--accent)]/10 snap-start"
                    style={{ borderColor: 'var(--accent)' }}
                  >
                    <a href={course.img} target="_blank" rel="noopener noreferrer">
                      <CachedImage
                        src={course.img}
                        alt={course.certificateName}
                        width={400}
                        height={300}
                        loading="lazy"
                        className="w-full h-40 object-cover rounded"
                      />
                    </a>
                    <div className="mt-2 space-y-1">
                      <h3 className="text-xl font-semibold text-[var(--accent)]">
                        {course.certificateName}
                      </h3>
                      <p className="text-sm">{course.companyName}</p>
                      <p className="text-sm">{course.date}</p>
                      <p className="text-sm">{course.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[var(--accent)] text-[var(--bg)] p-2 rounded-full hover:opacity-80"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
