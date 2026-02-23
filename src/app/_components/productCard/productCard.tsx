"use client"

import WishlistBtn from './WishlistBtn'
import Link from 'next/link'
import Image from 'next/image'
import AddToCartBtn from './AddToCartBtn'
import { ProductCardProductType } from './productCard.Types'
import { Star, Zap, Eye, ArrowRight, Layers } from 'lucide-react'

export default function ProductCart({ item }: ProductCardProductType) {
    const discountPercentage = item.priceAfterDiscount
        ? Math.round(((item.price - item.priceAfterDiscount) / item.price) * 100)
        : 0;

    return (
        <div className='group relative bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 p-2.5 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(124,58,237,0.25)] hover:-translate-y-2 overflow-hidden'>

            {/* Attractive Background Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/0 via-violet-600/0 to-fuchsia-600/0 group-hover:from-violet-600/[0.03] group-hover:via-transparent group-hover:to-fuchsia-600/[0.03] transition-all duration-700 opacity-0 group-hover:opacity-100"></div>

            {/* Top Badge Layer */}
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5">
                {discountPercentage > 0 && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-rose-500 text-white rounded-xl shadow-lg transition-transform group-hover:scale-110">
                        <Zap className="w-2.5 h-2.5 fill-current" />
                        <span className="text-[9px] font-black uppercase tracking-wider">-{discountPercentage}%</span>
                    </div>
                )}
                <div className="flex items-center gap-1 px-2 py-1 bg-slate-900 dark:bg-slate-800 text-white rounded-xl shadow-lg transition-all group-hover:bg-violet-600">
                    <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-[9px] font-black uppercase tracking-wider">{item.ratingsAverage || 5.0}</span>
                </div>
            </div>

            {/* Wishlist positioned floating */}
            <div className="absolute top-4 right-4 z-20">
                <div className="scale-[0.65] origin-top-right transition-transform group-hover:scale-75">
                    <WishlistBtn productId={item.id} />
                </div>
            </div>

            {/* Visual Container */}
            <Link href={`/product/${item.id}`} className="block relative aspect-square w-full mb-6 overflow-hidden rounded-[24px] bg-[#f9fafc] dark:bg-slate-800/50 group-hover:bg-white dark:group-hover:bg-slate-800 transition-all duration-700 shadow-inner">
                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                    <Layers className="w-full h-full rotate-12 scale-125" />
                </div>

                <Image
                    src={item.imageCover}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className='object-contain p-10 transition-all duration-1000 group-hover:scale-110 group-hover:rotate-3'
                />

                {/* Vibrant Hover Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center p-6 bg-gradient-to-t from-violet-600/20 via-transparent to-transparent backdrop-blur-[2px]">
                    <div className="px-5 py-2.5 bg-violet-600 text-white font-black text-[9px] uppercase tracking-[0.2em] rounded-xl shadow-[0_20px_40px_-10px_rgba(124,58,237,0.5)] translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-1.5">
                        Deep Dive <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                </div>
            </Link>

            {/* Info Area */}
            <div className="px-3 pb-3 space-y-4 relative z-10">
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-[8px] font-black text-violet-600 dark:text-violet-400 uppercase tracking-[0.15em] bg-violet-50 dark:bg-violet-950/30 px-2.5 py-1 rounded-lg transition-colors group-hover:bg-violet-600 group-hover:text-white">
                            {item.category.name}
                        </span>
                        <span className="text-[9px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-widest">{item.brand.name}</span>
                    </div>

                    <h2 className='text-xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight line-clamp-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors italic'>
                        {item.title}
                    </h2>

                    <div className='flex items-center gap-3 pt-0.5'>
                        {item.priceAfterDiscount ? (
                            <div className="flex items-baseline gap-2">
                                <span className='text-2xl font-black text-slate-900 dark:text-white tracking-tighter group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors'>${item.priceAfterDiscount}</span>
                                <span className='text-base font-bold text-slate-200 dark:text-slate-700 line-through'>${item.price}</span>
                            </div>
                        ) : (
                            <span className='text-2xl font-black text-slate-900 dark:text-white tracking-tighter group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors'>${item.price}</span>
                        )}
                    </div>
                </div>

                <div className="pt-1 transform transition-all duration-500 group-hover:scale-105 origin-left">
                    <AddToCartBtn productId={item.id} />
                </div>
            </div>

            {/* Dynamic Glow Background */}
            <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-violet-600/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000 -z-10 animate-pulse"></div>

            <div className="absolute -z-10 inset-0 bg-violet-100/20 dark:bg-violet-900/5 blur-[60px] rounded-full scale-50 opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
        </div>
    );
}
