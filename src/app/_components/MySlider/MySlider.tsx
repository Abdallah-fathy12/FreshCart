"use client"

import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import { ArrowRight, Sparkles, Globe, ShieldCheck, Zap } from 'lucide-react'

interface SliderProps {
    imageList: string[];
    slidesPerView?: number;
    spaceBetween?: number;
    isHero?: boolean;
}

export default function MySlider({ imageList, slidesPerView = 1, spaceBetween = 0, isHero = true }: SliderProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const heroContent = [
        { title: "Pure Luxury", subtitle: "Midnight Edition 26", desc: "Experience the ultimate fusion of nocturnal aesthetics and premium textile engineering." },
        { title: "Urban Pulse", subtitle: "Velocity Series", desc: "Dynamic gear for the modern visionary. Every detail refined for maximum impact." },
        { title: "Violet Vision", subtitle: "Conceptual Design", desc: "A new era of clarity. Minimalist structures with high-voltage presence." }
    ]

    // Hydration Guard: Only render Swiper on the client
    if (!isMounted) {
        return (
            <div className={`relative overflow-hidden rounded-[40px] bg-slate-50 animate-pulse ${isHero ? 'h-[75vh] sm:h-[80vh]' : 'h-64'}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-violet-100 border-t-violet-600 rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    if (!isHero) {
        return (
            <div className="relative py-4">
                <Swiper
                    modules={[Autoplay, Navigation]}
                    slidesPerView={slidesPerView}
                    spaceBetween={spaceBetween}
                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                    loop={true}
                    breakpoints={{
                        320: { slidesPerView: 4, spaceBetween: 10 },
                        640: { slidesPerView: 6, spaceBetween: 16 },
                        1024: { slidesPerView: 8, spaceBetween: 24 },
                    }}
                    className="category-swiper"
                >
                    {imageList.map((img, index) => (
                        <SwiperSlide key={index} className="group cursor-pointer">
                            <div className="relative aspect-square max-w-[140px] mx-auto rounded-[20px] sm:rounded-[28px] overflow-hidden border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all duration-700 hover:shadow-lg hover:shadow-violet-500/10 dark:hover:shadow-none hover:-translate-y-1.5">
                                <img src={img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 dark:opacity-90 dark:group-hover:opacity-100" alt={`Category ${index}`} />
                                <div className="absolute inset-0 bg-gradient-to-t from-violet-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                                    <div className="px-3 py-1.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-lg text-violet-600 dark:text-violet-400 font-black text-[7px] uppercase tracking-[0.2em] shadow-xl border border-white dark:border-slate-800">Archive</div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        )
    }

    return (
        <div className="relative overflow-hidden group">
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                speed={1200}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop={true}
                className="main-hero-slider h-[75vh] sm:h-[80vh]"
            >
                {imageList.map((img, index) => (
                    <SwiperSlide key={index} className="relative">
                        {/* Optimized Image Layer */}
                        <div className="absolute inset-0 overflow-hidden bg-slate-100">
                            <img
                                src={img}
                                className="w-full h-full object-cover transition-transform duration-[10s] brightness-[0.85] contrast-[1.1] group-hover:scale-110"
                                alt={`Hero ${index}`}
                            />
                            {/* Refined Modular Overlays */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c10] via-[#0a0c10]/40 to-transparent"></div>
                            <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-[#fcfcfd] to-transparent"></div>

                            {/* Dynamic Accent Glow */}
                            <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-violet-600/15 blur-[120px] rounded-full animate-pulse"></div>
                        </div>

                        {/* Premium Content Layer */}
                        <div className="relative h-full flex flex-col justify-center px-8 sm:px-24">
                            <div className="max-w-5xl space-y-12">
                                <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl text-white/80 shadow-2xl">
                                    <Zap className="w-5 h-5 text-violet-400 fill-violet-400" />
                                    <span className="text-xs font-black uppercase tracking-[0.4em]">{heroContent[index % 3].subtitle}</span>
                                </div>

                                <h1 className="text-[12vw] sm:text-[140px] font-black text-white tracking-tighter leading-[0.85] italic uppercase">
                                    {heroContent[index % 3].title.split(' ')[0]} <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-violet-600 to-fuchsia-400">
                                        {heroContent[index % 3].title.split(' ')[1]}
                                    </span>
                                </h1>

                                <p className="text-slate-400 text-xl sm:text-2xl font-medium max-w-xl leading-relaxed italic border-l-4 border-violet-600/30 pl-8">
                                    "{heroContent[index % 3].desc}"
                                </p>

                                <div className="flex flex-wrap gap-6 pt-6">
                                    <button className="px-14 py-7 bg-violet-600 text-white rounded-[28px] font-black text-xl hover:bg-white hover:text-slate-900 transition-all shadow-2xl shadow-violet-500/20 active:scale-95 flex items-center gap-4 group/btn overflow-hidden relative">
                                        <span className="relative z-10 flex items-center gap-4">
                                            Shop Exclusive <ArrowRight className="w-6 h-6 transition-transform group-hover/btn:translate-x-2" />
                                        </span>
                                    </button>
                                    <button className="px-14 py-7 bg-white/5 backdrop-blur-xl text-white border border-white/20 rounded-[28px] font-black text-xl hover:bg-white/10 transition-all active:scale-95">
                                        View Archive
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Global Slider Styles */}
            <style jsx global>{`
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.2) !important;
          border-radius: 50%;
          transition: all 0.5s ease;
          opacity: 1 !important;
        }
        .swiper-pagination-bullet-active {
          width: 48px;
          background: #7c3aed !important;
          border-radius: 12px;
        }
        .swiper-pagination {
          bottom: 60px !important;
          text-align: left !important;
          padding-left: 24px !important;
        }
        @media (min-width: 640px) {
            .swiper-pagination { padding-left: 96px !important; }
        }
      `}</style>
        </div>
    )
}