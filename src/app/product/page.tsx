"use client"

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getAllProducts } from "../_services/products.services";
import ProductCart from "../_components/productCard/productCard";
import { Sparkles, SlidersHorizontal, Search, Percent, X, Frown, Cpu } from "lucide-react";
import { ProductType } from "../_types/product.type"

export default function ProductsPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get("search") || "";

    const [allProducts, setAllProducts] = useState<ProductType[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(query);
    const [showOffers, setShowOffers] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const data = await getAllProducts();
            if (data) {
                setAllProducts(data);
                setFilteredProducts(data);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    useEffect(() => {
        let result = allProducts;

        if (searchQuery) {
            result = result.filter(p =>
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.brand.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (showOffers) {
            result = result.filter(p => p.priceAfterDiscount && p.priceAfterDiscount < p.price);
        }

        setFilteredProducts(result);
    }, [searchQuery, showOffers, allProducts]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfcfd] dark:bg-slate-950">
                <div className="relative">
                    <div className="w-24 h-24 border-[2px] border-violet-100 dark:border-violet-900/30 border-t-violet-600 rounded-full animate-spin"></div>
                    <Cpu className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-violet-600 animate-pulse" />
                </div>
                <h2 className="mt-8 text-2xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">Syncing <span className="text-violet-600">Manifest</span></h2>
                <p className="text-slate-400 dark:text-slate-600 font-bold uppercase tracking-[0.4em] mt-2 text-[9px] animate-pulse">Scanning Global Inventory...</p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#fcfcfd] dark:bg-slate-950 pb-60 pt-40 px-6 sm:px-10 transition-colors duration-500">
            <div className="max-w-[1700px] mx-auto">

                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-32 border-b border-slate-100 dark:border-slate-800 pb-20">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 rounded-2xl border border-violet-100 dark:border-violet-800 shadow-sm">
                            <Sparkles className="w-5 h-5" />
                            <span className="text-[11px] font-black uppercase tracking-[0.3em]">Master Inventory</span>
                        </div>
                        <h1 className="text-7xl sm:text-[120px] font-black text-slate-900 dark:text-white tracking-tighter leading-[0.85] italic uppercase">
                            The Complete <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-violet-600 to-violet-900 dark:from-violet-400 dark:to-violet-700">Catalogue</span>
                        </h1>
                    </div>

                    <div className="flex flex-col gap-10 lg:w-1/2 xl:w-2/5">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                            {/* Offers Toggle */}
                            <button
                                onClick={() => setShowOffers(!showOffers)}
                                className={`h-16 px-8 rounded-[20px] font-black text-xs uppercase tracking-[0.2em] italic flex items-center justify-center gap-4 transition-all active:scale-95 border-2 ${showOffers
                                    ? "bg-violet-600 text-white border-violet-600 shadow-2xl shadow-violet-500/30"
                                    : "bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-600 border-slate-100 dark:border-slate-800 hover:border-violet-200"
                                    }`}
                            >
                                <Percent className={`w-4 h-4 ${showOffers ? "animate-pulse" : ""}`} />
                                Offers Archive
                            </button>

                            {/* Search Input Container */}
                            <div className="relative flex-1 group">
                                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                                    <Search className={`w-5 h-5 transition-colors ${searchQuery ? "text-violet-600" : "text-slate-300 dark:text-slate-700"}`} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search Fragments..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full h-16 pl-16 pr-14 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[28px] text-sm font-black text-slate-900 dark:text-white outline-none focus:border-violet-600 dark:focus:border-violet-500 transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700 shadow-sm"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="absolute inset-y-0 right-4 flex items-center px-2 text-slate-300 hover:text-rose-500 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>

                            <div className="h-16 w-16 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl hidden sm:flex items-center justify-center text-slate-400 hover:text-violet-600 transition-all cursor-pointer shadow-sm shrink-0">
                                <SlidersHorizontal className="w-5 h-5" />
                            </div>
                        </div>

                        <p className="max-w-xs lg:max-w-none text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.2em] text-[9px] leading-relaxed italic lg:text-right">
                            Displaying {filteredProducts.length} unique tactical artifacts. {showOffers ? "Priority Filtering: OFFERS SELECTED." : "Full Database Access."}
                        </p>
                    </div>
                </div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-32">
                        {filteredProducts.map(item => (
                            <ProductCart key={item.id} item={item} />
                        ))}
                    </div>
                ) : (
                    <div className="py-40 flex flex-col items-center justify-center text-center space-y-10">
                        <div className="w-32 h-32 bg-slate-50 dark:bg-slate-900/50 rounded-[48px] flex items-center justify-center text-slate-200 dark:text-slate-800">
                            <Frown className="w-16 h-16" />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">No Matching Fragments</h3>
                            <p className="text-slate-400 dark:text-slate-600 font-bold uppercase tracking-widest text-xs">Re-calibrate your search parameters or reset filters.</p>
                        </div>
                        <button
                            onClick={() => { setSearchQuery(""); setShowOffers(false); }}
                            className="px-10 py-5 bg-violet-600 text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-slate-900 transition-all shadow-xl shadow-violet-500/20"
                        >
                            Reset Manifest
                        </button>
                    </div>
                )}

                {/* Pagination Placeholder / Footer CTA */}
                <div className="mt-60 flex flex-col items-center space-y-12">
                    <div className="w-px h-24 bg-gradient-to-b from-violet-600 to-transparent"></div>
                    <p className="text-[11px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.5em]">End of Archive</p>
                </div>
            </div>
        </main>
    );
}
