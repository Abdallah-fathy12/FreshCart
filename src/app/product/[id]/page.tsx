import { getProduct } from '@/app/_services/products.services';
import { notFound } from 'next/navigation';
import { Star, ShieldCheck, Truck, RefreshCcw, Share2, ChevronRight } from 'lucide-react';
import WishlistBtn from '@/app/_components/productCard/WishlistBtn';
import AddToCartBtn from '@/app/_components/productCard/AddToCartBtn';
import ProductImageGallery from '@/app/_components/productCard/ProductImageGallery';
import Link from 'next/link';

interface ProductDetailsProps {
    params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: ProductDetailsProps) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        notFound();
    }

    const images = [product.imageCover, ...(product.images || [])];

    return (
        <main className="min-h-screen bg-[#fcfcfd] dark:bg-slate-950 pb-32 sm:pb-60 transition-colors duration-500 overflow-x-hidden">
            {/* Dynamic Breadcrumb or Path */}
            <div className="pt-24 sm:pt-32 px-6 sm:px-8 max-w-[1400px] mx-auto">
                <nav className="flex flex-wrap items-center gap-2 mb-6 sm:mb-10 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-slate-400 dark:text-slate-600">
                    <Link href="/" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Archive</Link>
                    <ChevronRight className="w-2.5 h-2.5 opacity-30" />
                    <Link href="/product" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">Products</Link>
                    <ChevronRight className="w-2.5 h-2.5 opacity-30" />
                    <span className="text-violet-600 dark:text-violet-500 px-2 py-0.5 bg-violet-50 dark:bg-violet-950/30 rounded-lg truncate max-w-[120px]">{product.category.name}</span>
                </nav>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 sm:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">

                    {/* Left Side: Visual Terminal */}
                    <div className="lg:col-span-5">
                        <ProductImageGallery images={images} title={product.title} />
                    </div>

                    {/* Right Side: Architecture of Detail */}
                    <div className="lg:col-span-7 flex flex-col space-y-6 sm:space-y-8">
                        <div className="space-y-4 sm:space-y-6">
                            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-8">
                                <div className="space-y-2 sm:space-y-3">
                                    <span className="inline-block text-[8px] sm:text-[10px] font-black text-violet-600 dark:text-violet-400 uppercase tracking-[0.3em] border-b border-violet-100 dark:border-violet-900/50 pb-1">{product.brand.name}</span>
                                    <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.95] italic uppercase break-words">
                                        {product.title}
                                    </h1>
                                </div>
                                <div className="flex sm:flex-col gap-2.5 w-full sm:w-auto">
                                    <div className="flex-1 sm:flex-none">
                                        <WishlistBtn productId={product.id} />
                                    </div>
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl sm:rounded-2xl flex items-center justify-center text-slate-400 hover:text-violet-600 transition-all cursor-pointer shadow-sm">
                                        <Share2 className="w-4 h-4 sm:w-5 h-5" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                                <div className="flex items-center gap-2.5 sm:gap-3 bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-800 px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl shadow-sm">
                                    <div className="flex items-center gap-1.5 text-yellow-500">
                                        <Star size={14} fill="currentColor" />
                                        <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tighter">{product.ratingsAverage}</span>
                                    </div>
                                    <div className="w-px h-4 bg-slate-100 dark:bg-slate-800" />
                                    <span className="text-[8px] sm:text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest leading-none">{product.ratingsQuantity || 128} Interactions</span>
                                </div>

                                <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl sm:rounded-2xl border border-emerald-100 dark:border-emerald-500/20">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                                    <span className="text-[8px] sm:text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.2em]">Status: Optimal</span>
                                </div>
                            </div>
                        </div>

                        {/* Pricing & Acquisition Deck */}
                        <div className="p-6 sm:p-8 lg:p-10 bg-white dark:bg-slate-900/40 rounded-[32px] sm:rounded-[48px] border border-slate-100 dark:border-slate-800 shadow-[0_40px_100px_-20px_rgba(124,58,237,0.08)] relative overflow-hidden group backdrop-blur-3xl">
                            {/* Geometric Detail */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-violet-600/5 dark:bg-violet-600/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-all duration-1000"></div>

                            <div className="relative z-10 space-y-6 sm:space-y-8">
                                <div className="flex flex-col sm:flex-row items-start sm:items-baseline gap-3 sm:gap-6">
                                    <div className="space-y-1">
                                        <p className="text-[7.5px] sm:text-[8px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.4em] mb-1">Acquisition Cost</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tighter italic leading-none">
                                                ${product.priceAfterDiscount || product.price}
                                            </span>
                                            <span className="text-lg sm:text-xl font-black text-violet-600 dark:text-violet-400 leading-none">USD</span>
                                        </div>
                                    </div>
                                    {product.priceAfterDiscount && (
                                        <div className="flex flex-row sm:flex-col items-center sm:items-start gap-2.5">
                                            <span className="text-lg sm:text-xl font-black text-slate-200 dark:text-slate-800 line-through tracking-tighter leading-none">${product.price}</span>
                                            <span className="text-[7.5px] sm:text-[8px] font-black text-rose-500 uppercase tracking-[0.15em] bg-rose-50 dark:bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-100 dark:border-rose-500/20">-{Math.round((1 - product.priceAfterDiscount / product.price) * 100)}% Protocol</span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <p className="text-[7.5px] sm:text-[8px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.4em]">Artifact Manifest</p>
                                    <p className="text-base sm:text-lg lg:text-xl font-medium text-slate-500 dark:text-slate-400 leading-relaxed italic border-l-4 sm:border-l-8 border-violet-100 dark:border-violet-900 pl-4 sm:pl-6 max-w-2xl tracking-tight">
                                        "{product.description}"
                                    </p>
                                </div>

                                <div className="pt-2">
                                    <AddToCartBtn productId={product.id} />
                                </div>
                            </div>
                        </div>

                        {/* Trust & Service Ecosystem */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                            {[
                                { icon: Truck, title: "Logistics", sub: "Global Priority" },
                                { icon: ShieldCheck, title: "Auth", sub: "Binary Verified" },
                                { icon: RefreshCcw, title: "Circular", sub: "30-Day Transition" }
                            ].map((spec, i) => (
                                <div key={i} className="flex flex-col items-center text-center p-6 sm:p-8 bg-slate-50/50 dark:bg-slate-900/40 rounded-[32px] sm:rounded-[40px] transition-all hover:bg-white dark:hover:bg-slate-900 hover:shadow-xl group border border-transparent hover:border-violet-100 dark:hover:border-violet-900/30">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-slate-950 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-sm group-hover:bg-violet-600 group-hover:text-white group-hover:rotate-[15deg] transition-all duration-500 border border-slate-100 dark:border-slate-800">
                                        <spec.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                    <h4 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white mb-1.5">{spec.title}</h4>
                                    <p className="text-[7.5px] sm:text-[8px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600 max-w-[100px]">{spec.sub}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
