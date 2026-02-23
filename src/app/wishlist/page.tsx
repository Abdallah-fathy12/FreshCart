"use client"

import React, { useContext } from "react";
import { wishlistContext } from "@/providers/wishlistContextProvider";
import { cartContext } from "@/providers/cartContextProvider";
import { Heart, ShoppingBag, Trash2, ArrowRight, Star, Tag, Clock, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { addItemToCart } from "../_services/_actions/addToCart.action";

export default function WishlistPage() {
    const { wishlistItems, toggleWishlist } = useContext(wishlistContext);
    const cartData = useContext(cartContext);

    async function handleAddToCart(productId: string) {
        toast.promise(addItemToCart(productId), {
            loading: "Acquiring item...",
            success: (res) => {
                if (res.status === "success") {
                    cartData.setNumOfCartItems(res.numOfCartItems);
                    if (res.data) {
                        cartData.setProducts(res.data.products);
                        cartData.setTotalCartPrice(res.data.totalCartPrice);
                    }
                    return "Neural Link established. Item added. 🛍️";
                }
                throw new Error(res.message);
            },
            error: (err) => err.message || "Fragment lost during transfer",
            position: "top-center"
        });
    }

    if (!wishlistItems || wishlistItems.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fcfcfd] dark:bg-slate-950 px-6">
                <div className="text-center max-w-lg">
                    <div className="relative mb-12">
                        <div className="w-40 h-40 bg-rose-50 dark:bg-rose-500/5 rounded-[48px] flex items-center justify-center mx-auto transition-all hover:scale-105 duration-700 hover:rotate-6 border border-rose-100 dark:border-rose-500/10">
                            <Heart className="w-20 h-20 text-rose-500 animate-pulse" />
                        </div>
                    </div>
                    <h2 className="text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter italic uppercase">Archive Empty</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-lg mb-12 leading-relaxed font-medium italic">
                        The elite selection remains uninhabited. Seek out precision-engineered pieces to populate your personal archive.
                    </p>
                    <Link
                        href="/product"
                        className="group inline-flex items-center justify-center gap-6 px-12 py-6 rounded-[32px] bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-[0.3em] text-sm hover:bg-violet-600 dark:hover:bg-violet-400 transition-all active:scale-95 shadow-2xl"
                    >
                        Explore Inventory
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#fcfcfd] dark:bg-slate-950 pb-60 pt-40 px-6 sm:px-10">
            <div className="max-w-[1700px] mx-auto">

                {/* Immersive Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-32 border-b border-slate-100 dark:border-slate-800 pb-20 text-center md:text-left">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-4 px-6 py-2.5 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-2xl border border-rose-100 dark:border-rose-500/20 shadow-sm">
                            <Sparkles className="w-5 h-5" />
                            <span className="text-[11px] font-black uppercase tracking-[0.4em]">Personal Collection</span>
                        </div>
                        <h1 className="text-7xl sm:text-[120px] font-black text-slate-900 dark:text-white tracking-tighter leading-[0.85] italic uppercase">
                            Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-rose-500 to-rose-700">Favorite</span>
                        </h1>
                    </div>

                    <div className="flex flex-col gap-8 md:items-end">
                        <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-xl dark:shadow-none">
                            <div className="w-16 h-16 bg-rose-500 rounded-[20px] flex items-center justify-center text-white shadow-xl shadow-rose-200 dark:shadow-none">
                                <span className="text-2xl font-black">{wishlistItems.length}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest leading-none">Archived Items</span>
                                <span className="text-xl font-black text-slate-900 dark:text-white mt-1 italic uppercase">Ready for Transfer</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wishlist Grid Architecture */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-32">
                    {wishlistItems.map((product: any) => (
                        <div
                            key={product.id || product._id}
                            className="group relative flex flex-col gap-10"
                        >
                            {/* Visual Asset */}
                            <div className="relative aspect-[3/4] rounded-[64px] overflow-hidden bg-white dark:bg-slate-900 border border-white dark:border-slate-800 ring-1 ring-slate-100 dark:ring-transparent transition-all duration-700 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_60px_100px_-10px_rgba(244,63,94,0.15)] hover:-translate-y-4">
                                <Link href={`/product/${product.id || product._id}`}>
                                    <Image
                                        src={product.imageCover}
                                        alt={product.title}
                                        fill
                                        className="object-contain p-12 transition-all duration-1000 group-hover:scale-105 group-hover:rotate-1"
                                        sizes="(max-width: 768px) 100vw, 25vw"
                                    />
                                </Link>

                                {/* Status Overlays */}
                                <div className="absolute top-8 left-8">
                                    <div className="px-4 py-2 bg-slate-900/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                        <span className="text-[10px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest">In Stock</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => toggleWishlist(product.id || product._id)}
                                    className="absolute bottom-8 right-8 w-14 h-14 bg-rose-500 text-white rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-8 group-hover:translate-y-0 shadow-xl shadow-rose-200 hover:rotate-12 active:scale-95"
                                >
                                    <Trash2 className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Information Infrastructure */}
                            <div className="px-6 space-y-6">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-black text-rose-500 uppercase tracking-[0.3em] font-mono italic">Fragment 0{Math.floor(Math.random() * 100)}</span>
                                        <div className="flex items-center gap-1.5 text-yellow-500">
                                            <Star className="w-3.5 h-3.5 fill-current" />
                                            <span className="text-xs font-black text-slate-400">{product.ratingsAverage || 5.0}</span>
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase group-hover:text-rose-500 transition-colors line-clamp-1">{product.title}</h3>
                                </div>

                                <div className="flex items-end justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest leading-none">Acquisition Cost:</span>
                                        <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic mt-1 font-mono">${product.price}</span>
                                    </div>
                                    <button
                                        onClick={() => handleAddToCart(product.id || product._id)}
                                        className="h-16 w-16 bg-slate-100 dark:bg-slate-800 rounded-[20px] flex items-center justify-center text-slate-400 dark:text-slate-500 hover:bg-violet-600 hover:text-white transition-all transform hover:rotate-12 active:scale-90 shadow-sm"
                                    >
                                        <ShoppingBag className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
