'use client'

import { Suspense } from 'react'
import Header from './components/Header'
import Navigation from './components/Navigation'
import AboutSection from './components/AboutSection'
import TechStackSection from './components/TechStackSection'
import MetricsSection from './components/MetricsSection'
import PortfolioSection from './components/PortfolioSection'
import StrengthsSection from './components/StrengthsSection'
import TestimonialSection from './components/TestimonialSection'
import ResumeSection from './components/ResumeSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div className="relative min-h-screen transition-colors duration-300 bg-bg-light dark:bg-bg-dark">
      <div className="lines lines-set-1">
        <div className="line" />
        <div className="line" />
        <div className="line" />
        <div className="line" />
      </div>
      <div className="lines lines-set-2">
        <div className="line" />
        <div className="line" />
        <div className="line" />
        <div className="line" />
      </div>
      <div className="lines lines-set-3">
        <div className="line" />
        <div className="line" />
        <div className="line" />
        <div className="line" />
      </div>
      <div className='max-w-[1300px] mx-3 lg:mx-auto relative z-10'>
        <Header />
        <div className="flex flex-col lg:flex-row gap-x-6">
          <nav className='w-full lg:w-[24%]'>
            <Navigation />
          </nav>
          <main className="w-full lg:w-[76%] ">
            <Suspense fallback={<div className="text-center">Loading...</div>}>
              <section id="aboutme">
                <AboutSection />
              </section>
              <section id="portfolio">
                <PortfolioSection />
              </section>
              <section id="techstack">
                <TechStackSection />
              </section>
              <section id="metrics">
                <MetricsSection />
              </section>
              <section id="strengths">
                <StrengthsSection />
              </section>
              <section id="testimonials">
                <TestimonialSection />
              </section>
              <section id="resume">
                <ResumeSection />
              </section>
              <section id="contact">
                <ContactSection />
              </section>
              <Footer />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}