"use client"

import React, { createContext, useEffect, useState, useContext } from 'react'
import { GetUserWishlist, AddToWishlist, RemoveFromWishlist } from '@/app/_actions/wishlistActions'
import { toast } from 'sonner'

export const wishlistContext = createContext<any>(null)

export default function WishlistContextProvider({ children }: { children: React.ReactNode }) {
    const [wishlistItems, setWishlistItems] = useState<any[]>([])
    const [wishlistIds, setWishlistIds] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)

    async function fetchWishlist() {
        const res = await GetUserWishlist()
        if (res.status === "success") {
            setWishlistItems(res.data)
            setWishlistIds(res.data.map((item: any) => item.id || item._id))
        }
    }

    async function toggleWishlist(productId: string) {
        const isExist = wishlistIds.includes(productId)

        if (isExist) {
            // Remove
            const res = await RemoveFromWishlist(productId)
            if (res.status === "success") {
                toast.success(res.message || "Removed from wishlist", { position: "top-center" })
                setWishlistIds(prev => prev.filter(id => id !== productId))
                setWishlistItems(prev => prev.filter(item => (item.id || item._id) !== productId))
            } else {
                toast.error("Failed to remove", { position: "top-center" })
            }
        } else {
            // Add
            const res = await AddToWishlist(productId)
            if (res.status === "success") {
                toast.success(res.message || "Added to wishlist ❤️", { position: "top-center" })
                setWishlistIds(prev => [...prev, productId])
                // Re-fetch items to get full product data
                fetchWishlist()
            } else {
                toast.error("Failed to add", { position: "top-center" })
            }
        }
    }

    useEffect(() => {
        fetchWishlist()
    }, [])

    return (
        <wishlistContext.Provider value={{
            wishlistItems,
            wishlistIds,
            toggleWishlist,
            fetchWishlist,
            isLoading
        }}>
            {children}
        </wishlistContext.Provider>
    )
}
