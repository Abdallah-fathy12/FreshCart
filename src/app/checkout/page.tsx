"use client"

import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, checkoutDataType } from "@/Schema/checkout.Schema";
import { Label } from "@/components/ui/label";
import { cartContext } from "@/providers/cartContextProvider";
import { CreditCard, Truck, ShieldCheck, ShoppingBag, MapPin, Phone, ChevronLeft, Zap, Sparkles, ChevronRight, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { CashOrder, OnlineOrder } from "@/app/checkout/checkout.action";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export default function CheckoutPage() {
    const data: any = useContext(cartContext);
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm<checkoutDataType>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            paymentMethod: "cash",
        },
        mode: "onChange",
    });

    const selectedMethod = watch("paymentMethod");

    const onSubmit = async (values: checkoutDataType) => {
        setIsSubmitting(true);
        const loadingToast = toast.loading(`Initiating ${values.paymentMethod} protocol...`, {
            position: "top-center"
        });

        const userData = {
            shippingAddress: {
                details: values.details,
                city: values.city,
                phone: values.phone
            }
        }

        try {
            if (values.paymentMethod === "cash") {
                const res = await CashOrder(data.cartId, userData);
                toast.dismiss(loadingToast);

                if (res.status === "success") {
                    toast.success("Order Archive Updated!", { position: "top-center" });
                    data.setProducts([]);
                    data.setNumOfCartItems(0);
                    data.setTotalCartPrice(0);
                    data.setCartId(null);
                    router.push("/allorders");
                } else {
                    toast.error(res.message || "Archive error", { position: "top-center" });
                }
            } else {
                const res = await OnlineOrder(data.cartId, userData);
                toast.dismiss(loadingToast);

                if (res.status === "success") {
                    window.location.href = res.session.url;
                } else {
                    toast.error(res.message || "Gateway error", { position: "top-center" });
                }
            }
        } catch (err) {
            toast.dismiss(loadingToast);
            toast.error("Cyber-connection failed.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fcfcfd] dark:bg-slate-950 pb-40 pt-24 transition-colors duration-500">

            {/* Immersive Path Bar */}
            <header className="max-w-7xl mx-auto px-8 lg:px-12 mb-16">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-10 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[48px] px-10 shadow-3xl shadow-slate-200/40 dark:shadow-none">
                    <div className="space-y-4">
                        <Link href="/cart" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-violet-600 transition-colors">
                            <ChevronLeft className="w-4 h-4" /> Return to Vault
                        </Link>
                        <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase underline decoration-violet-500 decoration-8 underline-offset-8">Secure Checkout</h1>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                            <p className="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest leading-none mb-1">Protection Protocol</p>
                            <p className="text-slate-900 dark:text-slate-200 font-black italic tracking-tighter">SSL-256 ENCRYPTED</p>
                        </div>
                        <div className="w-16 h-16 bg-violet-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-violet-500/20">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-8 lg:px-12">
                <div className="grid lg:grid-cols-12 gap-16 items-start">

                    {/* Left: Shipping Architecture */}
                    <div className="lg:col-span-7 space-y-12">
                        <div className="bg-white dark:bg-slate-900 rounded-[56px] border border-slate-100 dark:border-slate-800 shadow-4xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
                            <div className="p-12 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between bg-slate-50/30 dark:bg-slate-800/20">
                                <div className="space-y-2">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 rounded-xl border border-violet-100 dark:border-violet-800">
                                        <MapPin className="w-4 h-4" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Logistic Node</span>
                                    </div>
                                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight italic uppercase">Destiny Point</h2>
                                </div>
                                <Truck className="w-12 h-12 text-slate-100 dark:text-slate-800" />
                            </div>

                            <form className="p-12 space-y-10">
                                <div className="space-y-8">
                                    {/* Address Details */}
                                    <div className="space-y-4">
                                        <Label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] ml-2">Precision Address</Label>
                                        <div className="relative group">
                                            <textarea
                                                placeholder="Street, Building, Identity of stay..."
                                                {...register("details")}
                                                className={`w-full h-32 p-6 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-3xl text-sm font-black text-slate-900 dark:text-white outline-none transition-all focus:bg-white dark:focus:bg-slate-900 focus:border-violet-600 focus:shadow-xl focus:shadow-violet-100 dark:focus:shadow-none placeholder:text-slate-300 dark:placeholder:text-slate-800 ${errors.details ? "border-rose-200 focus:border-rose-500" : ""}`}
                                            />
                                        </div>
                                        {errors.details && <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest ml-4">{errors.details.message}</p>}
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-10">
                                        <div className="space-y-4">
                                            <Label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] ml-2">Contact Link</Label>
                                            <div className="relative">
                                                <input
                                                    placeholder="01xxxxxxxxx"
                                                    {...register("phone")}
                                                    className={`w-full h-16 px-6 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl text-sm font-black text-slate-900 dark:text-white outline-none transition-all focus:bg-white dark:focus:bg-slate-900 focus:border-violet-600 focus:shadow-lg focus:shadow-violet-100 dark:focus:shadow-none ${errors.phone ? "border-rose-200 focus:border-rose-500" : ""}`}
                                                />
                                            </div>
                                            {errors.phone && <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest ml-4">{errors.phone.message}</p>}
                                        </div>

                                        <div className="space-y-4">
                                            <Label className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] ml-2">Urban Sector</Label>
                                            <div className="relative">
                                                <input
                                                    placeholder="Focus City"
                                                    {...register("city")}
                                                    className={`w-full h-16 px-6 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl text-sm font-black text-slate-900 dark:text-white outline-none transition-all focus:bg-white dark:focus:bg-slate-900 focus:border-violet-600 focus:shadow-lg focus:shadow-violet-100 dark:focus:shadow-none ${errors.city ? "border-rose-200 focus:border-rose-500" : ""}`}
                                                />
                                            </div>
                                            {errors.city && <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest ml-4">{errors.city.message}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-10 border-t border-slate-50 dark:border-slate-800">
                                    <div className="flex items-center gap-3 mb-8">
                                        <Sparkles className="w-5 h-5 text-violet-600" />
                                        <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight italic uppercase">Transaction Protocol</h2>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-6">
                                        {/* Luxury Selection Card - Cash */}
                                        <label className={`group relative flex items-center p-8 rounded-[32px] border-2 cursor-pointer transition-all duration-500 ${selectedMethod === "cash"
                                            ? "border-violet-600 bg-violet-50/20 dark:bg-violet-500/10 shadow-2xl shadow-violet-100 dark:shadow-none"
                                            : "border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 hover:bg-white dark:hover:bg-slate-900 hover:border-violet-200 hover:shadow-xl"
                                            }`}>
                                            <input type="radio" value="cash" {...register("paymentMethod")} className="hidden" />
                                            <div className="flex gap-6 items-center">
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${selectedMethod === "cash" ? "bg-violet-600 text-white" : "bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-600 shadow-sm"}`}>
                                                    <Truck className="w-7 h-7" />
                                                </div>
                                                <div>
                                                    <p className={`text-lg font-black tracking-tight italic uppercase ${selectedMethod === "cash" ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-700"}`}>Direct Cash</p>
                                                    <p className="text-[9px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">Doorstep Proxy</p>
                                                </div>
                                            </div>
                                            {selectedMethod === "cash" && (
                                                <div className="absolute top-6 right-6 w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center animate-in zoom-in-0 duration-300">
                                                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                                </div>
                                            )}
                                        </label>

                                        {/* Luxury Selection Card - Online */}
                                        <label className={`group relative flex items-center p-8 rounded-[32px] border-2 cursor-pointer transition-all duration-500 ${selectedMethod === "online"
                                            ? "border-violet-600 bg-violet-50/20 dark:bg-violet-500/10 shadow-2xl shadow-violet-100 dark:shadow-none"
                                            : "border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 hover:bg-white dark:hover:bg-slate-900 hover:border-violet-200 hover:shadow-xl"
                                            }`}>
                                            <input type="radio" value="online" {...register("paymentMethod")} className="hidden" />
                                            <div className="flex gap-6 items-center">
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${selectedMethod === "online" ? "bg-violet-600 text-white" : "bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-600 shadow-sm"}`}>
                                                    <CreditCard className="w-7 h-7" />
                                                </div>
                                                <div>
                                                    <p className={`text-lg font-black tracking-tight italic uppercase ${selectedMethod === "online" ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-700"}`}>Digital Vault</p>
                                                    <p className="text-[9px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">Encrypted Gateway</p>
                                                </div>
                                            </div>
                                            {selectedMethod === "online" && (
                                                <div className="absolute top-6 right-6 w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center animate-in zoom-in-0 duration-300">
                                                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                                </div>
                                            )}
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right: Summary Matrix */}
                    <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-32">
                        <div className="bg-[#0a0c10] dark:bg-slate-900/40 border border-white/5 dark:border-slate-800 rounded-[56px] p-12 text-white shadow-4xl shadow-slate-900/10 dark:shadow-none relative overflow-hidden backdrop-blur-3xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 blur-[100px] rounded-full pointer-events-none"></div>

                            <h2 className="text-2xl font-black mb-12 flex items-center justify-between uppercase italic italic underline decoration-white/10 decoration-4 underline-offset-8">
                                Ledger Summary
                                <Badge className="bg-white/5 border-white/10 text-slate-500 text-[9px] font-black uppercase tracking-widest px-3 py-1">Review</Badge>
                            </h2>

                            <div className="space-y-8">
                                <div className="flex justify-between items-center text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                                    <span>Base Artifact Value</span>
                                    <span className="text-white text-base font-black italic tracking-tighter">${data?.totalCartPrice}</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                                    <span>Logistics Protocol</span>
                                    <span className="text-emerald-400 text-[9px] font-black tracking-[0.2em] bg-emerald-400/10 px-3 py-1 rounded-lg">COMPLIMENTARY</span>
                                </div>

                                <div className="h-px bg-white/5 my-10"></div>

                                <div className="flex justify-between items-end">
                                    <div className="space-y-1">
                                        <p className="text-slate-500 font-black uppercase tracking-[0.4em] text-[10px]">Aggregate Total</p>
                                        <p className="text-8xl font-black italic tracking-tighter underline decoration-violet-500 decoration-8 underline-offset-8 leading-none">${data?.totalCartPrice}</p>
                                    </div>
                                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-emerald-400 border border-white/10">
                                        <Zap className="w-8 h-8 fill-current" />
                                    </div>
                                </div>

                                <button
                                    onClick={handleSubmit(onSubmit)}
                                    disabled={!isValid || isSubmitting}
                                    className={`w-full mt-14 h-24 rounded-[32px] font-black text-xl uppercase tracking-[0.3em] italic transition-all transform active:scale-[0.98] flex items-center justify-center gap-6 ${isValid && !isSubmitting
                                        ? "bg-violet-600 text-white hover:bg-white hover:text-slate-950 shadow-2xl shadow-violet-500/30"
                                        : "bg-white/5 text-white/5 cursor-not-allowed border border-white/5 border-dashed"
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <div className="w-8 h-8 border-[3px] border-white/20 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            Finish Acquisition
                                            <ArrowRight className="w-6 h-6" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Security Verification */}
                        <div className="p-10 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 flex items-center justify-around shadow-sm dark:shadow-none">
                            {[
                                { icon: ShieldCheck, label: "Secure" },
                                { icon: Truck, label: "Express" },
                                { icon: ShoppingBag, label: "Official" }
                            ].map((b, i) => (
                                <div key={i} className="flex flex-col items-center gap-3">
                                    <div className="w-14 h-14 bg-slate-50 dark:bg-slate-950 rounded-2xl flex items-center justify-center text-violet-600 dark:text-violet-500 shadow-inner">
                                        <b.icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest">{b.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            {/* Background Texture */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.05] mix-blend-overlay">
                <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            </div>
        </div>
    );
}
