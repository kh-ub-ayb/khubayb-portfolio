import React, { Suspense } from 'react'
import Navbar from './components/navbar.jsx'
import Hero from './components/hero.jsx'
import AboutSection from './components/sections/about-section.jsx'
import ProjectsSection from './components/sections/projects-section.jsx'
import ExperienceSection from './components/sections/experience-section.jsx'
import ContactSection from './components/sections/contact-section.jsx'
import Footer from './components/footer.jsx'

export default function App() {
  return (
    <main className="min-h-dvh bg-[#0b0c10] text-white">
      <Navbar />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-[-15%] h-[50vh] w-[60vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(88,28,135,0.28),rgba(0,0,0,0))]" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[45vh] w-[50vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.25),rgba(0,0,0,0))]" />
      </div>

      <section id="home" className="scroll-mt-20">
        <Hero />
      </section>
      <section id="about" className="scroll-mt-20">
        <AboutSection />
      </section>
      <section id="projects" className="scroll-mt-20">
        <ProjectsSection />
      </section>
      <section id="work" className="scroll-mt-20">
        <ExperienceSection />
      </section>
      <section id="contact" className="scroll-mt-20">
        <Suspense>
          <ContactSection />
        </Suspense>
      </section>

      <Footer />
    </main>
  )
}


