"use client"
import { Button } from '@/components/ui/button'
import { Loader, ShoppingCart } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { AddToCartBtnProps } from './productCard.Types';
import axios from 'axios';
import { toast } from 'sonner';
import { addItemToCart } from '@/app/_services/_actions/addToCart.action';
import { cartContext } from '@/providers/cartContextProvider';

export default function AddToCartBtn({ productId }: AddToCartBtnProps) {

    let { setNumOfCartItems, setProducts, setTotalCartPrice } = useContext(cartContext)

    const [loading, setLoading] = useState(false)

    async function addToCart() {
        setLoading(true)
        let data = await addItemToCart(productId)
        console.log(data);

        if (data.status === "success") {
            toast.success("Product added successfully! 🛍️", {
                position: "top-center"
            })
            // Update global state with the new data returned from API
            setNumOfCartItems(data.numOfCartItems)
            if (data.data) {
                setProducts(data.data.products)
                setTotalCartPrice(data.data.totalCartPrice)
            }
        } else {
            toast.error(data.message || "Failed to add product")
        }
        setLoading(false)
    }

    return (
        <button
            onClick={addToCart}
            disabled={loading}
            className={`
                group relative w-full h-16 sm:h-20 rounded-[28px] sm:rounded-[40px] font-black text-xs sm:text-sm uppercase tracking-[0.3em] overflow-hidden transition-all active:scale-[0.98]
                ${loading
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
                    : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:shadow-2xl hover:shadow-violet-500/20 cursor-pointer"
                }
            `}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/0 via-violet-600/20 to-violet-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            <div className="relative flex items-center justify-center gap-4">
                {loading ? (
                    <Loader className="w-5 h-5 animate-spin" />
                ) : (
                    <>
                        <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span className="italic">Add to Cart</span>
                    </>
                )}
            </div>
        </button>
    );
}
