"use client"

import React, { useEffect, useState } from "react";
import { getUserOrders } from "../_actions/getOrderActions";
import { Package, Truck, CheckCircle, Clock, CreditCard, Wallet, Calendar, Hash, ChevronRight, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AllOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchOrders() {
        setLoading(true);
        try {
            const res = await getUserOrders();
            if (Array.isArray(res)) {
                setOrders(res);
            } else if (res.data) {
                setOrders(res.data);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfcfd] dark:bg-slate-950">
                <div className="relative">
                    <div className="w-24 h-24 border-[2px] border-violet-100 dark:border-violet-900/30 border-t-violet-600 rounded-full animate-spin"></div>
                    <Package className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-violet-600 animate-pulse" />
                </div>
                <h2 className="mt-8 text-2xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">Fetching <span className="text-violet-600">Archives</span></h2>
                <p className="text-slate-400 dark:text-slate-600 font-bold uppercase tracking-[0.4em] mt-2 text-[9px] animate-pulse">Scanning Order Manifests...</p>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fcfcfd] dark:bg-slate-950 px-6">
                <div className="max-w-xl w-full text-center">
                    <div className="mb-16 relative inline-block">
                        <div className="w-48 h-48 bg-violet-50 dark:bg-violet-500/10 rounded-[64px] flex items-center justify-center mx-auto rotate-12 transition-transform hover:rotate-0 duration-700">
                            <ShoppingBag className="w-24 h-24 text-violet-500 -rotate-12" />
                        </div>
                    </div>

                    <h2 className="text-6xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter italic whitespace-nowrap uppercase">Archive Empty</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-2xl mb-14 font-medium leading-relaxed max-w-lg mx-auto">
                        No transactions found in your history. Time to start your first mission.
                    </p>

                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-5 px-14 py-7 rounded-[32px] bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-2xl hover:bg-slate-800 dark:hover:bg-slate-200 transition-all hover:scale-[1.05] shadow-2xl group"
                    >
                        Initiate Acquisition
                        <ChevronRight className="w-8 h-8 transition-transform group-hover:translate-x-3" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#fcfcfd] dark:bg-slate-950 pb-60 pt-40 transition-colors duration-500">
            <div className="max-w-[1700px] mx-auto px-6 sm:px-10">

                {/* Elite Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-32 border-b border-slate-100 dark:border-slate-800 pb-20">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 rounded-2xl border border-violet-100 dark:border-violet-800 shadow-sm">
                            <CheckCircle className="w-5 h-5" />
                            <span className="text-[11px] font-black uppercase tracking-[0.3em]">Purchase History</span>
                        </div>
                        <h1 className="text-7xl sm:text-[120px] font-black text-slate-900 dark:text-white tracking-tighter leading-[0.85] italic uppercase">
                            Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-violet-600 to-violet-900 dark:from-violet-400 dark:to-violet-700">Archives</span>
                        </h1>
                    </div>

                    <div className="flex flex-col gap-6 md:items-end">
                        <p className="max-w-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-[11px] leading-relaxed italic md:text-right">
                            "A timeline of every tactical gear acquisition. Fully logged, verified, and secured."
                        </p>
                        <div className="bg-white dark:bg-slate-900 px-10 py-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-xl dark:shadow-none flex items-center gap-6">
                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest">Total Logs</p>
                                <p className="text-4xl font-black text-slate-900 dark:text-white italic tracking-tighter">{orders.length}</p>
                            </div>
                            <div className="w-px h-12 bg-slate-100 dark:bg-slate-800"></div>
                            <Package className="w-10 h-10 text-violet-600" />
                        </div>
                    </div>
                </div>

                {/* Orders Cascade */}
                <div className="space-y-24">
                    {orders.map((order: any, orderIndex: number) => (
                        <div key={order._id} className="group relative">
                            {/* Order Badge Layer */}
                            <div className="absolute -left-4 top-0 -bottom-4 w-1 bg-violet-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 sm:gap-20">

                                {/* Info Sidebar (4 Cols) */}
                                <div className="xl:col-span-4 space-y-12">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <span className="text-[9px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.5em]">Transaction {orders.length - orderIndex}</span>
                                            <div className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border
                                                ${order.isDelivered ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 border-emerald-100 dark:border-emerald-500/20" : "bg-amber-50 dark:bg-amber-500/10 text-amber-600 border-amber-100 dark:border-amber-500/20"}`}>
                                                {order.isDelivered ? "Manifest Complete" : "In Transit"}
                                            </div>
                                        </div>
                                        <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase truncate">#{String(order.id || order._id).slice(-8).toUpperCase()}</h3>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <p className="text-[9px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest">Logged Date</p>
                                            <p className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-tighter">
                                                {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-[9px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest">Protocol</p>
                                            <p className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-tighter flex items-center gap-2">
                                                {order.paymentMethodType === "cash" ? <Wallet className="w-4 h-4" /> : <CreditCard className="w-4 h-4" />}
                                                {order.paymentMethodType.toUpperCase()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-8 bg-slate-900 dark:bg-slate-900/50 rounded-[40px] text-white space-y-8 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/20 blur-3xl -mr-16 -mt-16"></div>
                                        <div className="space-y-2 relative">
                                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">Grand Investment</p>
                                            <div className="flex items-end gap-2">
                                                <span className="text-6xl font-black italic tracking-tighter underline decoration-violet-500 decoration-4 underline-offset-4">${order.totalOrderPrice}</span>
                                            </div>
                                        </div>
                                        <button className="w-full py-5 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-violet-600 hover:text-white transition-all">
                                            Manifest Archive
                                        </button>
                                    </div>
                                </div>

                                {/* Items Grid (8 Cols) */}
                                <div className="xl:col-span-8 flex flex-col gap-6">
                                    {order.cartItems.map((item: any) => (
                                        <div key={item._id} className="group/item flex items-center gap-8 p-6 sm:p-10 bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-[48px] transition-all hover:bg-violet-50/50 dark:hover:bg-violet-950/10 hover:border-violet-100 dark:hover:border-violet-900/30">
                                            <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-slate-50 dark:bg-slate-800 rounded-[32px] p-6 shrink-0 group-hover/item:rotate-3 transition-transform">
                                                <Image
                                                    src={item.product.imageCover}
                                                    alt={item.product.title}
                                                    fill
                                                    className="object-contain p-4 group-hover/item:scale-110 transition-transform duration-700"
                                                />
                                            </div>
                                            <div className="flex-1 space-y-3">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[9px] font-black text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/30 px-3 py-1 rounded-lg uppercase tracking-widest">{item.product.category.name}</span>
                                                </div>
                                                <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase line-clamp-1">{item.product.title}</h4>
                                                <div className="flex items-center gap-6 text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">
                                                    <span>Qty: {item.count}</span>
                                                    <span>Unit: ${item.price}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-3xl font-black text-slate-900 dark:text-white italic tracking-tighter">${item.price * item.count}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
