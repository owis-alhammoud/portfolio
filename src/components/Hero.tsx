"use client";
import { useEffect, useState } from "react";
import CachedImage from "./CachedImage";
import { toCorsUrl } from "../utils/url";
import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

interface Info {
  id: number;
  phoneNum: string;
  email: string;
  photo: string;
  welcomMSG: string;
}

const TITLES = [
  "Owis Alhammoud",
  "Software Engineer",
  "Flutter Developer",
  "Django Developer",
  "Node.js Developer",
];

export default function Hero() {
  const [info, setInfo] = useState<Info | null>(null);
  const [loading, setLoading] = useState(true);
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    fetch("https://aoueesah.pythonanywhere.com/api/info/")
      .then((res) => res.json())
      .then((data: Info[]) => {
        const first = data[0];
        if (first) first.photo = toCorsUrl(first.photo);
        setInfo(first);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const [animClass, setAnimClass] = useState('slide-in');

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimClass('slide-out');

      setTimeout(() => {
        setTitleIndex((prev) => (prev + 1) % TITLES.length);
        setAnimClass('slide-in');
      }, 500); 
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  if(loading)
  {
    return (<section className="h-screen flex items-center justify-center fade-in-up ">{loading && (
      <div className="flex items-center justify-center w-80 h-80">
        <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    )}</section>)
  }

  return (
    
    <section className="h-screen flex items-center justify-center fade-in-up ">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16 md:px-50">
        
        {info && (
          <div className="flex flex-col items-center md:items-start">
            <CachedImage
              src={info.photo}
              alt="Avatar"
              className="rounded-full object-cover float-animate w-full h-1/2"
            />
            <div className="mt-4 flex flex-col lg:flex-row lg:space-x-4 space-y-2 lg:space-y-0">
              <a
                href={`tel:${info.phoneNum}`}
                className="flex items-center space-x-2"
              >
                <PhoneIcon className="w-5 h-5" />
                <span className="text-[var(--accent)]">{info.phoneNum}</span>
              </a>
              <a
                href={`mailto:${info.email}`}
                className="flex items-center space-x-2 "
              >
                <EnvelopeIcon className="w-5 h-5" />
                <span className="text-[var(--accent)]">{info.email}</span>
              </a>
            </div>
          </div>
        )}
        <div className="text-center md:text-start max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-4xl">Hello, I&apos;m:</h1>
          <h1 className={`text-4xl sm:text-7xl font-bold text-[var(--accent)] ${animClass} `}>
            {TITLES[titleIndex]}
          </h1>
          {info && <p className="text-xl">{info.welcomMSG}</p>}
        </div>
      </div>
    </section>
  );
}
