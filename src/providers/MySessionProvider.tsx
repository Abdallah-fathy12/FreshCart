"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import CartContextProvider from './cartContextProvider'
import WishlistContextProvider from './wishlistContextProvider'

export default function MySessionProvider({ children }: { children: React.ReactNode }) {
  return <>
    <SessionProvider>
      <WishlistContextProvider>
        <CartContextProvider>
          {children}
        </CartContextProvider>
      </WishlistContextProvider>
    </SessionProvider>
  </>
}
