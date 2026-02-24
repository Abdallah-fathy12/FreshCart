"use client"

import { cartContext } from "@/providers/cartContextProvider";
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag, CreditCard, ShieldCheck, Truck, ArrowRight, Star, Clock, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState, useEffect } from "react";
import { UpdateCart } from "../_actions/updateCartTitle";
import { RemoveFromCart, ClearCart } from "../_actions/cartActions";
import { toast } from "sonner";

export default function CartPage() {
  const data: any = useContext(cartContext);
  const [updatingItems, setUpdatingItems] = useState<string[]>([]);

  // 🚀 Force refresh data when the page mounts to ensure synchronization
  useEffect(() => {
    if (data?.refreshCart) {
      data.refreshCart();
    }
  }, []);

  async function handleRemove(id: string) {
    toast.promise(RemoveFromCart(id), {
      loading: "Removing item...",
      success: (res) => {
        data.setProducts(res.data.products);
        data.setNumOfCartItems(res.numOfCartItems);
        data.setTotalCartPrice(res.data.totalCartPrice);
        return "Item removed from bag";
      },
      error: "Failed to remove item",
      position: "top-center"
    });
  }

  async function handleClearCart() {
    toast.promise(ClearCart(), {
      loading: "Emptying your bag...",
      success: (res) => {
        data.setProducts([]);
        data.setNumOfCartItems(0);
        data.setTotalCartPrice(0);
        return "Your bag is now empty";
      },
      error: "Failed to clear cart",
      position: "top-center"
    });
  }

  async function handleUpdateQuantity(id: string, newCount: number, currentCount: number) {
    if (newCount < 1) return;

    setUpdatingItems(prev => [...prev, id]);

    const isIncreasing = newCount > currentCount;

    toast.promise(UpdateCart(id, newCount), {
      loading: isIncreasing ? "Increasing quantity..." : "Decreasing quantity...",
      success: (res) => {
        if (res.status === "success") {
          data.setProducts(res.data.products);
          data.setNumOfCartItems(res.numOfCartItems);
          data.setTotalCartPrice(res.data.totalCartPrice);
          setUpdatingItems(prev => prev.filter(itemId => itemId !== id));
          return `Quantity updated to ${newCount}`;
        }
        setUpdatingItems(prev => prev.filter(itemId => itemId !== id));
        throw new Error(res.message || "Failed to update quantity");
      },
      error: (err) => {
        setUpdatingItems(prev => prev.filter(itemId => itemId !== id));
        return err.message || "Network error. Try again.";
      },
      position: "top-center"
    });
  }

  // Full Page Loading State
  if (data.products === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfcfd] dark:bg-slate-950">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 border-[8px] border-emerald-50 dark:border-emerald-950/30 border-t-emerald-500 rounded-full animate-spin"></div>
            <ShoppingBag className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-emerald-500" />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Syncing Your Bag</h2>
            <p className="text-slate-400 dark:text-slate-600 font-bold animate-pulse text-lg uppercase tracking-widest">Just a moment...</p>
          </div>
        </div>
      </div>
    );
  }

  // Empty Bag State
  if (data.products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfcfd] dark:bg-slate-950 px-6">
        <div className="max-w-xl w-full text-center">
          <div className="mb-16 relative inline-block">
            <div className="w-48 h-48 bg-emerald-50 dark:bg-emerald-500/10 rounded-[64px] flex items-center justify-center mx-auto rotate-12 transition-transform hover:rotate-0 duration-700 shadow-3xl shadow-emerald-100/50 dark:shadow-none">
              <ShoppingBag className="w-24 h-24 text-emerald-500 -rotate-12" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-white dark:bg-slate-800 rounded-full shadow-2xl flex items-center justify-center animate-bounce">
              <Star className="w-10 h-10 text-yellow-400 fill-yellow-400" />
            </div>
          </div>

          <h2 className="text-6xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter italic whitespace-nowrap uppercase">Your Bag Is Empty</h2>
          <p className="text-slate-500 dark:text-slate-400 text-2xl mb-14 font-medium leading-relaxed max-w-lg mx-auto">
            Looks like you haven&apos;t added any items to your bag yet.
            Let&apos;s find something amazing for you!
          </p>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-5 px-14 py-7 rounded-[32px] bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-2xl hover:bg-slate-800 dark:hover:bg-slate-200 transition-all hover:scale-[1.05] active:scale-[0.95] shadow-2xl shadow-slate-200 dark:shadow-none group"
          >
            Start Shopping
            <ArrowRight className="w-8 h-8 transition-transform group-hover:translate-x-3" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfd] dark:bg-slate-950 pb-40 pt-20 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Ultra-Modern Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20 px-2 lg:px-4 border-b border-slate-100 dark:border-slate-800 pb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="p-5 bg-slate-900 dark:bg-slate-800 rounded-[30px] text-white shadow-2xl shadow-slate-200 dark:shadow-none relative overflow-hidden group">
                <ShoppingBag className="w-10 h-10 relative z-10" />
                <div className="absolute inset-0 bg-emerald-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </div>
              <h1 className="text-7xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase underline decoration-emerald-500 decoration-8 underline-offset-8">My Bag</h1>
            </div>
            <p className="text-slate-400 dark:text-slate-500 font-bold text-xl ml-2 italic">
              You have <span className="text-emerald-600 font-black underline decoration-emerald-200 dark:decoration-emerald-900/50 decoration-4 underline-offset-8">{data.numOfCartItems} premium items</span> in your cart
            </p>
          </div>

          <button
            onClick={handleClearCart}
            className="group flex items-center gap-3 px-8 py-5 rounded-[24px] text-slate-400 dark:text-slate-600 font-black text-sm uppercase tracking-widest hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all border border-slate-100 dark:border-slate-800 hover:border-red-100 active:scale-95"
          >
            <Trash2 className="w-5 h-5 transition-transform group-hover:rotate-12" />
            Clear My Bag
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-10">
            {data.products.map((item: any, index: number) => (
              <div
                key={item?._id || index}
                className={`group relative bg-white dark:bg-slate-900 p-8 rounded-[56px] shadow-3xl shadow-slate-200/40 dark:shadow-none border border-slate-50 dark:border-slate-800 flex flex-col sm:flex-row items-stretch gap-10 transition-all duration-700 hover:shadow-emerald-100/40 dark:hover:border-emerald-500/30 ${updatingItems.includes(item.product?._id) ? 'opacity-60 grayscale-[0.5] pointer-events-none' : ''}`}
              >
                {/* Immersive Product Image */}
                <div className="relative w-full sm:w-64 aspect-square rounded-[36px] overflow-hidden bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 shrink-0 shadow-inner group">
                  {item.product?.imageCover ? (
                    <Image
                      src={item.product.imageCover}
                      alt={item.product?.title || "Product"}
                      fill
                      className="object-contain p-8 transition-transform duration-1000 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                      <ShoppingBag className="w-12 h-12 text-slate-300 dark:text-slate-700" />
                    </div>
                  )}
                  {updatingItems.includes(item.product._id) && (
                    <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-[2px] flex items-center justify-center z-20">
                      <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  {/* Action Label */}
                  <div className="absolute top-4 left-4">
                    <div className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-lg shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-2">
                      <Zap className="w-3 h-3 text-emerald-500 fill-emerald-500" />
                      <span className="text-[10px] font-black text-slate-800 dark:text-white uppercase tracking-widest">In Stock</span>
                    </div>
                  </div>
                </div>

                {/* Dynamic Product Content */}
                <div className="flex-1 flex flex-col justify-between py-2">
                  <div className="space-y-6">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-black text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 rounded-lg uppercase tracking-[0.2em]">{item.product?.category?.name || "Category"}</span>
                          <span className="text-[10px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-widest">{item.product?.brand?.name || "Brand"}</span>
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-500 line-clamp-2 italic uppercase">{item.product?.title || "Product Name"}</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-4xl font-black text-slate-900 dark:text-white font-mono italic tracking-tighter">${item.price}</p>
                        <div className="flex items-center gap-1 text-emerald-500 justify-end mt-1">
                          <Clock className="w-3 h-3" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Ready to ship</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-yellow-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={`w-3.5 h-3.5 ${s <= (item.product?.ratingsAverage || 5) ? 'fill-current' : 'text-slate-200 dark:text-slate-800'}`} />
                      ))}
                      <span className="text-xs font-black text-slate-400 dark:text-slate-600 ml-2 italic">{item.product?.ratingsAverage || 5.0} Review Score</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-8 pt-8 border-t border-dashed border-slate-100 dark:border-slate-800">
                    {/* Boutique Style Quantity Selection */}
                    <div className="flex items-center gap-1.5 p-1.5 bg-slate-50 dark:bg-slate-800 rounded-[28px] border border-slate-100 dark:border-slate-700 shadow-inner">
                      <button
                        onClick={() => handleUpdateQuantity(item.product._id, item.count - 1, item.count)}
                        className="w-12 h-12 flex items-center justify-center rounded-[22px] bg-white dark:bg-slate-700 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:shadow-xl transition-all active:scale-90 border border-slate-50 dark:border-slate-600 group/btn"
                      >
                        <Minus className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
                      </button>
                      <span className="w-14 text-center text-3xl font-black text-slate-800 dark:text-white font-mono tracking-tighter">{item.count}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.product._id, item.count + 1, item.count)}
                        className="w-12 h-12 flex items-center justify-center rounded-[22px] bg-white dark:bg-slate-700 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:shadow-xl transition-all active:scale-90 border border-slate-50 dark:border-slate-600 group/btn"
                      >
                        <Plus className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
                      </button>
                    </div>

                    {/* Visual Trash Action */}
                    <button
                      onClick={() => handleRemove(item.product._id)}
                      className="group/del flex items-center gap-4 text-slate-300 dark:text-slate-700 hover:text-red-500 transition-all duration-500"
                    >
                      <span className="text-[11px] font-black uppercase tracking-[0.2em] opacity-0 group-hover/del:opacity-100 transition-all -translate-x-4 group-hover/del:translate-x-0">Discard Item</span>
                      <div className="w-14 h-14 flex items-center justify-center rounded-3xl bg-slate-50 dark:bg-slate-800 group-hover/del:bg-red-50 dark:group-hover:bg-red-500/10 border border-slate-50 dark:border-slate-800 group-hover/del:border-red-100 dark:group-hover:border-red-500/20 transition-all shadow-sm">
                        <Trash2 className="w-6 h-6 transition-transform group-hover/del:rotate-12" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation Shortcut */}
            <div className="pt-10 flex justify-center sm:justify-start">
              <Link href="/" className="group inline-flex items-center gap-5 text-slate-400 dark:text-slate-600 font-black text-sm uppercase tracking-widest hover:text-emerald-600 transition-all p-3">
                <div className="w-14 h-14 flex items-center justify-center rounded-[24px] bg-slate-100 dark:bg-slate-900 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 shadow-sm transition-all border border-transparent group-hover:border-emerald-100 dark:group-hover:border-emerald-500/20">
                  <ArrowLeft className="w-6 h-6 transition-transform group-hover:-translate-x-2" />
                </div>
                Explore Store
              </Link>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <div className="bg-slate-900 dark:bg-slate-900/50 p-12 rounded-[64px] shadow-[0_40px_100px_rgba(15,23,42,0.3)] text-white space-y-14 relative overflow-hidden group border border-white/5 backdrop-blur-3xl">
              {/* Decorative Flare */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-[100px] rounded-full -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-150"></div>

              <div className="space-y-4 relative">
                <h2 className="text-5xl font-black tracking-tighter italic uppercase underline decoration-emerald-500 decoration-8 underline-offset-8">Total Bag</h2>
                <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] opacity-70">Summary Breakdown</p>
              </div>

              <div className="space-y-10 relative">
                <div className="flex justify-between items-center group/stat border-b border-white/5 pb-4">
                  <span className="text-slate-400 font-bold transition-colors group-hover/stat:text-white">Selected Items</span>
                  <span className="text-2xl font-black tracking-tighter">{data.numOfCartItems}</span>
                </div>
                <div className="flex justify-between items-center group/stat border-b border-white/5 pb-4">
                  <span className="text-slate-400 font-bold transition-colors group-hover/stat:text-white">Eco Delivery</span>
                  <span className="text-emerald-400 font-black uppercase text-[10px] tracking-[0.3em] bg-emerald-400/10 px-3 py-1.5 rounded-xl">Complimentary</span>
                </div>
                <div className="flex justify-between items-center group/stat">
                  <span className="text-slate-400 font-bold transition-colors group-hover/stat:text-white italic">Secure Shield</span>
                  <span className="text-emerald-400 font-black uppercase text-[10px] tracking-[0.3em] flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 fill-current" /> NODE ACTIVE
                  </span>
                </div>
              </div>

              <div className="pt-14 border-t border-white/10 relative">
                <div className="flex flex-col gap-5 mb-14">
                  <span className="text-slate-500 font-black uppercase tracking-[0.4em] text-[10px]">Total Investment</span>
                  <div className="flex items-end gap-3">
                    <span className="text-8xl font-black text-white font-mono leading-none tracking-tighter underline decoration-emerald-500 decoration-8 underline-offset-8">${data.totalCartPrice}</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <Link
                    href="/checkout"
                    className="w-full h-24 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 rounded-[32px] bg-emerald-500 text-slate-950 font-black text-xl uppercase tracking-[0.2em] italic hover:bg-emerald-400 transition-all shadow-[0_20px_50px_rgba(16,185,129,0.3)] group active:scale-[0.97] text-center"
                  >
                    <span className="block sm:inline">Proceed To Checkout</span>
                    <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-4 shrink-0" />
                  </Link>

                  <div className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col items-center gap-3 p-6 bg-white/5 rounded-[28px] border border-white/5 backdrop-blur-xl hover:bg-white/10 transition-colors">
                      <CreditCard className="w-6 h-6 text-slate-500" />
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Secure Pay</span>
                    </div>
                    <div className="flex flex-col items-center gap-3 p-6 bg-white/5 rounded-[28px] border border-white/5 backdrop-blur-xl hover:bg-white/10 transition-colors">
                      <Truck className="w-6 h-6 text-slate-500" />
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Priority Fast</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Designer Assurance */}
            <div className="mt-12 px-8 flex items-center justify-between text-slate-400 dark:text-slate-600">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-widest italic tracking-tight">Real-time sync active</span>
              </div>
              <span className="text-[10px] font-bold opacity-30 tracking-[0.3em]">FW-CART v2.0</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
