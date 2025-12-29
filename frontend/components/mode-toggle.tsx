"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark"
    setTheme(newTheme)
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="rounded-xl">
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <motion.div whileTap={{ scale: 0.95 }}>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
      >
        {resolvedTheme === "dark" ? (
          <Sun className="h-5 w-5 text-amber-500 transition-transform" />
        ) : (
          <Moon className="h-5 w-5 text-indigo-600 transition-transform" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  )
}
