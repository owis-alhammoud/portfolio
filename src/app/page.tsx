'use client'
import { useEffect } from 'react'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Languages from '@/components/Languages'
import Skills from '@/components/Skills'

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
    <div >
      <Hero />
      <About />
      <Languages />
      <Skills />

    </div>
  )
}
