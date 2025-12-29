"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreVertical, TrendingUp, Calendar, Users, ShieldAlert, GraduationCap } from "lucide-react"
import { EventsArea } from "@/components/charts/events-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
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
    { name: "Labo Info 1", capacity: 30, occupation: 94 },
    { name: "Salle 102", capacity: 40, occupation: 72 },
    { name: "Amphi A", capacity: 500, occupation: 85 },
]

export default function ChefDashboard() {
    const { toast } = useToast()

    const handleRequestChange = () => {
        toast({
            title: "Demande envoyée",
            description: "Votre demande de modification a été transmise au Vice-Doyen.",
            duration: 3000,
        })
    }

    return (
        <>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">Département Informatique</h1>
                    <p className="text-muted-foreground mt-1 flex items-center gap-1.5 font-medium">
                        Gestion des examens et ressources du département
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <Select disabled defaultValue="info">
                        <SelectTrigger className="w-[180px] rounded-xl bg-muted border-border opacity-80">
                            <SelectValue placeholder="Département" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="info">Informatique</SelectItem>
                        </SelectContent>
                    </Select>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            onClick={handleRequestChange}
                            className="bg-teal-600 hover:bg-teal-700 text-white rounded-2xl gap-2 px-6 shadow-lg shadow-teal-600/20 transition-all"
                        >
                            Demander Modification <Calendar size={16} />
                        </Button>
                    </motion.div>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                {[
                    {
                        label: "Taux d'occupation (Info)",
                        value: "82%",
                        icon: TrendingUp,
                        color: "indigo",
                        bgClass: "bg-indigo-500/10 dark:bg-indigo-500/20",
                        textClass: "text-indigo-600 dark:text-indigo-400",
                    },
                    {
                        label: "Examens Dept.",
                        value: "124",
                        icon: GraduationCap,
                        color: "emerald",
                        bgClass: "bg-emerald-500/10 dark:bg-emerald-500/20",
                        textClass: "text-emerald-600 dark:text-emerald-400",
                    },
                    {
                        label: "Conflits Internes",
                        value: "2",
                        icon: ShieldAlert,
                        color: "amber",
                        pulse: true,
                        bgClass: "bg-amber-500/10 dark:bg-amber-500/20",
                        textClass: "text-amber-600 dark:text-amber-400",
                    },
                    {
                        label: "Étudiants Inscrits",
                        value: "850",
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
                            <h3 className="font-bold">Planning Départemental</h3>
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
                        <h3 className="font-bold mb-6">Salles du Département</h3>
                        <div className="flex-1 min-h-0 overflow-auto">
                            <Table>
                                <TableHeader className="bg-muted/30">
                                    <TableRow className="border-none hover:bg-transparent">
                                        <TableHead className="font-bold text-muted-foreground text-[10px] uppercase tracking-wider">
                                            Salle
                                        </TableHead>
                                        <TableHead className="font-bold text-muted-foreground text-[10px] uppercase tracking-wider text-right">
                                            Occ.
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {roomData.map((room) => (
                                        <TableRow key={room.name} className="border-border hover:bg-muted/20 transition-colors">
                                            <TableCell className="font-semibold">{room.name}</TableCell>
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
