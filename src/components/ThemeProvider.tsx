'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'dark', toggle: () => {} })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null
    const preferred = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
    const initial = saved ?? preferred
    setTheme(initial)
    document.documentElement.classList.toggle('light', initial === 'light')
  }, [])

  const toggle = useCallback(() => {
    // Brief transition class so background/text/borders all animate together
    document.documentElement.classList.add('theme-transitioning')
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', next)
      document.documentElement.classList.toggle('light', next === 'light')
      setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 520)
      return next
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
