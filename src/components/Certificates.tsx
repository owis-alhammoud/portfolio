"use client";
import { useEffect, useState } from "react";
import CachedImage from "./CachedImage";
import { toCorsUrl, fromCorsUrl } from "../utils/url";
import { cachedFetch } from "../utils/cachedFetch";
import useFadeIn from "@/utils/useFadeIn";

interface Certificate {
  id: number;
  companyName: string;
  certificateName: string;
  grade: number;
  description: string;
  startDate: string;
  endDate: string;
  img: string;
}

export default function Certificates() {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useFadeIn<HTMLElement>();

  useEffect(() => {
    cachedFetch<Certificate[]>(
      "https://aoueesah.pythonanywhere.com/api/scintific-certificate/",
    )
      .then((data) =>
        setCerts(data.map((c) => ({ ...c, img: toCorsUrl(c.img) })))
      )
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section ref={sectionRef} id="certificates" className="min-h-screen flex items-center justify-center fade-in-up">
      <div className=" container mx-auto px-4 text-center space-y-8">
        <h2 className="text-3xl font-bold">Scientific Certificates</h2>
        {loading ? (
          <div className="flex items-center justify-center w-20 h-20 mx-auto">
            <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid gap-8 xl:grid-cols-4 md:grid-cols-2 lg:grid-cols-3">
            {certs.map((cert) => (
              <a key={cert.id} href={fromCorsUrl(cert.img)} target="_blank" rel="noopener noreferrer">
              <div
                className="relative overflow-hidden rounded-xl border-x border-dashed p-5 transform transition-transform duration-300 hover:scale-105"
                style={{ borderColor: "var(--accent)" }}
              >
                <div className="absolute inset-0 bg-[var(--accent)]/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                <CachedImage
                  src={cert.img}
                  alt={cert.certificateName}
                  
                  className="w-full h-1/2 object-cover rounded"
                />
                <div className="mt-4 space-y-1 relative">
                  <h3 className="text-xl font-semibold text-[var(--accent)]">{cert.certificateName}</h3>
                  <p className="text-sm">{cert.companyName}</p>
                  <p className="text-sm">
                    {cert.startDate} - {cert.endDate}
                  </p>
                  <p className="text-sm">{cert.description}</p>
                  <p className="text-sm font-medium">Grade: {cert.grade}%</p>
                </div>
              </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
