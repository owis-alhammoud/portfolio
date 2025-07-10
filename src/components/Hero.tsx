"use client";
import { useEffect, useState } from "react";

interface Info {
  id: number;
  phoneNum: string;
  email: string;
  photo: string;
  welcomMSG: string;
}

const TITLES = [
  "Hello, I'm Owis Alhammoud",
  "Hello, I'm Software Engineer",
  "I'm Flutter Developer",
  "I'm Django Developer",
  "I'm Node.js Developer",
];

export default function Hero() {
  const [info, setInfo] = useState<Info | null>(null);
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    fetch("https://aoueesah.pythonanywhere.com/api/info/")
      .then((res) => res.json())
      .then((data: Info[]) => setInfo(data[0]))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((i) => (i + 1) % TITLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center space-y-4 fade-in-up">
      <h1 className="text-4xl sm:text-6xl font-bold text-[var(--accent)] transition-colors duration-500">
        {TITLES[titleIndex]}
      </h1>
      {info && (
        <>
          <img
            src={info.photo}
            alt="Avatar"
            className="w-40 h-40 rounded-full object-cover animate-pulse"
          />
          <p className="max-w-xl text-lg px-4">{info.welcomMSG}</p>
          <div className="space-x-4">
            <a href={`tel:${info.phoneNum}`} className="underline text-[var(--accent)]">
              {info.phoneNum}
            </a>
            <a href={`mailto:${info.email}`} className="underline text-[var(--accent)]">
              {info.email}
            </a>
          </div>
        </>
      )}
    </section>
  );
}
