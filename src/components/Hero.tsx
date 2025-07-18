"use client";
import { useEffect, useState } from "react";
import CachedImage from "./CachedImage";
import { toCorsUrl } from "../utils/url";
import { cachedFetch } from "../utils/cachedFetch";
import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import useFadeIn from "@/utils/useFadeIn";

interface Info {
  id: number;
  phoneNum: string;
  email: string;
  photo: string;
  welcomMSG: string;
}

interface Social {
  id: number;
  icon: string;
  url: string;
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
  const [socials, setSocials] = useState<Social[]>([]);
  const [loading, setLoading] = useState(true);
  const [titleIndex, setTitleIndex] = useState(0);
  const sectionRef = useFadeIn<HTMLElement>();

  useEffect(() => {
    Promise.all([
      cachedFetch<Info[]>("https://aoueesah.pythonanywhere.com/api/info/", ),
      cachedFetch<Social[]>(
        "https://aoueesah.pythonanywhere.com/api/social-network/",
        
      ),
    ])
      .then(([infoData, socialData]: [Info[], Social[]]) => {
        const first = infoData[0];
        if (first) first.photo = toCorsUrl(first.photo);
        setInfo(first);
        setSocials(
          socialData.map((s) => ({ ...s, icon: toCorsUrl(s.icon) }))
        );
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
    return (<section ref={sectionRef} id="home" className="h-screen flex items-center justify-center fade-in-up ">{loading && (
      <div className="flex items-center justify-center w-80 h-80">
        <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    )}</section>)
  }

  return (
    
    <section ref={sectionRef} id="home" className="h-screen flex items-center justify-center fade-in-up ">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16 justify-evenly">
        
        {info && (
          <div className="flex flex-col items-center">
            <CachedImage
              src={info.photo}
              alt="Owis Alhammoud portrait"
              className="rounded-full p-5 object-cover float-animate max-w-9/12 md:max-w-full lg:max-w-9/12 "
            />
            <div className="mt-4 font-semibold flex flex-col lg:flex-row lg:space-x-4 space-y-2 lg:space-y-0">
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
            {socials.length > 0 && (
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                {socials.map((s) => (
                  <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer">
                    <CachedImage src={s.icon} alt="icon" className="w-6 h-6 transform transition-transform duration-300 hover:scale-105" />
                  </a>
                ))}
              </div>
            )}
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
