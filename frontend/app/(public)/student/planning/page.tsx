"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Calendar, MapPin, Clock, GraduationCap } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

const examsData = [
    { id: 1, module: "Algorithmique Avancée", date: "15 Juin 2025", time: "08:30 - 10:30", room: "Amphi A", type: "Écrit" },
    { id: 2, module: "Bases de Données", date: "17 Juin 2025", time: "14:00 - 16:00", room: "Salle 102", type: "Écrit" },
    { id: 3, module: "Systèmes d'Exploitation", date: "20 Juin 2025", time: "09:00 - 11:00", room: "Labo Info 1", type: "Pratique" },
    { id: 4, module: "Anglais Technique", date: "22 Juin 2025", time: "10:00 - 11:30", room: "Amphi B", type: "Écrit" },
]

export default function StudentPlanning() {
    const [search, setSearch] = useState("")

    const filteredExams = examsData.filter(exam =>
        exam.module.toLowerCase().includes(search.toLowerCase()) ||
        exam.room.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-background font-sans">
            {/* Simplified Top Navigation */}
            <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-10">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-2 rounded-lg">
                            <GraduationCap className="text-primary w-6 h-6" />
                        </div>
                        <span className="font-bold text-xl tracking-tight">Équillibra <span className="text-muted-foreground font-normal text-sm">Étudiant</span></span>
                    </div>
                    <Button variant="ghost" size="sm">Aide</Button>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="text-center mb-12 space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight">Consultez votre planning</h1>
                    <p className="text-muted-foreground text-lg">Entrez votre matricule ou recherchez un module</p>

                    <div className="max-w-md mx-auto relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input
                            placeholder="Entrez votre matricule..."
                            className="pl-10 h-12 rounded-2xl text-lg shadow-sm border-muted-foreground/20 focus-visible:ring-primary/20"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    {filteredExams.map((exam, index) => (
                        <motion.div
                            key={exam.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="overflow-hidden border-border hover:shadow-lg transition-all rounded-2xl group">
                                <CardContent className="p-0 flex flex-col sm:flex-row">
                                    <div className="bg-primary/5 p-6 flex flex-col justify-center items-center sm:w-48 border-b sm:border-b-0 sm:border-r border-border group-hover:bg-primary/10 transition-colors">
                                        <Calendar className="w-8 h-8 text-primary mb-2" />
                                        <span className="font-bold text-lg">{exam.date.split(' ')[0]} {exam.date.split(' ')[1]}</span>
                                        <span className="text-muted-foreground text-sm">{exam.date.split(' ')[2]}</span>
                                    </div>

                                    <div className="p-6 flex-1 flex flex-col justify-center gap-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-xl font-bold mb-1">{exam.module}</h3>
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                                                    {exam.type}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                {exam.time}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4" />
                                                {exam.room}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    )
}
