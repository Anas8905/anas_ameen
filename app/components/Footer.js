'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '../hooks/useTheme'

export default function Footer() {
  const { getStrokeStyle } = useTheme()
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const words = ['chai', 'coffee', 'cheetos']
  const typingSpeed = 150
  const deletingSpeed = 100
  const pauseDuration = 2000

  useEffect(() => {
    if (isPaused) return

    const currentWord = words[currentWordIndex]
    let timeoutDuration = isDeleting ? deletingSpeed : typingSpeed

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1))
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
          // Finished deleting, move to next word
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, timeoutDuration)

    return () => clearTimeout(timeout)
  }, [displayText, currentWordIndex, isDeleting, isPaused, words])

  return (
    <footer className="mt-16 py-8 border-t border-dashed border-border-light dark:border-border-dark">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-text-primary-light dark:bg-text-primary-dark rounded flex items-center justify-center">
            <span className="text-bg-light dark:text-bg-dark font-bold text-sm font-poppins">
              MU
            </span>
          </div>
          <div className="text-text-secondary text-sm font-open_sans">
            © 2024 Muhammad Umair (muhammadumair) • Manage Cookies
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-text-secondary text-sm font-open_sans">
          <span>&lt;/&gt; with</span>
          <span className="text-text-primary-light dark:text-text-primary-dark font-medium min-w-[60px]">
            {displayText}
            <span className="animate-pulse">|</span>
          </span>
          <span>⚡</span>
        </div>
      </div>
    </footer>
  )
}