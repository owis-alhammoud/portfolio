'use client'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Certificates from '@/components/Certificates'
import TrainingCourses from '@/components/TrainingCourses'
import Contests from '@/components/Contests'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'

export default function Home() {

  return (
    <div >
      <Hero />
      <About />
      <Skills />
      <Experience />
      <TrainingCourses />
      <Projects />
      <Contests />
      <Certificates />

    </div>
  )
}
