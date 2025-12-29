"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Share, MoreVertical, TrendingUp, Calendar, Users, ShieldAlert, GraduationCap, AlertTriangle } from "lucide-react"
import { EventsArea } from "@/components/charts/events-area"
import { SalesMultiLine } from "@/components/charts/sales-multi-line"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

const conflictData = [
    { id: "C001", module: "Algorithmique", type: "Salle", detail: "Capacité insuffisante (Amphi A)", severity: "High" },
    { id: "C002", module: "Base de Données", type: "Professeur", detail: "M. Benali double réservation", severity: "Medium" },
    { id: "C003", module: "Réseaux", type: "Temps", detail: "Chevauchement avec Sys. Exp.", severity: "High" },
    { id: "C004", module: "Anglais", type: "Salle", detail: "Salle 102 non disponible", severity: "Low" },
]

export default function AdminDashboard() {
    const { toast } = useToast()

    const handleGenerate = () => {
        toast({
            title: "Génération en cours",
            description: "L'algorithme d'optimisation est lancé...",
            duration: 3000,
        })
    }

    const handleDetectConflicts = () => {
        toast({
            title: "Analyse des conflits",
            description: "Recherche de conflits dans l'emploi du temps...",
            duration: 2000,
        })
    }

    return (
        <>
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">Administration</h1>
                    <p className="text-muted-foreground mt-1 flex items-center gap-1.5 font-medium">
                        Configuration et gestion technique
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            onClick={handleDetectConflicts}
                            variant="outline"
                            className="rounded-2xl gap-2 border-amber-500/50 text-amber-600 hover:bg-amber-500/10"
                        >
                            Détection Conflits <AlertTriangle size={16} />
                        </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            onClick={handleGenerate}
                            className="bg-purple-600 hover:bg-purple-700 text-white rounded-2xl gap-2 px-6 shadow-lg shadow-purple-600/20 transition-all"
                        >
                            Générer Planning <Calendar size={16} />
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
                        label: "Conflits Actifs",
                        value: "4",
                        icon: ShieldAlert,
                        color: "amber",
                        pulse: true,
                        bgClass: "bg-amber-500/10 dark:bg-amber-500/20",
                        textClass: "text-amber-600 dark:text-amber-400",
                    },
                    {
                        label: "Salles Disponibles",
                        value: "12/45",
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
                            <h3 className="font-bold">Charge Système</h3>
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
                            <h3 className="font-bold">Gestion des Conflits</h3>
                            <div className="flex items-center gap-1 text-xs font-bold bg-amber-500/10 text-amber-600 px-2 py-1 rounded-full">
                                {conflictData.length} détectés
                            </div>
                        </div>
                        <div className="flex-1 min-h-0 overflow-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-xs">Module</TableHead>
                                        <TableHead className="text-xs">Type</TableHead>
                                        <TableHead className="text-xs text-right">Sévérité</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {conflictData.map((conflict) => (
                                        <TableRow key={conflict.id}>
                                            <TableCell className="text-xs font-medium">{conflict.module}</TableCell>
                                            <TableCell className="text-xs text-muted-foreground">{conflict.type}</TableCell>
                                            <TableCell className="text-xs text-right">
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${conflict.severity === 'High' ? 'bg-red-500/10 text-red-600' :
                                                        conflict.severity === 'Medium' ? 'bg-amber-500/10 text-amber-600' :
                                                            'bg-blue-500/10 text-blue-600'
                                                    }`}>
                                                    {conflict.severity}
                                                </span>
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
