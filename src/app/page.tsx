'use client'
import { useEffect } from 'react'
import Hero from '@/components/Hero'

export default function Home() {
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in-up')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show')
        }
      })
    }, { threshold: 0.1 })
    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="space-y-40">
      <Hero />
      <section className="container mx-auto px-4 fade-in-up">
        <h2 className="text-3xl font-semibold mb-6 text-center">About Me</h2>
        <p className="max-w-2xl mx-auto text-center">I am a passionate developer creating modern web experiences. This template demonstrates dark and light themes, responsive layout and scroll animations without external libraries.</p>
      </section>
      <section className="container mx-auto px-4 fade-in-up">
        <h2 className="text-3xl font-semibold mb-6 text-center">Projects</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="p-4 rounded bg-gray-100 dark:bg-gray-900">Project One</div>
          <div className="p-4 rounded bg-gray-100 dark:bg-gray-900">Project Two</div>
          <div className="p-4 rounded bg-gray-100 dark:bg-gray-900">Project Three</div>
        </div>
      </section>
    </div>
  )
}
