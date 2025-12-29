"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Calendar, MapPin, Clock, GraduationCap, User, CalendarPlus, Loader2, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock Data
const DEPARTMENTS = [
    "Informatique",
    "Mathématiques",
    "Physique",
    "Chimie",
    "Biologie",
    "Génie Civil",
    "Génie Électrique"
]

const LEVELS = ["L1", "L2", "L3", "M1", "M2"]

const MOCK_EXAMS = [
    {
        id: 1,
        module: "Algorithmique Avancée",
        room: "Amphi A",
        date: "15 Juin 2025",
        time: "08:30",
        duration: "2h00",
        type: "student"
    },
    {
        id: 2,
        module: "Bases de Données",
        room: "Salle 102",
        date: "17 Juin 2025",
        time: "14:00",
        duration: "1h30",
        type: "student"
    },
    {
        id: 3,
        module: "Systèmes d'Exploitation",
        room: "Labo Info 1",
        date: "20 Juin 2025",
        time: "09:00",
        duration: "3h00",
        type: "student"
    },
]

const MOCK_SUPERVISIONS = [
    {
        id: 1,
        module: "Algorithmique (L1)",
        room: "Amphi B",
        date: "15 Juin 2025",
        time: "08:30",
        duration: "2h00",
        role: "Surveillant Principal"
    },
    {
        id: 2,
        module: "Analyse 2 (L1)",
        room: "Salle 204",
        date: "18 Juin 2025",
        time: "10:00",
        duration: "1h30",
        role: "Assistant"
    },
]

export default function ConsultationPage() {
    const [activeTab, setActiveTab] = useState<"student" | "teacher">("student")
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState<any[] | null>(null)
    const [error, setError] = useState(false)

    // Student Form State
    const [selectedDept, setSelectedDept] = useState("")
    const [selectedLevel, setSelectedLevel] = useState("")

    // Teacher Form State
    const [matricule, setMatricule] = useState("")

    const handleSearch = async () => {
        setLoading(true)
        setResults(null)
        setError(false)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        setLoading(false)

        // Simple mock logic
        if (activeTab === "student") {
            if (selectedDept && selectedLevel) {
                setResults(MOCK_EXAMS)
            } else {
                setError(true) // Should technically be prevented by UI
            }
        } else {
            if (matricule) {
                setResults(MOCK_SUPERVISIONS)
            } else {
                // Simulate not found for empty or specific matricule
                if (matricule === "0000") {
                    setResults([])
                } else {
                    setResults(MOCK_SUPERVISIONS)
                }
            }
        }
    }

    const resetSearch = () => {
        setResults(null)
        setError(false)
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header & Identity */}
                <div className="flex flex-col items-center space-y-6">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <Image
                            src="/images/uni-logo.png"
                            alt="Équillibra Logo"
                            width={100}
                            height={100}
                            className="object-contain drop-shadow-md"
                        />
                    </motion.div>
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Portail de Consultation</h1>
                        <p className="text-muted-foreground">Consultez vos plannings d'examens et de surveillances</p>
                    </div>
                </div>

                {/* Main Card */}
                <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
                    <CardContent className="p-0">

                        {/* Tabs */}
                        <div className="flex border-b border-gray-100">
                            <button
                                onClick={() => { setActiveTab("student"); resetSearch() }}
                                className={cn(
                                    "flex-1 py-4 text-sm font-medium text-center transition-all relative",
                                    activeTab === "student" ? "text-purple-600" : "text-gray-500 hover:text-gray-700"
                                )}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <GraduationCap className="w-5 h-5" />
                                    Espace Étudiant
                                </div>
                                {activeTab === "student" && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"
                                    />
                                )}
                            </button>
                            <button
                                onClick={() => { setActiveTab("teacher"); resetSearch() }}
                                className={cn(
                                    "flex-1 py-4 text-sm font-medium text-center transition-all relative",
                                    activeTab === "teacher" ? "text-purple-600" : "text-gray-500 hover:text-gray-700"
                                )}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <User className="w-5 h-5" />
                                    Espace Enseignant
                                </div>
                                {activeTab === "teacher" && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"
                                    />
                                )}
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="p-6 sm:p-10 min-h-[400px]">
                            <AnimatePresence mode="wait">
                                {!results && !loading && (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                        className="max-w-md mx-auto space-y-8 pt-8"
                                    >
                                        {activeTab === "student" ? (
                                            <div className="space-y-6">
                                                <div className="space-y-2">
                                                    <Label>Département</Label>
                                                    <Select value={selectedDept} onValueChange={setSelectedDept}>
                                                        <SelectTrigger className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:ring-purple-500">
                                                            <SelectValue placeholder="Choisir votre département" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {DEPARTMENTS.map(dept => (
                                                                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <AnimatePresence>
                                                    {selectedDept && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: "auto" }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className="space-y-2"
                                                        >
                                                            <Label>Niveau d'étude</Label>
                                                            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                                                                <SelectTrigger className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:ring-purple-500">
                                                                    <SelectValue placeholder="Choisir votre niveau" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {LEVELS.map(level => (
                                                                        <SelectItem key={level} value={level}>{level}</SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                                <Button
                                                    className="w-full h-12 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg shadow-purple-600/20 transition-all"
                                                    disabled={!selectedDept || !selectedLevel}
                                                    onClick={handleSearch}
                                                >
                                                    Générer mon planning
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="space-y-6">
                                                <div className="space-y-2">
                                                    <Label>Matricule Enseignant</Label>
                                                    <div className="relative">
                                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                        <Input
                                                            placeholder="Entrez votre matricule..."
                                                            className="pl-10 h-12 rounded-xl bg-gray-50 border-gray-200 focus:ring-purple-500"
                                                            value={matricule}
                                                            onChange={(e) => setMatricule(e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <Button
                                                    className="w-full h-12 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-lg shadow-purple-600/20 transition-all"
                                                    disabled={!matricule}
                                                    onClick={handleSearch}
                                                >
                                                    Afficher mon planning de surveillance
                                                </Button>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {loading && (
                                    <motion.div
                                        key="loading"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex flex-col items-center justify-center h-full py-20 space-y-4"
                                    >
                                        <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
                                        <p className="text-muted-foreground font-medium">Recherche en cours...</p>
                                    </motion.div>
                                )}

                                {results && (
                                    <motion.div
                                        key="results"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-xl font-bold text-slate-900">
                                                {activeTab === "student" ? "Votre Planning d'Examens" : "Vos Surveillances"}
                                            </h2>
                                            <Button variant="ghost" size="sm" onClick={resetSearch} className="text-muted-foreground hover:text-purple-600">
                                                Nouvelle recherche
                                            </Button>
                                        </div>

                                        {results.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center py-12 text-center space-y-3 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                                <div className="p-3 bg-gray-100 rounded-full">
                                                    <AlertCircle className="w-6 h-6 text-gray-400" />
                                                </div>
                                                <p className="text-gray-500 font-medium">Aucun résultat trouvé pour cette recherche.</p>
                                            </div>
                                        ) : (
                                            <div className="grid gap-4">
                                                {results.map((item, index) => (
                                                    <motion.div
                                                        key={item.id}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.1 }}
                                                    >
                                                        <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-all rounded-xl group">
                                                            <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                                                <div className="flex-shrink-0 w-16 h-16 bg-purple-50 rounded-xl flex flex-col items-center justify-center text-purple-700 font-bold border border-purple-100">
                                                                    <span className="text-lg">{item.date.split(' ')[0]}</span>
                                                                    <span className="text-xs uppercase">{item.date.split(' ')[1].substring(0, 3)}</span>
                                                                </div>

                                                                <div className="flex-1 space-y-1">
                                                                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-purple-700 transition-colors">
                                                                        {item.module}
                                                                    </h3>
                                                                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                                                        <div className="flex items-center gap-1.5">
                                                                            <Clock className="w-4 h-4" />
                                                                            {item.time} ({item.duration})
                                                                        </div>
                                                                        <div className="flex items-center gap-1.5">
                                                                            <MapPin className="w-4 h-4" />
                                                                            <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md text-xs font-semibold">
                                                                                {item.room}
                                                                            </span>
                                                                        </div>
                                                                        {item.role && (
                                                                            <div className="flex items-center gap-1.5">
                                                                                <User className="w-4 h-4" />
                                                                                <span className="text-purple-600 font-medium">{item.role}</span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                <Button variant="outline" size="sm" className="ml-auto shrink-0 gap-2 rounded-lg hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200">
                                                                    <CalendarPlus className="w-4 h-4" />
                                                                    <span className="hidden sm:inline">Ajouter</span>
                                                                </Button>
                                                            </CardContent>
                                                        </Card>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
