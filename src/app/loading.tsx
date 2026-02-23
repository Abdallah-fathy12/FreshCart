"use client"

import React from 'react'
import { Sparkles, ShoppingBag, Stars } from 'lucide-react'

export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfcfd] dark:bg-slate-950 transition-colors duration-500">
            {/* Ultra-Premium Fashion Loader */}
            <div className="relative mb-12">
                {/* Outer spinning ring */}
                <div className="w-32 h-32 border-[2px] border-slate-100 dark:border-slate-800 rounded-full"></div>

                {/* Animated Gradient Ring */}
                <div className="absolute inset-0 w-32 h-32 border-[4px] border-transparent border-t-violet-600 rounded-full animate-[spin_1s_cubic-bezier(0.76,0,0.24,1)_infinite]"></div>

                {/* Inner Glow */}
                <div className="absolute inset-4 bg-violet-50 dark:bg-violet-900/10 rounded-full flex items-center justify-center animate-pulse">
                    <ShoppingBag className="w-10 h-10 text-violet-600 dark:text-violet-500" />
                </div>

                {/* Sparkling accents */}
                <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-violet-400 animate-bounce" />
                <Stars className="absolute -bottom-4 -left-4 w-6 h-6 text-fuchsia-400 animate-pulse" />
            </div>

            <div className="text-center space-y-6">
                <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">
                    Elite <span className="text-violet-600">Archive</span>
                </h2>
                <div className="flex flex-col items-center gap-4">
                    <p className="text-slate-400 dark:text-slate-600 font-black uppercase tracking-[0.5em] text-[10px] animate-pulse">
                        Authenticating Manifest...
                    </p>
                    {/* Progress bar simulation */}
                    <div className="w-64 h-1 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden border border-white dark:border-white/5">
                        <div className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-600 w-1/2 animate-[loading_1.5s_infinite] [animation-timing-function:linear]"></div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes loading {
                    0% { transform: translateX(-100%) }
                    100% { transform: translateX(250%) }
                }
            `}</style>
        </div>
    )
}
