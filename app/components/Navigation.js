'use client'

import { useState, useEffect } from 'react'

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('aboutme');
  const [isSticky, setIsSticky] = useState(false)
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);
  const navItems = [
    { label: 'ABOUT ME', id: 'aboutme', shortLabel: 'A' },
    { label: 'PORTFOLIO', id: 'portfolio', shortLabel: 'P' },
    { label: 'TECH STACK', id: 'techstack', shortLabel: 'T' },
    { label: 'METRICS', id: 'metrics', shortLabel: 'M' },
    { label: 'STRENGTHS', id: 'strengths', shortLabel: 'S' },
    { label: 'TESTIMONIALS', id: 'testimonials', shortLabel: 'T' },
    { label: 'RESUME', id: 'resume', shortLabel: 'R' },
    { label: 'CONTACT', id: 'contact', shortLabel: 'C' },
  ]

  // Scroll spy and mobile nav functionality
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100; // Offset for better detection
      const currentScrollY = window.scrollY;

      // Determine scroll direction
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      setLastScrollY(currentScrollY);

      // Determine if mobile nav should be sticky
      setIsSticky(currentScrollY > 100);
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:block sticky top-6 w-full bg-nav-light dark:bg-nav-dark rounded-lg px-4 py-5 lg:px-10   z-50 space-y-8">
        <ul>
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id} className="relative">
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="relative flex items-center justify-between h-12 w-full text-white font-roboto_mono text-nav-text text-glow"
                  aria-label={`Navigate to ${item.label} section`}
                >
                  <span className={`${isActive ? "text-nav-active text-[14.4px]" : "text-nav-inactive"} leading-none tracking-[1px] hover:text-white`}>
                    {item.label}
                  </span>
                  {/* Navigation Indicator */}
                  <div className="relative ml-auto">
                    <div
                      className={`transition-all duration-500 ease-out ${isActive
                        ? 'size-8 border border-dashed border-nav-active rounded-full animate-spin-slow -mr-[14px]'
                        : 'size-1 bg-nav-inactive rounded-full'
                        }`}
                    />
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
      {/* Mobile Navigation */}
      <div className={`lg:hidden z-50 transition-all duration-700 ease-out ${isSticky
        ? 'fixed top-6 left-0 right-0 px-3'
        : 'relative'
        }`}>
        <div className={`w-full bg-nav-light dark:bg-section-dark rounded-lg px-4 h-14 mx-auto mb-6 flex justify-center items-center gap-2
          nav-container ${isSticky ? 'nav-floating' : 'nav-inline'}
          ${scrollDirection === 'down' ? 'scroll-down' : 'scroll-up'}`}>
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-mono text-white relative transition-colors"
                aria-label={`Navigate to ${item.label} section`}
              >
                <span className={`${isActive ? "text-white text-sm tracking-wide font-medium" : "text-[#ffffffb3]"}`}>
                  {item.shortLabel}
                </span>
                {isActive && (
                  <span className="absolute transition-all duration-500 ease-out size-10 border border-dashed border-white rounded-full animate-spin-slow " />
                )}
              </button>
            );
          })}
        </div>
      </div>

    </>
  )
}

