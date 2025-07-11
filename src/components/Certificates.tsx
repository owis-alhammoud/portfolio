"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

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

  useEffect(() => {
    fetch("https://aoueesah.pythonanywhere.com/api/scintific-certificate/")
      .then((res) => res.json())
      .then((data: Certificate[]) => setCerts(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="certificates" className="min-h-screen flex items-center justify-center fade-in-up">
      <div className="container mx-auto px-4 text-center space-y-8">
        <h2 className="text-3xl font-bold">Certificates</h2>
        {loading ? (
          <div className="flex items-center justify-center w-20 h-20 mx-auto">
            <div className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {certs.map((cert) => (
              <div
                key={cert.id}
                className="relative overflow-hidden rounded-xl border border-dashed p-4 transform transition-transform duration-300 hover:scale-105"
                style={{ borderColor: "var(--accent)" }}
              >
                <div className="absolute inset-0 bg-[var(--accent)]/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                <Image
                  src={cert.img}
                  alt={cert.certificateName}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover rounded"
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
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
