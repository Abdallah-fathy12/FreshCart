"use client"

import React, { useEffect, useState } from 'react';
import { getAllBrands, getSpecificBrand } from '../_actions/brandActions';
import Image from 'next/image';
import { LayoutGrid, Loader2, Sparkles, X, ExternalLink, Tag, Globe, ArrowRight, ShieldCheck, Zap, Layers, Cpu } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function BrandsPage() {
    const [brands, setBrands] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedBrand, setSelectedBrand] = useState<any>(null);
    const [modalLoading, setModalLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const res = await getAllBrands();
            if (res.status === "error" || !res.data) {
                setBrands([]);
            } else {
                setBrands(res.data);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    async function handleBrandClick(brandId: string) {
        setModalLoading(true);
        const res = await getSpecificBrand(brandId);
        if (res.data) {
            setSelectedBrand(res.data);
        }
        setModalLoading(false);
    }

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfcfd] dark:bg-slate-950">
                <div className="relative">
                    <div className="w-24 h-24 border-[2px] border-violet-100 dark:border-violet-900/30 border-t-violet-600 rounded-full animate-spin"></div>
                    <Cpu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-violet-600 animate-pulse" />
                </div>
                <h2 className="mt-8 text-2xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">Intel <span className="text-violet-600">Syncing</span></h2>
                <p className="text-slate-400 dark:text-slate-600 font-bold uppercase tracking-[0.4em] mt-2 text-[9px] animate-pulse">Mapping Corporate Entities...</p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-60 pt-40 px-6 sm:px-10 relative overflow-hidden">
            {/* Background Architecture */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/5 blur-[120px] rounded-full"></div>
            </div>
            <div className="max-w-[1700px] mx-auto">

                {/* Cyber-Corporate Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-40 border-b border-slate-100 dark:border-slate-800/50 pb-20">
                    <div className="space-y-10 group">
                        <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-violet-600/10 text-violet-600 dark:text-violet-400 rounded-2xl border border-violet-600/20 shadow-sm">
                            <Zap className="w-5 h-5 fill-current" />
                            <span className="text-[11px] font-black uppercase tracking-[0.3em]">Partner Ecosystem</span>
                        </div>
                        <h1 className="text-7xl sm:text-[140px] font-black text-slate-900 dark:text-white tracking-tighter leading-[0.8] italic uppercase">
                            Global <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-violet-600 via-indigo-600 to-violet-950 dark:from-violet-400 dark:to-violet-700">Alliances</span>
                        </h1>
                        <p className="max-w-xl text-slate-400 dark:text-slate-500 font-bold text-xl leading-relaxed italic border-l-4 border-violet-600/20 pl-8">
                            A decentralized network of <span className="text-slate-900 dark:text-slate-200 underline decoration-violet-500/30 decoration-8 underline-offset-4">industrial design houses</span> and couture architects.
                        </p>
                    </div>

                    <div className="relative group p-10 bg-white dark:bg-slate-900/40 backdrop-blur-3xl rounded-[56px] border border-slate-100 dark:border-white/5 shadow-2xl dark:shadow-none flex items-center gap-10 min-w-[380px] overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 rounded-full blur-3xl -translate-y-12 translate-x-12 group-hover:bg-violet-600/20 transition-colors"></div>
                        <div className="relative w-24 h-24 bg-violet-600 rounded-3xl flex items-center justify-center text-white transition-transform group-hover:rotate-12 shadow-lg shadow-violet-500/20">
                            <Layers className="w-10 h-10" />
                        </div>
                        <div className="relative">
                            <p className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter italic leading-none">{brands.length}</p>
                            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] mt-3">Verified Nodes</p>
                        </div>
                    </div>
                </div>

                {/* Alliance Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-12 sm:gap-16">
                    {brands.map((brand, index) => {
                        const brandsPalette = [
                            { text: "text-violet-500", bg: "bg-violet-500", shadow: "shadow-violet-500/20" },
                            { text: "text-indigo-500", bg: "bg-indigo-500", shadow: "shadow-indigo-500/20" },
                            { text: "text-fuchsia-500", bg: "bg-fuchsia-500", shadow: "shadow-fuchsia-500/20" },
                            { text: "text-slate-500", bg: "bg-slate-500", shadow: "shadow-slate-500/20" },
                            { text: "text-blue-500", bg: "bg-blue-500", shadow: "shadow-blue-500/20" },
                        ];
                        const palette = brandsPalette[index % brandsPalette.length];

                        return (
                            <div
                                key={brand._id}
                                onClick={() => handleBrandClick(brand._id)}
                                className="group cursor-pointer flex flex-col gap-8"
                            >
                                <div className={`relative aspect-square rounded-[48px] sm:rounded-[64px] overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.03)] transition-all duration-700 hover:shadow-2xl hover:-translate-y-4 ring-1 ring-slate-200/50 dark:ring-white/5`}>

                                    {/* Dynamic Color Blast on Hover */}
                                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 bg-gradient-to-br ${palette.bg}/10 via-transparent to-transparent`}></div>

                                    {/* Glowing Aura */}
                                    <div className={`absolute -inset-2 ${palette.bg}/20 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-1000 -z-10`}></div>

                                    <div className="relative z-10 w-full h-full p-12 sm:p-16 flex items-center justify-center">
                                        <Image
                                            src={brand.image}
                                            alt={brand.name}
                                            fill
                                            className="object-contain p-16 sm:p-20 transition-all duration-1000 group-hover:scale-110 group-hover:-rotate-3 dark:invert-0 dark:opacity-80 group-hover:opacity-100 mix-blend-multiply dark:mix-blend-normal"
                                            sizes="(max-width: 768px) 100vw, 20vw"
                                        />
                                    </div>

                                    {/* Link Indicator - Enhanced */}
                                    <div className={`absolute top-6 right-6 w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-slate-800 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-slate-100 dark:border-white/10 flex items-center justify-center translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 shadow-xl ${palette.shadow}`}>
                                        <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 ${palette.text}`} />
                                    </div>
                                </div>

                                <div className="px-4 sm:px-6 space-y-2 text-center sm:text-left">
                                    <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
                                        <span className={`text-[8px] font-black uppercase tracking-[.4em] ${palette.text} opacity-50 group-hover:opacity-100 transition-opacity`}>Sector 0{index + 1}</span>
                                    </div>
                                    <h3 className={`text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tighter transition-colors italic uppercase leading-none group-hover:${palette.text}`}>{brand.name}</h3>
                                    <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4 pt-0.5">
                                        <div className={`w-1.5 h-1.5 rounded-full ${palette.bg} animate-pulse shadow-lg`}></div>
                                        <span className="text-[9px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-[0.3em]">Protocol Active</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Detail Manifest (Modal) */}
                {selectedBrand && (
                    <div className="fixed inset-0 z-[150] flex items-center justify-center p-6">
                        <div
                            className="absolute inset-0 bg-slate-950/40 backdrop-blur-[20px] animate-in fade-in duration-700"
                            onClick={() => setSelectedBrand(null)}
                        ></div>

                        <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[80px] shadow-[0_80px_160px_rgba(0,0,0,0.4)] overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-20 duration-700 border border-slate-100 dark:border-white/5 flex flex-col items-center p-16 sm:p-24 text-center space-y-12">
                            <button
                                onClick={() => setSelectedBrand(null)}
                                className="absolute top-10 right-10 p-4 text-slate-300 dark:text-slate-600 hover:text-rose-500 transition-all bg-slate-50 dark:bg-slate-800 rounded-2xl"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-[48px] sm:rounded-[64px] bg-white dark:bg-slate-800 border-2 border-slate-50 dark:border-white/5 shadow-inner flex items-center justify-center group/img">
                                <Image
                                    src={selectedBrand.image}
                                    alt={selectedBrand.name}
                                    fill
                                    className="object-contain p-12 sm:p-20 transition-transform duration-700 group-hover/img:scale-110 dark:invert-0 mt-4 h-full"
                                />
                                <div className="absolute inset-0 bg-violet-600/5 rounded-[inherit] opacity-0 group-hover/img:opacity-100 transition-opacity"></div>
                            </div>

                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-3 px-6 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl shadow-xl shadow-violet-500/20">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Elite Fragment Verified</span>
                                </div>
                                <h2 className="text-6xl sm:text-7xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase leading-none">{selectedBrand.name}</h2>
                                <p className="text-slate-500 dark:text-slate-400 font-medium text-xl italic max-w-sm mx-auto leading-relaxed">
                                    "A distinguished node in the global architecture of industrial elegance."
                                </p>
                            </div>

                            <div className="w-full pt-4">
                                <button
                                    onClick={() => setSelectedBrand(null)}
                                    className="w-full h-20 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[32px] font-black uppercase tracking-[0.3em] text-[11px] hover:bg-violet-600 dark:hover:bg-violet-500 hover:text-white transition-all active:scale-95 shadow-2xl flex items-center justify-center gap-4 group/btn"
                                >
                                    Initiate Full Collection
                                    <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-2" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Loading Stream */}
                {modalLoading && (
                    <div className="fixed top-0 left-0 right-0 h-1.5 z-[200] bg-violet-100 dark:bg-violet-950/30 overflow-hidden">
                        <div className="h-full bg-violet-600 w-1/4 animate-[loading_1s_infinite_ease-in-out]"></div>
                    </div>
                )}
            </div>

            <style jsx global>{`
                @keyframes loading {
                    0% { transform: translateX(-100%) }
                    100% { transform: translateX(500%) }
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </main>
    );
}
