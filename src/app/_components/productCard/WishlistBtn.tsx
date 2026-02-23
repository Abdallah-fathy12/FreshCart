"use client"

import React, { useContext } from 'react'
import { wishlistContext } from '@/providers/wishlistContextProvider'
import { Heart } from 'lucide-react'

export default function WishlistBtn({ productId }: { productId: string }) {
    const { wishlistIds, toggleWishlist } = useContext(wishlistContext)

    const isFavorite = wishlistIds.includes(productId)

    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist(productId);
            }}
            className={`
                relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl flex items-center justify-center transition-all duration-500 active:scale-90 group
                ${isFavorite
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
                    : "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-100 dark:hover:border-violet-800 shadow-sm"
                }
            `}
        >
            <Heart
                className={`w-6 h-6 transition-all duration-500 ${isFavorite ? "fill-current scale-110" : "group-hover:scale-110"}`}
                strokeWidth={isFavorite ? 0 : 2.5}
            />
            {!isFavorite && (
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-violet-600/5 scale-0 group-hover:scale-100 transition-transform duration-500"></div>
            )}
        </button>
    );
}
