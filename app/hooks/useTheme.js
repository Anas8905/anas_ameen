'use client'

import { useTheme as useNextTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function useTheme() {
  const { theme, setTheme } = useNextTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getStrokeStyle = () => {
    if (!mounted) return {}
    return {
      WebkitTextStroke: theme === 'dark' ? '1px #ffffff' : '1px #000000',
      WebkitTextFillColor: 'transparent'
    }
  }

  return { theme, setTheme, mounted, getStrokeStyle }
}