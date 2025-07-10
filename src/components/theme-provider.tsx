"use client";
import { useEffect, useState, ReactNode } from "react";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

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

  return (
    <>
      <header className="fixed top-0 w-full p-4 flex justify-end z-10">
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="px-3 py-1 rounded bg-[var(--accent)] text-[var(--bg)]"
        >
          {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </header>
      <main >{children}</main>
    </>
  );
}
