"use client"

import { DashboardNavbar } from "@/components/dashboard-navbar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Share, MoreVertical, TrendingUp, Calendar, Users, ShieldAlert, GraduationCap } from "lucide-react"
import { SessionDonut } from "@/components/charts/session-donut"
import { EventsArea } from "@/components/charts/events-area"
import { SalesMultiLine } from "@/components/charts/sales-multi-line"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

const roomData = [
  { name: "Amphi A", capacity: 500, occupation: 85 },
  { name: "Salle 102", capacity: 40, occupation: 72 },
  { name: "Labo Info 1", capacity: 30, occupation: 94 },
  { name: "Amphi B", capacity: 450, occupation: 65 },
  { name: "Salle 304", capacity: 60, occupation: 48 },
]

export default function DashboardPage() {
  const { toast } = useToast()

  const handleScheduleGeneration = () => {
    toast({
      title: "Optimization Started",
      description:
        "L'algorithme d'optimisation génère maintenant votre planning. Cela peut prendre quelques instants...",
      duration: 4000,
    })

    setTimeout(() => {
      toast({
        title: "Success",
        description: "Le planning a été généré avec succès! Les conflits ont été minimisés.",
        duration: 5000,
      })
    }, 3000)
  }

  return (
    <div className="flex bg-background font-sans transition-colors duration-300">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardNavbar />

        <main className="flex-1 p-6 space-y-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Vue d'ensemble</h1>
              <p className="text-muted-foreground mt-1 flex items-center gap-1.5 font-medium">
                Plateforme d'Optimisation des Emplois du Temps
              </p>
            </div>

            <div className="flex items-center gap-2">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleScheduleGeneration}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl gap-2 px-6 shadow-lg shadow-primary/20 transition-all"
                >
                  Générer Planning <Calendar size={16} />
                </Button>
              </motion.div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        className="rounded-2xl gap-2 border-border bg-card opacity-60 cursor-not-allowed"
                        disabled
                      >
                        <Share size={16} /> Exporter
                      </Button>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Coming soon</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {[
              {
                label: "Taux d'occupation",
                value: "78%",
                icon: TrendingUp,
                color: "indigo",
                bgClass: "bg-indigo-500/10 dark:bg-indigo-500/20",
                textClass: "text-indigo-600 dark:text-indigo-400",
              },
              {
                label: "Total d'examens",
                value: "520",
                icon: GraduationCap,
                color: "emerald",
                bgClass: "bg-emerald-500/10 dark:bg-emerald-500/20",
                textClass: "text-emerald-600 dark:text-emerald-400",
              },
              {
                label: "Conflits détectés",
                value: "35",
                icon: ShieldAlert,
                color: "amber",
                pulse: true,
                bgClass: "bg-amber-500/10 dark:bg-amber-500/20",
                textClass: "text-amber-600 dark:text-amber-400",
              },
              {
                label: "Étudiants impactés",
                value: "12,450",
                icon: Users,
                color: "sky",
                bgClass: "bg-sky-500/10 dark:bg-sky-500/20",
                textClass: "text-sky-600 dark:text-sky-400",
              },
            ].map((kpi, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="h-full"
              >
                <Card className="h-full p-6 bg-card rounded-2xl shadow-lg dark:shadow-black/40 border-border relative overflow-hidden group hover:shadow-xl transition-all">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${kpi.bgClass}`}>
                      <kpi.icon size={24} className={`${kpi.textClass} ${kpi.pulse ? "animate-pulse" : ""}`} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{kpi.label}</p>
                      <h4 className="text-2xl font-bold">{kpi.value}</h4>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <motion.div
              whileHover={{ y: -2, scale: 1.005 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="lg:col-span-8 h-full"
            >
              <Card className="h-[400px] p-6 rounded-2xl border-border shadow-lg dark:shadow-black/40 hover:shadow-xl transition-all flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold">Examens Planifiés par Jour</h3>
                  <MoreVertical size={18} className="text-muted-foreground" />
                </div>
                <div className="flex-1 min-h-0">
                  <EventsArea />
                </div>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -2, scale: 1.005 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="lg:col-span-4 h-full"
            >
              <Card className="h-[400px] p-6 rounded-2xl border-border shadow-lg dark:shadow-black/40 hover:shadow-xl transition-all flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold">Utilisation des Salles</h3>
                  <div className="flex items-center gap-1 text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded-full">
                    Par Capacité
                  </div>
                </div>
                <div className="flex-1 min-h-0">
                  <SessionDonut />
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <motion.div
              whileHover={{ y: -2, scale: 1.005 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="lg:col-span-7 h-full"
            >
              <Card className="h-[450px] p-6 rounded-2xl border-border shadow-lg dark:shadow-black/40 hover:shadow-xl transition-all flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold">Répartition par Département</h3>
                </div>
                <div className="flex-1 min-h-0">
                  <SalesMultiLine />
                </div>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -2, scale: 1.005 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="lg:col-span-5 h-full"
            >
              <Card className="h-[450px] p-6 rounded-2xl border-border shadow-lg dark:shadow-black/40 hover:shadow-xl transition-all flex flex-col">
                <h3 className="font-bold mb-6">Top 5 Salles les Plus Occupées</h3>
                <div className="flex-1 min-h-0 overflow-auto">
                  <Table>
                    <TableHeader className="bg-muted/30">
                      <TableRow className="border-none hover:bg-transparent">
                        <TableHead className="font-bold text-muted-foreground text-[10px] uppercase tracking-wider">
                          Salle
                        </TableHead>
                        <TableHead className="font-bold text-muted-foreground text-[10px] uppercase tracking-wider">
                          Capacité
                        </TableHead>
                        <TableHead className="font-bold text-muted-foreground text-[10px] uppercase tracking-wider text-right">
                          Taux
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {roomData.map((room) => (
                        <TableRow key={room.name} className="border-border hover:bg-muted/20 transition-colors">
                          <TableCell className="font-semibold">{room.name}</TableCell>
                          <TableCell className="text-muted-foreground font-medium">{room.capacity}</TableCell>
                          <TableCell className="w-32">
                            <div className="flex flex-col gap-1.5">
                              <div className="flex justify-between text-[10px] font-bold">
                                <span
                                  className={
                                    room.occupation > 90
                                      ? "text-amber-600 dark:text-amber-400"
                                      : "text-muted-foreground"
                                  }
                                >
                                  {room.occupation}%
                                </span>
                              </div>
                              <Progress value={room.occupation} className="h-1.5" />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
