'use client'
import { useEffect } from 'react'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Certificates from '@/components/Certificates'
import TrainingCourses from '@/components/TrainingCourses'

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
      <Skills />
      <Certificates />
      <TrainingCourses />

    </div>
  )
}
