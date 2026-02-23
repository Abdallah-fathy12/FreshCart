"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from "react-hook-form"
import { useRouter } from 'next/navigation'
import { loginDataType, loginSchema } from '@/Schema/login.Schema'
import { signIn } from "next-auth/react"
import Link from 'next/link'
import { ShoppingBag, Mail, Lock, ArrowRight, Sparkles, ShieldCheck, Globe, Zap, Fingerprint } from 'lucide-react'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema)
  })

  async function handleLogin(values: loginDataType) {
    setLoading(true)
    try {
      const res = await signIn("credentials", { ...values, redirect: false })
      if (res?.error) {
        toast.error("Authentication failed. Check your credentials.", {
          style: { background: '#0f172a', border: '1px solid #e11d48', color: '#fda4af' }
        })
      } else {
        toast.success("Identity verified. Welcome to the Forge.", {
          style: { background: '#0f172a', border: '1px solid #7c3aed', color: '#ddd6fe' }
        })
        router.push("/")
        router.refresh()
      }
    } catch (err) {
      toast.error("Nexus connection error.")
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center py-20 px-6 sm:px-10 relative overflow-hidden font-sans">

      {/* Immersive Cosmic Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-violet-600/20 blur-[180px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-600/10 blur-[180px] rounded-full duration-[10s] animate-pulse"></div>

      {/* Floating Geometric Accents */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 border border-violet-500/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
      <div className="absolute bottom-1/4 left-1/3 w-24 h-24 border border-fuchsia-500/10 rounded-xl rotate-45 animate-[bounce_15s_ease-in-out_infinite]"></div>

      <div className="max-w-[1300px] w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">

        {/* Left: Atmospheric Branding */}
        <div className="hidden lg:flex flex-col space-y-16">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-4 px-6 py-2.5 bg-violet-950/40 backdrop-blur-3xl border border-violet-500/20 rounded-[20px]">
              <Fingerprint className="w-5 h-5 text-violet-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-violet-300">Biometric Verification Required</span>
            </div>

            <h1 className="text-[120px] font-black text-white tracking-tight leading-[0.8] italic uppercase">
              The <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-violet-400 via-fuchsia-500 to-indigo-600">Nebula</span>
            </h1>

            <p className="max-w-md text-slate-400 font-medium text-2xl leading-relaxed italic border-l-8 border-violet-600/20 pl-10">
              "Re-sync with the global aesthetic collective. Your curated universe is one step away."
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-6 p-8 bg-white/[0.03] backdrop-blur-2xl rounded-[40px] border border-white/5 shadow-2xl">
              <div className="w-16 h-16 bg-gradient-to-tr from-violet-600 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-xl shadow-violet-500/20">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className="text-white font-black uppercase tracking-widest text-xs mb-1">Global Node Sync</h4>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-tighter">Connected to 128 clusters worldwide</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: The Obsidian Portal (Login Card) */}
        <div className="relative group">
          <div className="absolute inset-x-0 -top-20 -bottom-20 bg-violet-600/5 blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

          <div className="relative bg-slate-900/40 backdrop-blur-[60px] border border-white/10 rounded-[64px] p-10 sm:p-20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transition-all duration-700 hover:border-violet-500/30">

            <div className="flex flex-col items-center text-center space-y-6 mb-16">
              <div className="relative">
                <div className="absolute inset-0 bg-violet-600 blur-3xl opacity-20 animate-pulse"></div>
                <div className="relative w-24 h-24 bg-slate-950 rounded-[32px] flex items-center justify-center text-violet-500 border border-white/10 shadow-2xl rotate-6 group-hover:rotate-12 transition-transform duration-700">
                  <ShoppingBag className="w-10 h-10" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-5xl font-black text-white tracking-tighter italic uppercase">Vault Login</h2>
                <p className="text-violet-400 font-black uppercase tracking-[0.4em] text-[10px]">Security Clearance Authorization</p>
              </div>
            </div>

            <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-10">
              <div className="space-y-8">
                {/* Email Interface */}
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div className="space-y-4">
                      <div className="relative group/input">
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 opacity-0 group-focus-within/input:opacity-100 transition-opacity rounded-3xl blur-xl"></div>
                        <div className="relative">
                          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-violet-400 transition-colors">
                            <Mail className="w-5 h-5" />
                          </div>
                          <input
                            {...field}
                            type="email"
                            placeholder="OPERATOR EMAIL"
                            className="w-full h-20 pl-16 pr-8 bg-black/40 border border-white/5 rounded-3xl text-white font-black text-xs outline-none transition-all focus:border-violet-500/50 focus:bg-black/60 placeholder:text-slate-600 placeholder:font-black placeholder:tracking-[0.2em]"
                          />
                        </div>
                      </div>
                      {fieldState.error && <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest ml-6 animate-pulse">{fieldState.error.message}</p>}
                    </div>
                  )}
                />

                {/* Password Interface */}
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div className="space-y-4">
                      <div className="relative group/input">
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 opacity-0 group-focus-within/input:opacity-100 transition-opacity rounded-3xl blur-xl"></div>
                        <div className="relative">
                          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-violet-400 transition-colors">
                            <Lock className="w-5 h-5" />
                          </div>
                          <input
                            {...field}
                            type="password"
                            placeholder="ACCESS PASS-KEY"
                            className="w-full h-20 pl-16 pr-8 bg-black/40 border border-white/5 rounded-3xl text-white font-black text-xs outline-none transition-all focus:border-fuchsia-500/50 focus:bg-black/60 placeholder:text-slate-600 placeholder:font-black placeholder:tracking-[0.2em]"
                          />
                        </div>
                      </div>
                      {fieldState.error && <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest ml-6 animate-pulse">{fieldState.error.message}</p>}
                    </div>
                  )}
                />
              </div>

              <div className="pt-6 flex flex-col gap-8">
                <button
                  disabled={loading}
                  className="relative w-full h-20 overflow-hidden group/btn rounded-3xl active:scale-95 transition-all shadow-2xl shadow-violet-900/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 group-hover/btn:rotate-180 transition-transform duration-1000"></div>
                  <div className="relative flex items-center justify-center gap-4 text-white font-black uppercase tracking-[0.4em] text-xs h-full">
                    {loading ? (
                      <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Authorize Session
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                      </>
                    )}
                  </div>
                </button>

                <div className="flex flex-col items-center gap-4">
                  <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em]">New Operative?</span>
                  <Link
                    href="/signup"
                    className="text-violet-400 font-black uppercase tracking-[0.3em] text-[10px] hover:text-white transition-colors border-b border-violet-900/50 pb-1"
                  >
                    Establish Identity Profile
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Visual Glitch/Grain Effect Layer */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>
    </div>
  )
}
