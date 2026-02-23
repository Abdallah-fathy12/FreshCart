"use client"

import React from 'react'
import Link from 'next/link'
import {
    ShoppingBag,
    Instagram,
    Twitter,
    Facebook,
    ArrowUpRight,
    Mail,
    ShieldCheck,
    Cpu,
    Globe,
    Zap,
    Heart
} from 'lucide-react'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    const footerLinks = [
        {
            title: "Archive Navigation",
            links: [
                { name: "Master Catalogue", href: "/product" },
                { name: "Sector Categories", href: "/categories" },
                { name: "Corporate Alliances", href: "/brands" },
                { name: "Order Manifests", href: "/allorders" },
            ]
        },
        {
            title: "Security & Legal",
            links: [
                { name: "Privacy Protocol", href: "#" },
                { name: "Terms of Engagement", href: "#" },
                { name: "Cookie Manifest", href: "#" },
                { name: "Compliance ID", href: "#" },
            ]
        },
        {
            title: "Support Node",
            links: [
                { name: "Help Terminal", href: "#" },
                { name: "Transfer Status", href: "#" },
                { name: "Returns Protocol", href: "#" },
                { name: "Contact Liaison", href: "#" },
            ]
        }
    ]

    return (
        <footer className="relative bg-white dark:bg-slate-950 pt-20 sm:pt-40 pb-12 sm:pb-20 px-6 sm:px-8 lg:px-16 overflow-hidden transition-colors duration-500 border-t border-slate-100 dark:border-slate-800/50">
            {/* Background Texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.07] mix-blend-overlay">
                <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            </div>

            <div className="max-w-[1700px] mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 sm:gap-20 lg:gap-32 pb-20 sm:pb-40 border-b border-slate-100 dark:border-slate-800">

                    {/* Brand Column */}
                    <div className="lg:col-span-5 space-y-8 sm:space-y-12 text-center lg:text-left flex flex-col items-center lg:items-start">
                        <Link href="/" className="flex items-center gap-4 sm:gap-6 group">
                            <div className="w-12 h-12 sm:w-16 h-16 bg-violet-600 rounded-[20px] sm:rounded-[28px] flex items-center justify-center text-white shadow-[0_20px_40px_-5px_rgba(124,58,237,0.4)] group-hover:rotate-12 transition-all duration-700">
                                <span className="text-2xl sm:text-3xl font-black italic">f</span>
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-none">Fresh<span className="text-violet-500">Cart</span></span>
                                <span className="text-[7px] sm:text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] mt-1">Elite Archive Ecosystem</span>
                            </div>
                        </Link>

                        <p className="text-lg sm:text-xl font-bold text-slate-400 dark:text-slate-500 leading-relaxed italic max-w-sm">
                            "Meticulously curated gear for the Modern Visionary. Defining the architectural future of luxury commerce."
                        </p>

                        <div className="flex items-center gap-4 sm:gap-6">
                            {[Instagram, Twitter, Facebook].map((Icon, i) => (
                                <a key={i} href="#" className="w-12 h-12 sm:w-14 h-14 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-all hover:-translate-y-2 shadow-sm">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Nav Links columns */}
                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-16">
                        {footerLinks.map((section, i) => (
                            <div key={i} className="space-y-6 sm:space-y-10 text-center sm:text-left">
                                <h4 className="text-[10px] sm:text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-[0.3em] sm:tracking-[0.4em] italic border-l-0 sm:border-l-4 border-violet-600 sm:pl-4">{section.title}</h4>
                                <ul className="space-y-4 sm:space-y-6">
                                    {section.links.map((link, j) => (
                                        <li key={j}>
                                            <Link href={link.href} className="group flex items-center justify-center sm:justify-start gap-3 text-slate-400 dark:text-slate-600 hover:text-violet-600 dark:hover:text-violet-400 transition-all font-bold uppercase tracking-widest text-[9px] sm:text-[10px]">
                                                {link.name}
                                                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 translate-x-1 hidden sm:block" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar Metrics */}
                <div className="pt-12 sm:pt-20 flex flex-col xl:flex-row items-center justify-between gap-10 sm:gap-12">
                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
                        {[
                            { icon: ShieldCheck, label: "Quantum Encrypted" },
                            { icon: Cpu, label: "Core Sync Active" },
                            { icon: Globe, label: "Global Edge Nodes" },
                            { icon: Zap, label: "Priority Protocol" }
                        ].map((metric, i) => (
                            <div key={i} className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl sm:rounded-2xl border border-slate-100 dark:border-slate-800">
                                <metric.icon className="w-3 h-3 sm:w-4 h-4 text-violet-600 dark:text-violet-400" />
                                <span className="text-[8px] sm:text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest leading-none">{metric.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-10">
                        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest italic text-center">
                            <span>© {currentYear} FreshCart Elite</span>
                            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-violet-600"></div>
                            <span>Architected for the Future</span>
                        </div>

                        <div className="flex items-center gap-2 px-5 py-2 sm:px-6 sm:py-2.5 bg-rose-50 dark:bg-rose-500/5 text-rose-500 rounded-full border border-rose-100 dark:border-rose-500/10 text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em]">
                            Built with Precision <Heart className="w-3 h-3 fill-current" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Visual Flare Accent */}
            <div className="absolute bottom-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-violet-600/5 blur-[100px] sm:blur-[150px] rounded-full translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        </footer>
    )
}
