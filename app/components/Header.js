// Header.js
'use client'

import { LinkedinLogoIcon, GithubLogoIcon, InstagramLogoIcon, XLogoIcon, StackOverflowLogoIcon, MoonIcon, SunHorizonIcon, DevToLogoIcon } from "@phosphor-icons/react";
import { useTheme } from '../hooks/useTheme'
import Link from "next/link";

export default function Header() {
  const { theme, setTheme, mounted, getStrokeStyle } = useTheme()

  if (!mounted) return null // Prevent hydration mismatch

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className="flex flex-col lg:flex-row justify-between gap-4 lg:space-y-0">
      <h1 className="order-2 lg:-ml-1 lg:order-1 py-4 lg:py-8 text-4xl md:text-6xl lg:text-name font-semibold font-poppins leading-none text-text-primary-light dark:text-text-primary-dark">
        Muhammad <span style={getStrokeStyle()}>Umair</span>
      </h1>
      <div className="flex items-start justify-start space-x-5 order-1 lg:order-2 self-end lg:self-auto">
        <div className="flex items-center justify-center space-x-2 py-2 lg:py-3">
          <Link href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <LinkedinLogoIcon weight="fill" className="social-media-icons" />
          </Link>
          <Link href="https://github.com" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
            <GithubLogoIcon className="social-media-icons" />
          </Link>
          <Link href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <InstagramLogoIcon className="social-media-icons" />
          </Link>
          <Link href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
            <XLogoIcon className="social-media-icons" />
          </Link>
          <Link href="https://stackoverflow.com" aria-label="StackOverflow" target="_blank" rel="noopener noreferrer">
            <StackOverflowLogoIcon className="social-media-icons" />
          </Link>
          <Link href="https://dev.to" aria-label="Dev.to" target="_blank" rel="noopener noreferrer">
            <DevToLogoIcon className="social-media-icons !size-[26px]" />
          </Link>
        </div>
        <button
          onClick={toggleTheme}
          className="p-4 rounded-b-lg bg-text-primary-light dark:bg-section-dark text-text-primary-dark dark:text-text-primary-dark"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <MoonIcon className="size-5 hover:scale-105" /> : <SunHorizonIcon className="size-5 hover:scale-105" />}
        </button>
      </div>
    </header>
  )
}