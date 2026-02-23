'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

interface ProductImageGalleryProps {
    images: string[];
    title: string;
}

export default function ProductImageGallery({ images, title }: ProductImageGalleryProps) {
    const [activeImage, setActiveImage] = useState(images[0]);

    // Update active image if the prop changes (e.g. navigation between products)
    useEffect(() => {
        setActiveImage(images[0]);
    }, [images]);

    return (
        <div className="lg:col-span-5 space-y-8 lg:space-y-16 lg:sticky lg:top-32 w-full">
            {/* Main Visual Terminal */}
            <div className="relative aspect-square w-full max-w-[500px] mx-auto lg:mx-0 rounded-[32px] sm:rounded-[64px] lg:rounded-[80px] overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-none group transition-all duration-700">
                <Image
                    src={activeImage}
                    alt={title}
                    fill
                    priority
                    className="object-contain p-8 sm:p-20 lg:p-32 transition-all duration-1000 group-hover:scale-105 grayscale-[0.1] group-hover:grayscale-0 dark:opacity-95 dark:group-hover:opacity-100"
                />

                {/* Status Indicators */}
                <div className="absolute top-4 left-4 sm:top-8 sm:left-8 lg:top-10 lg:left-10 space-y-3">
                    <div className="inline-flex items-center gap-2 sm:gap-3 px-3 py-1 sm:px-5 sm:py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl shadow-xl border border-white/5 dark:border-black/5">
                        <Sparkles className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-violet-400 dark:text-violet-600" />
                        <span className="text-[7px] sm:text-[9px] font-black uppercase tracking-[0.3em]">Fragment</span>
                    </div>
                </div>

                {/* Decorative Mesh Gradient Backdrop */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-1000 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.2),transparent_70%)]"></div>
            </div>

            {/* Thumbnail Rack */}
            {images.length > 1 && (
                <div className="flex gap-3 sm:gap-4 lg:gap-5 overflow-x-auto pb-3 scrollbar-hide px-1 touch-pan-x">
                    {images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveImage(img)}
                            className={`relative w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-[12px] sm:rounded-[24px] lg:rounded-[32px] overflow-hidden bg-white dark:bg-slate-900 border-2 transition-all duration-300 flex-shrink-0 cursor-pointer hover:scale-105 active:scale-95 ${activeImage === img
                                    ? 'border-violet-600 dark:border-violet-500 shadow-sm scale-105'
                                    : 'border-slate-100 dark:border-slate-800 hover:border-violet-300 dark:hover:border-violet-700'
                                }`}
                        >
                            <Image
                                src={img}
                                alt={`Artifact View ${i + 1}`}
                                fill
                                className={`object-contain p-2 sm:p-3 lg:p-4 transition-opacity duration-300 ${activeImage === img ? 'opacity-100' : 'opacity-50 dark:opacity-30 group-hover:opacity-100'}`}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
