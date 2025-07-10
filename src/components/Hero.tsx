"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

interface Info {
  id: number;
  phoneNum: string;
  email: string;
  photo: string;
  welcomMSG: string;
}

const TITLES = [
  "hello, I'm Owis Alhammoud",
  "hello, I'm Software Engineer",
  "hello, I'm Flutter Developer",
  "hello, I'm Django Developer",
  "hello, I'm Node.js Developer",
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
    <section className="min-h-screen flex items-center justify-center fade-in-up">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16 px-4">
        {info && (
          <div className="flex flex-col items-center md:items-start">
            <Image
              src={info.photo}
              width={160}
              height={160}
              alt="Avatar"
              className="rounded-full object-cover float-animate w-40 h-40"
            />
            <div className="mt-4 space-y-2">
              <a
                href={`tel:${info.phoneNum}`}
                className="flex items-center space-x-2 underline"
              >
                <PhoneIcon className="w-5 h-5" />
                <span>{info.phoneNum}</span>
              </a>
              <a
                href={`mailto:${info.email}`}
                className="flex items-center space-x-2 underline"
              >
                <EnvelopeIcon className="w-5 h-5" />
                <span>{info.email}</span>
              </a>
            </div>
          </div>
        )}
        <div className="text-center md:text-left max-w-xl space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold transition-opacity duration-700">
            {TITLES[titleIndex]}
          </h1>
          {info && <p className="text-lg">{info.welcomMSG}</p>}
        </div>
      </div>
    </section>
  );
}
