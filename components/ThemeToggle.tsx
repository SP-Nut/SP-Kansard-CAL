'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi'

interface ThemeToggleProps {
  className?: string
  showLabel?: boolean
}

export function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={`w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse ${className}`} />
    )
  }

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  const getIcon = () => {
    if (theme === 'system') {
      return <FiMonitor className="w-5 h-5 text-blue-600 dark:text-blue-400" />
    } else if (resolvedTheme === 'dark') {
      return <FiMoon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
    } else {
      return <FiSun className="w-5 h-5 text-yellow-500" />
    }
  }

  const getLabel = () => {
    if (theme === 'system') return 'System'
    if (theme === 'dark') return 'Dark'
    return 'Light'
  }

  return (
    <button
      onClick={cycleTheme}
      className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${className}`}
      aria-label={`Switch theme (current: ${getLabel()})`}
      title={`Current: ${getLabel()}. Click to cycle through Light → Dark → System`}
    >
      {getIcon()}
      {showLabel && (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {getLabel()}
        </span>
      )}
    </button>
  )
}