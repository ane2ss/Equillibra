"use client"

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const roomData = [
    { name: "Amphi A", capacity: 500, occupation: 85 },
    { name: "Salle 102", capacity: 40, occupation: 72 },
    { name: "Labo Info 1", capacity: 30, occupation: 94 },
    { name: "Amphi B", capacity: 450, occupation: 65 },
    { name: "Salle 304", capacity: 60, occupation: 48 },
]

export default function DoyenDashboard() {
    const { toast } = useToast()

    const handleValidation = () => {
        toast({
            title: "Validation en cours",
            description: "Validation de l'emploi du temps...",
            duration: 2000,
        })

        setTimeout(() => {
            toast({
                title: "Succès",
                description: "L'emploi du temps a été validé et publié.",
                duration: 3000,
            })
        }, 2000)
    }

    return (
        <>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">Tableau de bord Vice-Doyen</h1>
                    <p className="text-muted-foreground mt-1 flex items-center gap-1.5 font-medium">
                        Supervision globale des emplois du temps
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <Select>
                        <SelectTrigger className="w-[180px] rounded-xl bg-background border-border">
                            <SelectValue placeholder="Département" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="info">Informatique</SelectItem>
                            <SelectItem value="math">Mathématiques</SelectItem>
                            <SelectItem value="phys">Physique</SelectItem>
                            <SelectItem value="chimie">Chimie</SelectItem>
                        </SelectContent>
                    </Select>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            onClick={handleValidation}
                            className="bg-green-600 hover:bg-green-700 text-white rounded-2xl gap-2 px-6 shadow-lg shadow-green-600/20 transition-all"
                        >
                            Valider l'EDT <Calendar size={16} />
                        </Button>
                    </motion.div>
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
                        label: "Équité Professeurs",
                        value: "92/100",
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
        </>
    )
}
