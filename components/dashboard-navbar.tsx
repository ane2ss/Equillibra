"use client"

import { Bell, MessageSquare, HelpCircle, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { ModeToggle } from "@/components/mode-toggle"

export function DashboardNavbar() {
  return (
    <TooltipProvider>
      <header className="h-16 border-b border-border bg-card dark:bg-card px-6 flex items-center justify-between gap-4 z-10 transition-colors duration-300">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <h1 className="text-lg font-bold tracking-tight flex-shrink-0">Dashboard</h1>
          <div className="hidden lg:block max-w-md w-full relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Rechercher un examen, une salle..."
              className="pl-10 bg-muted/50 border-none rounded-xl focus-visible:ring-primary w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80 flex items-center gap-2 rounded-2xl opacity-60 cursor-not-allowed"
                disabled
              >
                <HelpCircle size={18} />
                <span className="hidden sm:inline">Help Bot</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Coming soon</p>
            </TooltipContent>
          </Tooltip>
          <ModeToggle />
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-2 text-muted-foreground hover:text-foreground relative rounded-lg hover:bg-accent transition-colors opacity-60 cursor-not-allowed">
                <MessageSquare size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Coming soon</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-colors opacity-60 cursor-not-allowed">
                <Bell size={20} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Coming soon</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </header>
    </TooltipProvider>
  )
}
