"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

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

export default function AdminLoginPage() {
    const router = useRouter()
    const { toast } = useToast()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        if (username === "admin" && password === "admin") {
            router.push("/admin/dashboard")
        } else if (username === "chef" && password === "chef") {
            router.push("/chef/dashboard")
        } else if (username === "doyen" && password === "doyen") {
            router.push("/doyen/dashboard")
        } else {
            toast({
                title: "Erreur de connexion",
                description: "Identifiant ou mot de passe incorrect",
                variant: "destructive",
            })
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col lg:flex-row h-screen overflow-hidden font-sans selection:bg-purple-200 selection:text-purple-900">
            {/* Left Panel - Consistent with main login */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-1/2 bg-[#6b21a8] p-12 lg:p-24 flex flex-col items-center justify-center text-white relative overflow-hidden"
            >
                <FloatingShapes />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-transparent to-black/20 pointer-events-none" />

                <div className="relative z-10 space-y-12 max-w-md text-center lg:text-left">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="flex items-center gap-4 group cursor-default justify-center lg:justify-start"
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

            {/* Right Panel - Admin Form */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-full lg:w-1/2 bg-slate-50 p-12 lg:p-24 flex flex-col justify-center items-center relative shadow-[-25px_0_50px_-12px_rgba(0,0,0,0.25)] z-20"
            >
                <div className="absolute top-12 left-12">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-slate-500 hover:text-purple-600 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Retour</span>
                    </Link>
                </div>

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

                    <motion.form
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1, duration: 0.6 }}
                        className="space-y-6"
                        onSubmit={handleLogin}
                    >
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username" className="text-sm font-semibold text-slate-700 ml-1">
                                    Identifiant
                                </Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="admin"
                                    className="h-12 bg-white border-slate-200 rounded-xl focus:ring-purple-500 focus:border-purple-500 transition-all shadow-sm"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between ml-1">
                                    <Label htmlFor="password" className="text-sm font-semibold text-slate-700">
                                        Mot de passe
                                    </Label>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="h-12 bg-white border-slate-200 rounded-xl focus:ring-purple-500 focus:border-purple-500 transition-all shadow-sm"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-[0_10px_30px_rgb(147,51,234,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Connexion..." : "Se connecter"}
                        </Button>

                        <div className="text-center">
                            <Link href="#" className="text-sm font-medium text-slate-500 hover:text-purple-600 transition-colors">
                                Mot de passe oublié ?
                            </Link>
                        </div>
                    </motion.form>
                </div>
            </motion.div>
        </div>
    )
}
