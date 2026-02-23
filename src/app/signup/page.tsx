"use client"

import { signupDataType, signupSchema } from '@/Schema/signup.Schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState, useEffect } from 'react'
import { Controller, useForm } from "react-hook-form"
import { signupAction } from '../_actions/signup.actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ShoppingBag, Mail, Lock, User, Phone, ArrowRight, Sparkles, Zap, ShieldCheck, Cpu } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(signupSchema)
  })

  async function handleSignUp(values: signupDataType) {
    setLoading(true)
    try {
      const res = await signupAction(values)
      if (res) {
        toast.success("Identity profile forged successfully.", {
          style: { background: '#0f172a', border: '1px solid #7c3aed', color: '#ddd6fe' }
        })
        router.push("/login")
      } else {
        toast.error("Protocol rejection. Identity already exists or data is corrupt.", {
          style: { background: '#0f172a', border: '1px solid #e11d48', color: '#fda4af' }
        })
      }
    } catch (err) {
      toast.error("Nexus transmission failure.")
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center py-32 px-6 sm:px-10 relative overflow-hidden font-sans">

      {/* Immersive Cosmic Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-indigo-600/10 blur-[200px] rounded-full duration-[15s] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-violet-600/15 blur-[200px] rounded-full animate-pulse"></div>

      {/* Structural Accents */}
      <div className="absolute top-10 left-10 w-64 h-64 border-t border-l border-white/5 rounded-tl-[100px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 border-b border-r border-white/5 rounded-br-[100px] pointer-events-none"></div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-24 items-start relative z-10">

        {/* Left: Onboarding Intelligence (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-16">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-4 px-6 py-2.5 bg-indigo-950/40 backdrop-blur-3xl border border-indigo-500/20 rounded-[24px]">
              <Cpu className="w-5 h-5 text-indigo-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-300">Identity Protocol Initialization</span>
            </div>

            <h1 className="text-8xl font-black text-white tracking-tighter leading-[0.85] italic uppercase">
              Forge Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-500 to-fuchsia-400">Digital Aura</span>
            </h1>

            <p className="text-slate-400 font-medium text-2xl leading-relaxed italic border-l-8 border-indigo-600/20 pl-10">
              Join the vanguard of global style visionaries. Establish your profile to access our most classified archives.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {[
              { icon: Zap, title: "EXO-PRIORITY", desc: "Front-line access to limited industrial drops." },
              { icon: ShieldCheck, title: "VAULT SECURE", desc: "Multi-layer encryption for your style assets." }
            ].map((item, i) => (
              <div key={i} className="flex gap-8 items-center p-10 bg-white/[0.02] backdrop-blur-2xl rounded-[48px] border border-white/5 shadow-2xl group hover:border-indigo-500/30 transition-all duration-500">
                <div className="w-20 h-20 bg-black border border-white/10 rounded-3xl flex items-center justify-center text-indigo-500 shadow-xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 transform group-hover:-rotate-12">
                  <item.icon className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-white uppercase tracking-[0.3em] text-[11px]">{item.title}</h4>
                  <p className="text-slate-500 text-[10px] font-black leading-relaxed uppercase tracking-tighter">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: The Nexus Core (Signup form - 7 Cols) */}
        <div className="lg:col-span-7 relative group">
          <div className="absolute inset-0 bg-indigo-600/5 blur-[120px] rounded-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

          <div className="relative bg-slate-900/40 backdrop-blur-[60px] border border-white/10 rounded-[80px] p-10 sm:p-24 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.6)]">

            <div className="flex flex-col sm:flex-row items-center justify-between gap-10 mb-20">
              <div className="text-center sm:text-left space-y-3">
                <h2 className="text-5xl font-black text-white tracking-tighter italic uppercase">Create Identity</h2>
                <p className="text-indigo-400 font-black uppercase tracking-[0.4em] text-[10px]">Establishing Global Citizenship</p>
              </div>
              <div className="w-20 h-20 bg-slate-950 border border-white/10 rounded-[32px] flex items-center justify-center text-white shadow-2xl shrink-0 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                <User className="w-8 h-8" />
              </div>
            </div>

            <form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {/* Full Name */}
                <div className="space-y-4">
                  <div className="relative group/input">
                    <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-focus-within/input:opacity-100 transition-opacity rounded-3xl blur-xl"></div>
                    <div className="relative">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/input:text-indigo-400 transition-colors">
                        <User className="w-5 h-5" />
                      </div>
                      <input placeholder="FULL LEGAL NAME" {...form.register('name')} className="w-full h-20 pl-16 pr-8 bg-black/40 border border-white/5 rounded-[32px] text-white font-black text-[10px] outline-none transition-all focus:border-indigo-500/50 focus:bg-black/60 placeholder:text-slate-700 placeholder:font-black placeholder:tracking-[0.2em]" />
                    </div>
                  </div>
                  {form.formState.errors.name && <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest ml-6">{form.formState.errors.name.message}</p>}
                </div>

                {/* Email Address */}
                <div className="space-y-4">
                  <div className="relative group/input">
                    <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-focus-within/input:opacity-100 transition-opacity rounded-3xl blur-xl"></div>
                    <div className="relative">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/input:text-indigo-400 transition-colors">
                        <Mail className="w-5 h-5" />
                      </div>
                      <input {...form.register('email')} type="email" placeholder="OPERATOR EMAIL" className="w-full h-20 pl-16 pr-8 bg-black/40 border border-white/5 rounded-[32px] text-white font-black text-[10px] outline-none transition-all focus:border-indigo-500/50 focus:bg-black/60 placeholder:text-slate-700 placeholder:font-black placeholder:tracking-[0.2em]" />
                    </div>
                  </div>
                  {form.formState.errors.email && <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest ml-6">{form.formState.errors.email.message}</p>}
                </div>

                {/* Password */}
                <div className="space-y-4">
                  <div className="relative group/input">
                    <div className="absolute inset-0 bg-fuchsia-600/10 opacity-0 group-focus-within/input:opacity-100 transition-opacity rounded-3xl blur-xl"></div>
                    <div className="relative">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/input:text-fuchsia-400 transition-colors">
                        <Lock className="w-5 h-5" />
                      </div>
                      <input {...form.register('password')} type="password" placeholder="NEW PASS-KEY" className="w-full h-20 pl-16 pr-8 bg-black/40 border border-white/5 rounded-[32px] text-white font-black text-[10px] outline-none transition-all focus:border-fuchsia-500/50 focus:bg-black/60 placeholder:text-slate-700 placeholder:font-black placeholder:tracking-[0.2em]" />
                    </div>
                  </div>
                  {form.formState.errors.password && <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest ml-6">{form.formState.errors.password.message}</p>}
                </div>

                {/* Confirm Password */}
                <div className="space-y-4">
                  <div className="relative group/input">
                    <div className="absolute inset-0 bg-fuchsia-600/10 opacity-0 group-focus-within/input:opacity-100 transition-opacity rounded-3xl blur-xl"></div>
                    <div className="relative">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/input:text-fuchsia-400 transition-colors">
                        <Lock className="w-5 h-5" />
                      </div>
                      <input {...form.register('rePassword')} type="password" placeholder="VERIFY PASS-KEY" className="w-full h-20 pl-16 pr-8 bg-black/40 border border-white/5 rounded-[32px] text-white font-black text-[10px] outline-none transition-all focus:border-fuchsia-500/50 focus:bg-black/60 placeholder:text-slate-700 placeholder:font-black placeholder:tracking-[0.2em]" />
                    </div>
                  </div>
                  {form.formState.errors.rePassword && <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest ml-6">{form.formState.errors.rePassword.message}</p>}
                </div>

                {/* Phone Number */}
                <div className="md:col-span-2 space-y-4">
                  <div className="relative group/input">
                    <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-focus-within/input:opacity-100 transition-opacity rounded-3xl blur-xl"></div>
                    <div className="relative">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within/input:text-indigo-400 transition-colors">
                        <Phone className="w-5 h-5" />
                      </div>
                      <input {...form.register('phone')} type="tel" placeholder="MOBILE FREQUENCY (PHONE)" className="w-full h-20 pl-16 pr-8 bg-black/40 border border-white/5 rounded-[32px] text-white font-black text-[10px] outline-none transition-all focus:border-indigo-500/50 focus:bg-black/60 placeholder:text-slate-700 placeholder:font-black placeholder:tracking-[0.2em]" />
                    </div>
                  </div>
                  {form.formState.errors.phone && <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest ml-6">{form.formState.errors.phone.message}</p>}
                </div>
              </div>

              <div className="pt-12 flex flex-col md:flex-row gap-12 items-center">
                <button
                  disabled={loading}
                  className="relative w-full md:w-auto px-20 h-24 overflow-hidden group/btn rounded-[32px] active:scale-95 transition-all shadow-[0_30px_60px_-15px_rgba(79,70,229,0.3)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 group-hover/btn:rotate-180 transition-transform duration-1000"></div>
                  <div className="relative flex items-center justify-center gap-6 text-white font-black uppercase tracking-[0.4em] text-xs h-full">
                    {loading ? (
                      <div className="w-7 h-7 border-3 border-white/20 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Establish Profile
                        <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
                      </>
                    )}
                  </div>
                </button>

                <div className="flex flex-col items-center md:items-start space-y-2">
                  <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em]">Affiliated Member?</span>
                  <Link href="/login" className="text-indigo-400 font-black uppercase tracking-[0.3em] text-[10px] hover:text-white transition-colors border-b border-indigo-900/50 pb-1">
                    Login To Identity
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Visual Texture Layer */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
    </div>
  )
}
