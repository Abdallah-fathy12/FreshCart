"use client"
import { getUserCart } from '@/app/_actions/getUserCartActions'
import React, { createContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

export let cartContext = createContext<any>(null)

export default function CartContextProvider({ children }: { children: React.ReactNode }) {
    const { status } = useSession()
    const [products, setProducts] = useState<any[] | null>(null)
    const [numOfCartItems, setNumOfCartItems] = useState<number>(0)
    const [cartId, setCartId] = useState<string | null>(null)
    const [totalCartPrice, setTotalCartPrice] = useState<number>(0)

    async function refreshCart() {
        if (status !== 'authenticated') {
            setProducts([]);
            setNumOfCartItems(0);
            return;
        }

        try {
            let userCart = await getUserCart()

            if (userCart?.status === "success") {
                setCartId(userCart.cartId)
                setNumOfCartItems(userCart.numOfCartItems)
                setProducts(userCart.data.products)
                setTotalCartPrice(userCart.data.totalCartPrice)
            } else {
                if (userCart?.message !== "User token not found. Please log in.") {
                    console.warn("Cart Sync Warning:", userCart?.message);
                }
                setProducts([]);
            }
        } catch (error: any) {
            // Silently catch network timeouts and connection resets
            console.log("Cart manifest temporarily unavailable - reconnecting...");
            setProducts([]);
        }
    }

    useEffect(function () {
        if (status === 'authenticated') {
            refreshCart()
        } else if (status === 'unauthenticated') {
            setProducts([]);
            setNumOfCartItems(0);
        }
    }, [status])

    return (
        <cartContext.Provider value={{
            products,
            numOfCartItems,
            cartId,
            totalCartPrice,
            setProducts,
            setNumOfCartItems,
            setTotalCartPrice,
            setCartId,
            refreshCart
        }}>
            {children}
        </cartContext.Provider>
    )
}
