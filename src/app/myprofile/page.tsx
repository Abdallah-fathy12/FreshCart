"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import { User, Mail, Shield, Calendar, UserCheck, Settings, LogOut, Camera, Edit3 } from "lucide-react"
import { signOut } from "next-auth/react"
import { useState, useRef, useEffect } from "react"
import { toast } from "sonner"

export default function MyProfile() {
    const { data: session } = useSession()
    const userData = session?.user
    const [profileImage, setProfileImage] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (userData?.email) {
            const savedImage = localStorage.getItem(`elite_image_${userData.email}`)
            if (savedImage) setProfileImage(savedImage)
        }
    }, [userData?.email])

    if (!session) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fcfcfd] dark:bg-slate-950 px-6">
                <div className="flex flex-col items-center animate-pulse">
                    <div className="w-20 h-20 bg-slate-100 dark:bg-slate-900 rounded-full mb-6"></div>
                    <div className="h-4 w-48 bg-slate-100 dark:bg-slate-900 rounded"></div>
                </div>
            </div>
        )
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file && userData?.email) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const base64String = reader.result as string
                setProfileImage(base64String)
                localStorage.setItem(`elite_image_${userData.email}`, base64String)

                // Trigger instant update across components
                window.dispatchEvent(new Event('profile_image_updated'))

                toast.success("Profile manifest updated! 📸", {
                    description: "Your digital identity has been synchronized."
                })
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <main className="min-h-screen bg-[#fcfcfd] dark:bg-slate-950 pt-40 pb-60 px-6 sm:px-10">
            <div className="max-w-5xl mx-auto">
                {/* Profile Architecture */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Perspective Side (Identity Card) */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="relative group p-10 bg-white dark:bg-slate-900 rounded-[56px] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none flex flex-col items-center text-center overflow-hidden">
                            {/* Decorative Grid */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/5 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>

                            <div className="relative w-40 h-40 rounded-full border-4 border-violet-50 dark:border-violet-900/30 p-2 mb-8 group/avatar cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                <div className="w-full h-full rounded-full bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center overflow-hidden relative">
                                    {profileImage || userData?.image ? (
                                        <Image src={profileImage || (userData?.image as string)} alt="Avatar" fill className="object-cover" />
                                    ) : (
                                        <User className="w-16 h-16 text-violet-600 dark:text-violet-400" />
                                    )}

                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                                        <Camera className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <div className="absolute bottom-2 right-2 w-10 h-10 bg-violet-600 border-4 border-white dark:border-slate-900 rounded-full flex items-center justify-center text-white shadow-lg">
                                    <Edit3 className="w-4 h-4" />
                                </div>
                            </div>

                            <div className="space-y-2 relative z-10">
                                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">{userData?.name || "Member"}</h1>
                                <p className="text-[10px] font-black text-slate-300 dark:text-slate-500 uppercase tracking-[0.4em]">Verified Operative</p>
                            </div>

                            <button
                                onClick={() => signOut({ callbackUrl: "/login" })}
                                className="mt-12 w-full py-5 rounded-[24px] bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:bg-violet-600 dark:hover:bg-violet-400 transition-all shadow-xl active:scale-95"
                            >
                                <LogOut className="w-4 h-4" />
                                Deactivate Session
                            </button>
                        </div>
                    </div>

                    {/* Content Side (Intel Deck) */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="p-12 bg-white dark:bg-slate-900 rounded-[56px] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none space-y-12">
                            <div className="space-y-4">
                                <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">Identity Manifest</h2>
                                <div className="w-20 h-1 bg-violet-600"></div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500">
                                        <User className="w-4 h-4" />
                                        <label className="text-[10px] font-black uppercase tracking-widest">Full Designation</label>
                                    </div>
                                    <p className="text-xl font-bold text-slate-800 dark:text-slate-200 italic">{userData?.name || "Unidentified"}</p>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500">
                                        <Mail className="w-4 h-4" />
                                        <label className="text-[10px] font-black uppercase tracking-widest">Digital Coordinate</label>
                                    </div>
                                    <p className="text-xl font-bold text-slate-800 dark:text-slate-200 italic">{userData?.email || "No Email Bound"}</p>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500">
                                        <Shield className="w-4 h-4" />
                                        <label className="text-[10px] font-black uppercase tracking-widest">Security Clearance</label>
                                    </div>
                                    <p className="text-xl font-bold text-slate-800 dark:text-slate-200 italic">Level 4 (Executive)</p>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500">
                                        <Calendar className="w-4 h-4" />
                                        <label className="text-[10px] font-black uppercase tracking-widest">Activation Date</label>
                                    </div>
                                    <p className="text-xl font-bold text-slate-800 dark:text-slate-200 italic">22 FEB 2026</p>
                                </div>
                            </div>

                            <div className="pt-12 border-t border-slate-50 dark:border-slate-800 grid grid-cols-3 gap-6">
                                {[
                                    { icon: UserCheck, label: "Authenticated" },
                                    { icon: Settings, label: "Admin Access" },
                                    { icon: Shield, label: "Encrypted" }
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col items-center gap-3">
                                        <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300 dark:text-slate-600">
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}
