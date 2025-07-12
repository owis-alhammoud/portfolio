"use client";
import { useEffect, useState } from "react";
import CachedImage from "./CachedImage";
import { toCorsUrl, fromCorsUrl } from "../utils/url";

interface Tag {
  id: number;
  title: string;
}

interface Project {
  id: number;
  title: string;
  desc: string;
  url: string;
  img: string;
  tags: Tag[];
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://aoueesah.pythonanywhere.com/api/project/")
      .then((res) => res.json())
      .then((data: Project[]) =>
        setProjects(data.map((p) => ({ ...p, img: toCorsUrl(p.img) })))
      )
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center fade-in-up">
      <div className="container mx-auto px-4 space-y-8">
        <h2 className="text-3xl font-bold text-center">Projects</h2>
        {loading ? (
          <div className="flex items-center justify-center w-20 h-20 mx-auto">
            <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 ">
            {projects.map((project) => (
              <div
                key={project.id}
                className="relative overflow-hidden rounded-xl border-x border-dashed p-4 bg-[var(--accent)]/10 cursor-pointer"
                style={{ borderColor: 'var(--accent)' }}
              >

                <CachedImage
                  src={project.img}
                  alt={project.title}
                  className="w-full aspect-square object-cover rounded"
                  onClick={() => window.open(fromCorsUrl(project.img), '_blank')}

                />
                <div className="mt-2 space-y-1">
                  <h3 className="text-xl font-semibold text-[var(--accent)]">
                    {project.title}
                  </h3>
                  <p className="text-sm">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="text-xs px-2 py-1 rounded-full bg-[var(--accent)] text-[var(--bg)]"
                      >
                        {tag.title}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-[var(--accent)] underline"
                  >
                    View Source
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
