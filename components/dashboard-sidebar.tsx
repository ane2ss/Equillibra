"use client"

import { BarChart3, ExternalLink, Calendar, AlertTriangle, DoorOpen } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Image from "next/image"

const navItems = [
  { icon: Calendar, label: "Schedule Generation", active: true, primary: true },
  { icon: AlertTriangle, label: "Conflicts" },
  { icon: DoorOpen, label: "Salles (Rooms)" },
  { icon: BarChart3, label: "Statistiques" },
]

export function DashboardSidebar() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = mounted ? resolvedTheme || theme : "light"
  const logoSrc = currentTheme === "dark" ? "/images/eqlogo-dark.png" : "/images/eqlogo-white.png"

  return (
    <aside className="w-64 flex-shrink-0 border-r border-border bg-sidebar h-auto flex flex-col overflow-y-auto overflow-x-hidden scrollbar-hide hidden md:flex transition-colors duration-300">
      <div className="flex flex-col gap-4 p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-2">
          <div className="w-12 h-12 overflow-hidden flex-shrink-0">
            {mounted ? (
              <Image
                src={logoSrc || "/placeholder.svg"}
                alt="Équillibra Logo"
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full bg-muted animate-pulse" />
            )}
          </div>
          <span
            className={cn(
              "font-bold text-2xl tracking-tight transition-colors duration-300",
              currentTheme === "dark" ? "text-white" : "text-[#5a189a]",
            )}
          >
            Équillibra
          </span>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 px-2">
          <Avatar className="h-10 w-10 border-2 border-primary/20 shadow-sm">
            <AvatarImage src="/public/diverse-person-portrait.png" />
            <AvatarFallback>KA</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-sm truncate">Kennouche Aness</h2>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Teacher</p>
            <button className="text-[10px] text-primary flex items-center gap-1 hover:underline mt-0.5">
              Open Profile <ExternalLink size={8} />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation without dropdowns */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <motion.button
            key={item.label}
            whileTap={{ scale: 0.97 }}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200",
              item.primary
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
          >
            <item.icon size={20} />
            <span className="font-semibold">{item.label}</span>
          </motion.button>
        ))}
      </nav>
    </aside>
  )
}
