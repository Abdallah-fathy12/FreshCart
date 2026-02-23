"use client"

import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema, checkoutDataType } from "@/Schema/checkout.Schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cartContext } from "@/providers/cartContextProvider";
import { CreditCard, Truck, ShieldCheck, ShoppingBag, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { CashOrder, OnlineOrder } from "./payment.action";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const data: any = useContext(cartContext);
    const router = useRouter();

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
        const loadingToast = toast.loading(`Processing ${values.paymentMethod} payment...`, {
            position: "top-center"
        });

        const userData = {
            shippingAddress: {
                details: values.details,
                city: values.city,
                phone: values.phone
            }
        }

        if (values.paymentMethod === "cash") {
            const res = await CashOrder(data.cartId, userData);
            toast.dismiss(loadingToast);

            if (res.status === "success") {
                toast.success("Order Placed Successfully!");
                data.setProducts([]);
                data.setNumOfCartItems(0);
                data.setTotalCartPrice(0);
                data.setCartId(null);
                router.push("/allorders");
            } else {
                toast.error(res.message || "Something went wrong");
            }
        } else {
            const res = await OnlineOrder(data.cartId, userData);
            toast.dismiss(loadingToast);

            if (res.status === "success") {
                window.location.href = res.session.url;
            } else {
                toast.error(res.message || "Something went wrong");
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-20">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/cart" className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-medium">
                        <ShoppingBag className="w-5 h-5" />
                        <span className="hidden sm:inline">Back to Cart</span>
                    </Link>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent"> Secure Checkout </h1>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        <span className="hidden xs:inline">SSL Encrypted</span>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-12 gap-8 items-start">

                    {/* Left Column: Form */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                            <div className="p-8 border-b border-slate-50">
                                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                                    <MapPin className="w-6 h-6 text-indigo-500" />
                                    Shipping Details
                                </h2>
                                <p className="text-slate-500 mt-1">Please provide your delivery information</p>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                                <div className="grid gap-6">
                                    {/* Details Field */}
                                    <div className="space-y-2">
                                        <Label className="text-sm font-bold text-slate-700 ml-1">Full Address / Details</Label>
                                        <div className="relative group">
                                            <Input
                                                placeholder="Street, Building, Apartment..."
                                                {...register("details")}
                                                className={`h-14 pl-4 bg-slate-50/50 border-slate-200 rounded-2xl transition-all group-focus-within:bg-white group-focus-within:ring-4 group-focus-within:ring-indigo-500/10 ${errors.details ? "border-red-500" : "focus:border-indigo-500"
                                                    }`}
                                            />
                                        </div>
                                        {errors.details && <p className="text-xs text-red-500 font-medium ml-1">{errors.details.message}</p>}
                                    </div>

                                    {/* Phone and City Grid */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                                                <Phone className="w-4 h-4 text-slate-400" /> Phone Number
                                            </Label>
                                            <Input
                                                placeholder="01xxxxxxxxx"
                                                {...register("phone")}
                                                className={`h-14 bg-slate-50/50 border-slate-200 rounded-2xl transition-all focus:bg-white focus:ring-4 focus:ring-indigo-500/10 ${errors.phone ? "border-red-500" : "focus:border-indigo-500"
                                                    }`}
                                            />
                                            {errors.phone && <p className="text-xs text-red-500 font-medium ml-1">{errors.phone.message}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-sm font-bold text-slate-700 ml-1">City</Label>
                                            <Input
                                                placeholder="Enter your city"
                                                {...register("city")}
                                                className={`h-14 bg-slate-50/50 border-slate-200 rounded-2xl transition-all focus:bg-white focus:ring-4 focus:ring-indigo-500/10 ${errors.city ? "border-red-500" : "focus:border-indigo-500"
                                                    }`}
                                            />
                                            {errors.city && <p className="text-xs text-red-500 font-medium ml-1">{errors.city.message}</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <h3 className="text-lg font-bold text-slate-800 mb-4 ml-1">Preferred Payment Method</h3>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {/* Cash */}
                                        <label className={`relative flex items-center p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 group ${selectedMethod === "cash"
                                            ? "border-indigo-600 bg-indigo-50/50 ring-4 ring-indigo-500/10 shadow-md"
                                            : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-lg hover:shadow-slate-100"
                                            }`}>
                                            <input type="radio" value="cash" {...register("paymentMethod")} className="hidden" />
                                            <div className="flex gap-4 items-center">
                                                <div className={`p-3 rounded-xl ${selectedMethod === "cash" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                                                    <Truck className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <p className={`font-bold ${selectedMethod === "cash" ? "text-indigo-900" : "text-slate-700"}`}>Cash</p>
                                                    <p className="text-xs text-slate-500">Pay at your door</p>
                                                </div>
                                            </div>
                                            {selectedMethod === "cash" && (
                                                <div className="absolute top-3 right-3 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                                </div>
                                            )}
                                        </label>

                                        {/* Online */}
                                        <label className={`relative flex items-center p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 group ${selectedMethod === "online"
                                            ? "border-indigo-600 bg-indigo-50/50 ring-4 ring-indigo-500/10 shadow-md"
                                            : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-lg hover:shadow-slate-100"
                                            }`}>
                                            <input type="radio" value="online" {...register("paymentMethod")} className="hidden" />
                                            <div className="flex gap-4 items-center">
                                                <div className={`p-3 rounded-xl ${selectedMethod === "online" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"}`}>
                                                    <CreditCard className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <p className={`font-bold ${selectedMethod === "online" ? "text-indigo-900" : "text-slate-700"}`}>Visa / Card</p>
                                                    <p className="text-xs text-slate-500">Secure transactions</p>
                                                </div>
                                            </div>
                                            {selectedMethod === "online" && (
                                                <div className="absolute top-3 right-3 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                                </div>
                                            )}
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: Summary */}
                    <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
                        <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl shadow-indigo-200">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                Order Summary
                                <span className="bg-indigo-500/20 text-indigo-300 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest">Review</span>
                            </h2>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-slate-400">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-white">{data?.totalCartPrice}$</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-400">
                                    <span>Shipping</span>
                                    <span className="text-emerald-400 font-medium">FREE</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-400">
                                    <span>Processing Fee</span>
                                    <span className="text-slate-300">0.00$</span>
                                </div>

                                <div className="h-px bg-slate-800 my-6"></div>

                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-slate-400 text-sm">Total to pay</p>
                                        <p className="text-3xl font-black mt-1">{data?.totalCartPrice}<span className="text-indigo-500 ml-1 text-xl">$</span></p>
                                    </div>
                                    <div className="text-right hidden sm:block">
                                        <p className="text-emerald-400 text-xs font-bold uppercase tracking-tighter">You Save 12$</p>
                                    </div>
                                </div>

                                <button
                                    onClick={handleSubmit(onSubmit)}
                                    disabled={!isValid}
                                    className={`w-full mt-8 py-5 rounded-2xl font-black text-lg transition-all transform active:scale-[0.98] ${isValid
                                        ? "bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 shadow-xl shadow-indigo-500/25"
                                        : "bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700"
                                        }`}
                                >
                                    {selectedMethod === "online" ? "Payment Now" : "Place Order Now"}
                                </button>

                                <p className="text-center text-[10px] text-slate-500 mt-4 uppercase tracking-[0.2em]"> Guaranteed safe checkout </p>
                            </div>
                        </div>

                        {/* Safe Badges */}
                        <div className="bg-white rounded-2xl p-4 border border-slate-100 flex justify-around items-center">
                            <div className="flex flex-col items-center gap-1 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                                <span className="text-[10px] font-bold">Secure</span>
                            </div>
                            <div className="flex flex-col items-center gap-1 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                                <Truck className="w-5 h-5 text-indigo-600" />
                                <span className="text-[10px] font-bold">Express</span>
                            </div>
                            <div className="flex flex-col items-center gap-1 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                                <ShoppingBag className="w-5 h-5 text-indigo-600" />
                                <span className="text-[10px] font-bold">Original</span>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
