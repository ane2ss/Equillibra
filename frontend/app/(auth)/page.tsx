"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { GraduationCap } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const FloatingShapes = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-white/10 rounded-full blur-2xl"
                    style={{
                        width: Math.random() * 300 + 100,
                        height: Math.random() * 300 + 100,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        x: [0, Math.random() * 100 - 50],
                        y: [0, Math.random() * 100 - 50],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    )
}

export default function LoginPage() {
    return (
        <div className="flex flex-col lg:flex-row h-screen overflow-hidden font-sans selection:bg-purple-200 selection:text-purple-900">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-1/2 bg-[#6b21a8] p-12 lg:p-24 flex flex-col items-center justify-center text-white relative overflow-hidden"
            >
                <FloatingShapes />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-transparent to-black/20 pointer-events-none" />

                <div className="relative z-10 space-y-12 max-w-md">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="flex items-center gap-4 group cursor-default"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-white/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
                            <Image
                                src="/images/eqlogo-white.png"
                                alt="Équillibra Logo"
                                width={80}
                                height={80}
                                className="object-contain relative z-10 drop-shadow-2xl"
                            />
                        </div>
                        <span className="text-4xl font-bold tracking-tight text-white drop-shadow-sm">Équillibra</span>
                    </motion.div>

                    <div className="space-y-6">
                        <motion.h1
                            initial={{ x: -30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-balance"
                        >
                            Bonjour
                            <br />
                            <span className="text-purple-200">Équillibra!</span>
                        </motion.h1>
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="text-xl opacity-90 leading-relaxed font-medium text-pretty border-l-2 border-white/20 pl-6"
                        >
                            Optimisez la gestion de vos examens. Une plateforme fluide pour planifier, organiser et réussir vos
                            sessions en toute simplicité.
                        </motion.p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-full lg:w-1/2 bg-slate-50 p-12 lg:p-24 flex flex-col justify-center items-center relative shadow-[-25px_0_50px_-12px_rgba(0,0,0,0.25)] z-20"
            >
                <div className="w-full max-w-sm space-y-10 relative z-10">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="space-y-6"
                    >
                        <Image
                            src="/images/uni-logo.png"
                            alt="University Logo"
                            width={120}
                            height={120}
                            className="object-contain opacity-90 hover:opacity-100 transition-opacity"
                        />
                        <div className="space-y-4">
                            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Bienvenue,</h2>
                            <div className="h-1.5 bg-purple-600 w-16 rounded-full" />
                        </div>
                    </motion.div>

                    <div className="space-y-6">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1, duration: 0.6 }}
                        >
                            <Link href="/consultation" className="block">
                                <Button className="group relative w-full h-auto min-h-[6rem] py-6 bg-white hover:bg-white text-slate-900 border border-slate-200 rounded-3xl text-left justify-start px-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(107,33,168,0.1)] transition-all duration-300 overflow-hidden flex flex-col">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                    <div className="relative z-10 w-full">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-purple-600 mb-1.5 block transition-opacity duration-300">
                                            Accès Portail
                                        </span>
                                        <span className="text-lg font-bold leading-tight block">
                                            Étudiant / Professeur
                                        </span>
                                    </div>
                                </Button>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.1, duration: 0.6 }}
                        >
                            <Link href="/admin-login" className="block">
                                <Button
                                    variant="secondary"
                                    className="group relative w-full h-auto min-h-[6rem] py-6 bg-slate-900 hover:bg-slate-800 text-white rounded-3xl text-left justify-start px-8 shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden flex items-center"
                                >
                                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <GraduationCap className="mr-6 h-8 w-8 shrink-0 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
                                    <div className="relative z-10 flex-1">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1.5 block">
                                            Administration
                                        </span>
                                        <span className="text-lg font-bold leading-tight block">
                                            Admin
                                        </span>
                                    </div>
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
