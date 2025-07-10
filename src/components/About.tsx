"use client";
export default function About(){
  return (
    <section id="about" className="min-h-screen flex items-center justify-center fade-in-up">
      <div className="container mx-auto px-4 text-center space-y-4">
        <h2 className="text-3xl font-bold">About me</h2>
        <ul className="list-disc list-inside text-lg space-y-2 text-left max-w-xl mx-auto">
          <li>
            I was born on <a href="https://goo.gl/maps/ziHfGdRhgPUruPG18" className="text-[var(--accent)] underline">syria-hama-mourk</a> in 30-1-2001 with syrian nationality
          </li>
          <li>I hope to be a positive influncer everywhere</li>
        </ul>
      </div>
    </section>
  );
}
