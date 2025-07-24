import Image from 'next/image'
import { useTheme } from '../hooks/useTheme'
import { useState, useEffect } from 'react'
import {
  SiAmazonaws,
  SiAngular,
  SiBootstrap,
  SiCss3,
  SiExpress,
  SiGmail,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiLinkedin,
  SiMongodb,
  SiMui,
  SiMysql,
  SiNestjs,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiRedux,
  SiSocketdotio,
  SiTailwindcss,
  SiTwitter,
  SiTypescript,
} from "react-icons/si";
import umairImg from "/public/MuhammadUmair.jpeg"

export default function AboutSection() {
  const { getStrokeStyle } = useTheme()
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  const texts = ['HI THERE!', 'IM UMAIR']
  const typingSpeed = 100 // milliseconds per character
  const deletingSpeed = 50 // milliseconds per character when deleting
  const pauseDuration = 1500 // pause between texts

  const skills = [
    { name: 'React', icon: <SiReact size={16} /> },
    { name: 'Typescript', icon: <SiTypescript size={16} /> },
    { name: 'Next.js', icon: <SiNextdotjs size={16} /> },
    { name: 'Angular', icon: <SiAngular size={16} /> },
  ]

  const stats = [
    { value: '8', prefix: '+', label: 'YEARS OF EXPERIENCE' },
    { value: '18', prefix: 'k', label: 'HOURS OF WORKING' },
    { value: '40', prefix: '+', label: 'PROJECTS DONE' },
  ]

  useEffect(() => {
    if (isPaused) return // Don't do anything during pause

    const currentText = texts[currentIndex]
    let timeoutDuration = isDeleting ? deletingSpeed : typingSpeed

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1))
        } else {
          // Finished typing, pause before deleting
          setIsPaused(true)
          setTimeout(() => {
            setIsPaused(false)
            setIsDeleting(true)
          }, pauseDuration)
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false)
          setCurrentIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, timeoutDuration)

    return () => clearTimeout(timeout)
  }, [displayText, currentIndex, isDeleting, isPaused])

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <section className="section">
      <div className="flex flex-col lg:flex-row items-start space-y-8 lg:space-y-0 lg:space-x-12">
        <div className="flex-shrink-0 self-start">
          <div className="relative">
            <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full flex items-center justify-center">
              <Image
                src={umairImg}
                alt="Soham Mondal"
                className="rounded-full object-cover"
              />
            </div>
            <div className="absolute bottom-4 left-2 transform typewriter-glass-container px-4 py-1 rounded-full">
              <span className=" !font-roboto_mono !text-[14.4px] !font-normal text-white dark:text-black ">
                {displayText}
                <span className={`typewriter-cursor ${showCursor ? 'visible' : 'invisible'}`}>|</span>
              </span>
            </div>
          </div>
        </div>
        <div className="relative flex-1">
          {/* Background Title */}
          <div className="background_title_div">
            <h2 className="background_title" style={getStrokeStyle()}>
              ABOUT ME
            </h2>
          </div>
          <div className="section_title">
            <span className="text-glow">// ABOUT ME</span>
          </div>
          <h2 className="section_heading">
            Senior Web Developer
          </h2>

          <div className="flex flex-wrap gap-3 mb-6 h-10">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-transparent text-text-secondary border border-dashed border-text-secondary hover:text-text-primary-light dark:hover:text-text-primary-dark px-4 rounded-full text-base font-open_sans flex items-center gap-2"
              >
                {skill.icon} {skill.name}
              </span>
            ))}
          </div>

          <p className="section_body_text !mb-0">
            Coding wizard 🧙‍♂️💻 on a mission to make a difference, one line of Code at a time! 💻 ⚡
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="text-text-primary-light dark:text-text-primary-dark flex flex-col md:flex-row justify-start items-start space-y-8 md:space-y-0 md:space-x-8 lg:space-x-20 mt-8">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-center gap-2">
            <div className="text-4xl md:text-5x l lg:text-stats-number font-roboto_mono font-bold mb-2" style={getStrokeStyle()}>
              {stat.value}
            </div>
            <div className="font-roboto_mono text-nav-text font-bold tracking-[1px] text-glow">
              <p>{stat.prefix}</p>{stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}