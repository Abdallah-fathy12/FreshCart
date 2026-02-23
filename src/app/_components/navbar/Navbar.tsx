"use client"

import Link from 'next/link'
import React, { useContext, useState, useEffect } from 'react'
import Image from 'next/image'
import logo from '@/images/freshcart-logo.svg'
import { signOut, useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { cartContext } from '@/providers/cartContextProvider'
import { wishlistContext } from '@/providers/wishlistContextProvider'
import { Badge } from '@/components/ui/badge'
import {
    ShoppingBag,
    LayoutGrid,
    Package,
    LogOut,
    Menu,
    X,
    Heart,
    User,
    Sun,
    Moon,
    Gamepad2,
    ShoppingCart,
    Search
} from 'lucide-react'
import { useTheme } from 'next-themes'

export default function Navbar() {
    const session = useSession()
    const pathname = usePathname()
    const router = useRouter()
    const { numOfCartItems } = useContext(cartContext)
    const { wishlistIds } = useContext(wishlistContext)
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    // Scroll behavior
    const [isScrolled, setIsScrolled] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const [profileImage, setProfileImage] = useState<string | null>(null)

    useEffect(() => {
        setMounted(true)

        // Function to sync image from storage
        const syncProfileImage = () => {
            if (session.data?.user?.email) {
                const savedImage = localStorage.getItem(`elite_image_${session.data.user.email}`)
                setProfileImage(savedImage)
            }
        }

        syncProfileImage()

        const handleScroll = () => {
            const currentScrollY = window.scrollY
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false)
            } else {
                setIsVisible(true)
            }
            setIsScrolled(currentScrollY > 20)
            setLastScrollY(currentScrollY)
        }
        window.addEventListener('scroll', handleScroll)

        // Listen for profile image updates (same tab and other tabs)
        window.addEventListener('storage', syncProfileImage)
        window.addEventListener('profile_image_updated', syncProfileImage)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('storage', syncProfileImage)
            window.removeEventListener('profile_image_updated', syncProfileImage)
        }
    }, [lastScrollY, session.data?.user?.email])

    if (!mounted) return null

    function handleLogout() {
        signOut({ redirect: true, callbackUrl: "/login" })
    }

    const navLinks = [
        { name: 'Home', href: '/', icon: <LayoutGrid className="w-4 h-4" /> },
        { name: 'Products', href: '/product', icon: <Package className="w-4 h-4" /> },
        { name: 'Categories', href: '/categories', icon: <LayoutGrid className="w-4 h-4" /> },
        ...(session.data ? [
            { name: 'Brands', href: '/brands', icon: <Package className="w-4 h-4" /> },
            { name: 'Orders', href: '/allorders', icon: <Package className="w-4 h-4" /> },
        ] : []),
    ]

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 px-3 sm:px-6 lg:px-8
                ${isVisible ? 'translate-y-0' : '-translate-y-full opacity-0'}
                ${isScrolled ? 'py-3' : 'py-8'}`}
            >
                <div className={`w-full flex items-center justify-between 
                ${isScrolled
                        ? 'bg-white/95 dark:bg-slate-950/98 shadow-[0_30px_60px_-15px_rgba(124,58,237,0.2)]'
                        : 'bg-white/80 dark:bg-slate-900/40 transition-colors shadow-sm'} 
                backdrop-blur-3xl px-4 sm:px-6 lg:px-12 py-3 sm:py-4 rounded-[30px] sm:rounded-[40px] border border-slate-200/50 dark:border-white/10 transition-all duration-700 relative overflow-hidden`}
                >
                    {/* Background Shine */}
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"></div>

                    {/* Left: Brand Identity */}
                    <Link href="/" className="flex items-center gap-3 sm:gap-5 group shrink-0">
                        <div className="w-10 h-10 sm:w-14 h-14 bg-gradient-to-br from-violet-600 to-indigo-700 rounded-[18px] sm:rounded-[24px] flex items-center justify-center text-white shadow-2xl shadow-violet-500/30 group-hover:rotate-12 transition-all duration-700">
                            <span className="text-xl sm:text-2xl font-black italic">f</span>
                        </div>
                        <div className="flex flex-col hidden sm:flex">
                            <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic leading-none">Fresh<span className="text-violet-500 underline decoration-violet-500/30 decoration-4">Cart</span></span>
                            <span className="text-[7px] sm:text-[8px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.4em] mt-1">Elite Architecture</span>
                        </div>
                    </Link>

                    {/* Center: Dynamic Navigation (Hidden on LG and below) */}
                    <div className="hidden lg:flex items-center bg-slate-100/80 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 px-2.5 py-2 rounded-3xl gap-1.5 shadow-inner">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`px-4 sm:px-6 py-2.5 rounded-2xl text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] transition-all italic
                                    ${isActive
                                            ? 'text-white bg-gradient-to-r from-violet-600 to-indigo-600 shadow-xl shadow-violet-500/20'
                                            : 'text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-white/10'}`}
                                >
                                    {link.name}
                                </Link>
                            )
                        })}
                    </div>

                    {/* Action Deck */}
                    <div className="flex items-center gap-2 sm:gap-5">

                        {/* Search Bar (Hidden on XL and below) */}
                        <div className="hidden xl:flex relative group min-w-[200px]">
                            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-violet-500 transition-colors">
                                <Search className="w-4 h-4" />
                            </div>
                            <input
                                type="text"
                                placeholder="SEARCH ARCHIVE..."
                                className="w-full bg-slate-100/80 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 rounded-2xl py-3 pl-14 pr-4 text-[9px] font-black uppercase tracking-widest text-slate-900 dark:text-white outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500/50 transition-all shadow-inner"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && searchQuery && router.push(`/product?search=${searchQuery}`)}
                            />
                        </div>

                        {session.data && (
                            <div className="flex items-center gap-2 sm:gap-4">
                                <Link href="/wishlist" className={`group flex items-center justify-center w-10 h-10 sm:w-12 h-12 rounded-[14px] sm:rounded-2xl transition-all border
                                    ${pathname === '/wishlist'
                                        ? 'bg-rose-500/10 border-rose-500/20 text-rose-500 shadow-lg shadow-rose-500/5'
                                        : 'bg-slate-100/80 dark:bg-white/5 border-slate-200/50 dark:border-transparent hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 shadow-sm'}`}>
                                    <div className="relative">
                                        <Heart className={`w-4 h-4 sm:w-5 h-5 ${pathname === '/wishlist' ? 'fill-rose-500' : ''}`} />
                                        <Badge className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-rose-500 text-white border-2 border-white dark:border-slate-950 min-w-[16px] sm:min-w-[20px] h-4 sm:h-5 flex items-center justify-center p-0 font-black text-[7px] sm:text-[8px] shadow-lg">{wishlistIds?.length || 0}</Badge>
                                    </div>
                                </Link>

                                <Link href="/cart" className={`group flex items-center justify-center w-10 h-10 sm:w-12 h-12 rounded-[14px] sm:rounded-2xl transition-all border
                                    ${pathname === '/cart'
                                        ? 'bg-violet-500/10 border-violet-500/20 text-violet-500 shadow-lg shadow-violet-500/5'
                                        : 'bg-slate-100/80 dark:bg-white/5 border-slate-200/50 dark:border-transparent hover:bg-violet-500/10 text-slate-400 hover:text-violet-500 shadow-sm'}`}>
                                    <div className="relative">
                                        <ShoppingCart className="w-4 h-4 sm:w-5 h-5" />
                                        <Badge className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-violet-500 text-white border-2 border-white dark:border-slate-950 min-w-[16px] sm:min-w-[20px] h-4 sm:h-5 flex items-center justify-center p-0 font-black text-[7px] sm:text-[8px] shadow-lg">{numOfCartItems || 0}</Badge>
                                    </div>
                                </Link>
                            </div>
                        )}

                        <div className="h-8 sm:h-10 w-px bg-slate-200 dark:bg-white/10 hidden sm:block"></div>

                        {/* Presence Controller */}
                        <div className="flex items-center gap-2 sm:gap-4">
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="p-3 sm:p-4 bg-slate-100/80 dark:bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-[14px] sm:rounded-2xl transition-all border border-slate-200/50 dark:border-white/5 shadow-sm"
                            >
                                {theme === 'dark' ? <Sun className="w-4 h-4 sm:w-5 h-5" /> : <Moon className="w-4 h-4 sm:w-5 h-5" />}
                            </button>

                            {session.data ? (
                                <div className="flex items-center gap-1 sm:gap-2 bg-slate-100/40 dark:bg-white/5 p-1 sm:p-1.5 rounded-[24px] sm:rounded-[32px] border border-slate-200/50 dark:border-white/5 shadow-xl backdrop-blur-md">
                                    <Link
                                        href="/myprofile"
                                        className="group flex items-center gap-2 sm:gap-4 hover:bg-white/5 p-1 sm:pr-6 rounded-[20px] sm:rounded-[28px] transition-all"
                                    >
                                        <div className="w-8 h-8 sm:w-12 h-12 bg-violet-600 rounded-full flex items-center justify-center text-white group-hover:rotate-6 transition-all shadow-xl shadow-violet-500/20 overflow-hidden relative border-2 border-white dark:border-slate-800">
                                            {profileImage || session.data.user?.image ? (
                                                <Image src={profileImage || (session.data.user?.image as string)} alt="Profile" fill className="object-cover" />
                                            ) : (
                                                <User className="w-4 h-4 sm:w-6 h-6" />
                                            )}
                                        </div>
                                        <div className="flex flex-col items-start hidden md:flex">
                                            <span className="text-[6px] sm:text-[7px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 leading-none mb-1">Security ID</span>
                                            <span className="text-[12px] sm:text-[14px] font-black text-slate-900 dark:text-white uppercase tracking-tighter italic leading-none">{session.data.user?.name?.split(' ')[0]}</span>
                                        </div>
                                    </Link>
                                    <div className="w-px h-6 sm:h-8 bg-slate-200 dark:bg-white/10 mx-1 hidden sm:block"></div>
                                    <button
                                        onClick={handleLogout}
                                        className="p-3 sm:p-4 bg-rose-500/5 hover:bg-rose-500 text-rose-500 hover:text-white rounded-[18px] sm:rounded-[24px] transition-all group shadow-inner"
                                    >
                                        <LogOut className="w-3 h-3 sm:w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 sm:gap-4 pl-1 sm:pl-4">
                                    <Link href="/login" className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors italic hidden xs:block">Login</Link>
                                    <Link href="/signup" className="px-4 sm:px-10 py-2 sm:py-4 rounded-[16px] sm:rounded-[24px] bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[9px] sm:text-[11px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] shadow-2xl hover:bg-violet-600 dark:hover:bg-violet-400 hover:text-white transition-all italic">Register</Link>
                                </div>
                            )}

                            {/* Mobile Toggle */}
                            <button className="lg:hidden p-3 sm:p-4 bg-slate-100/80 dark:bg-white/5 rounded-[14px] sm:rounded-2xl text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-slate-200/50 dark:border-white/5 shadow-sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 h-6" /> : <Menu className="w-5 h-5 sm:w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Immersive Mobile Navigation Backdrop */}
            {mobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-[110] bg-slate-950/80 backdrop-blur-3xl animate-in fade-in duration-700">
                    <div className="absolute right-0 top-0 bottom-0 w-full sm:w-[450px] bg-slate-900 p-12 flex flex-col gap-16 animate-in slide-in-from-right duration-700 border-l border-white/10 shadow-[-50px_0_100px_rgba(0,0,0,0.5)]">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center text-white">
                                    <Gamepad2 className="w-6 h-6" />
                                </div>
                                <span className="text-xl font-black text-white tracking-widest uppercase italic">Elite<span className="text-violet-500">FS</span></span>
                            </div>
                            <button onClick={() => setMobileMenuOpen(false)} className="p-4 bg-white/5 text-slate-400 rounded-2xl hover:text-white"><X /></button>
                        </div>

                        <div className="space-y-4">
                            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] ml-4 mb-8">Navigation Interface</p>
                            <ul className="flex flex-col gap-4">
                                {navLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between p-6 rounded-[28px] bg-white/5 text-slate-300 font-black uppercase tracking-[0.2em] text-[11px] hover:bg-violet-600 hover:text-white transition-all group">
                                            <div className="flex items-center gap-6">
                                                <div className="p-3 bg-white/5 rounded-xl group-hover:bg-white/20 transition-colors">{link.icon}</div>
                                                {link.name}
                                            </div>
                                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {session.data && (
                            <div className="mt-auto space-y-6">
                                <Link href="/cart" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between p-6 rounded-[28px] bg-violet-600 text-white font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-violet-500/20">
                                    <div className="flex items-center gap-6">
                                        <ShoppingCart className="w-5 h-5" />
                                        Cart Hub
                                    </div>
                                    <Badge className="bg-white text-violet-600 border-0">{numOfCartItems || 0}</Badge>
                                </Link>
                                <button onClick={handleLogout} className="w-full flex items-center gap-6 p-6 rounded-[28px] bg-rose-500/10 text-rose-500 font-black uppercase tracking-widest text-[11px] border border-rose-500/20">
                                    <LogOut className="w-5 h-5" />
                                    Terminate Session
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Scroll Indicator (Refinement) */}
            <div className={`fixed top-0 left-0 h-1 bg-violet-600 z-[111] transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ width: `${(lastScrollY / (typeof document !== 'undefined' ? document.documentElement.scrollHeight - window.innerHeight : 1)) * 100}%` }}></div>
        </>
    )
}

function ArrowRight(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    )
}
