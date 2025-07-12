"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

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

  useEffect(() => {
    fetch("https://aoueesah.pythonanywhere.com/api/tranning-course/")
      .then((res) => res.json())
      .then((data: TrainingCourse[]) =>
        setCourses(
          data.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
        )
      )
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="training" className="min-h-screen flex items-center justify-center fade-in-up">
      <div className="container mx-auto px-4 space-y-8">
        <h2 className="text-3xl font-bold text-center">Training Courses</h2>
        {loading ? (
          <div className="flex items-center justify-center w-20 h-20 mx-auto">
            <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div
              className="grid grid-flow-col gap-4 pb-4 auto-cols-[100%] sm:auto-cols-[50%] lg:auto-cols-[25%] snap-x"
              style={{ scrollbarWidth: 'thin' }}
            >
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="border-x border-dashed rounded-xl p-4 bg-[var(--accent)]/10 snap-start"
                  style={{ borderColor: 'var(--accent)' }}
                >
                  <a href={course.img} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={course.img}
                      alt={course.certificateName}
                      width={400}
                      height={300}
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
        )}
      </div>
    </section>
  );
}
