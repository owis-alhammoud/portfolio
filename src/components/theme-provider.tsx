"use client";
import { useEffect, useState, ReactNode } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (stored) {
      setTheme(stored);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'training', label: 'Training' },
    { id: 'contests', label: 'Contests' },
    { id: 'projects', label: 'Projects' },
  ];

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <>
      <header className="fixed top-0 w-full p-4 flex justify-between items-center bg-[var(--bg)] z-10 shadow">
        <a href="#home" className=" font-bold text-[var(--accent)]">Owis Alhammoud</a>
        <nav className="hidden flex-1 md:flex space-x-4 items-center justify-center ">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="hover:text-[var(--accent)]">
              {l.label}
            </a>
          ))}
           </nav>
           <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full bg-[var(--accent)] text-[var(--bg)] ml-2"
          >
            {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}  </button>
       
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 border rounded"
          >
            {menuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
      </header>
      {menuOpen && (
        <nav className="md:hidden fixed top-16 right-4 bg-[var(--bg)] border rounded shadow p-4 space-y-2 z-10">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="block hover:text-[var(--accent)]"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => {
              toggleTheme();
              setMenuOpen(false);
            }}
            aria-label="Toggle theme"
            className="w-full flex justify-center py-2 rounded bg-[var(--accent)] text-[var(--bg)]"
          >
            {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
          </button>
        </nav>
      )}
      <main className="pt-20">{children}</main>
    </>
  );
}
