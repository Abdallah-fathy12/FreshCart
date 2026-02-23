import Link from "next/link";
import Image from "next/image";
import { getAllCategories } from "../_services/categories.services";
import { CategoryType } from "../_types/product.type";
import { Sparkles, ArrowRight } from "lucide-react";

export default async function CategoriesPage() {
    const categories: CategoryType[] | null = await getAllCategories();

    if (!categories) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fcfcfd] dark:bg-slate-950">
                <h1 className='text-slate-900 dark:text-white font-black text-3xl tracking-tighter italic'>Connection Error</h1>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#fcfcfd] dark:bg-slate-950 pb-60 pt-40 px-6 sm:px-10 transition-colors duration-500">
            <div className="max-w-[1700px] mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-32 border-b border-slate-100 dark:border-slate-800 pb-20">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 rounded-2xl border border-violet-100 dark:border-violet-800 shadow-sm">
                            <Sparkles className="w-5 h-5" />
                            <span className="text-[11px] font-black uppercase tracking-[0.3em]">Couture Selections</span>
                        </div>
                        <h1 className="text-7xl sm:text-[100px] font-black text-slate-900 dark:text-white tracking-tighter leading-[0.85] italic uppercase">
                            Global <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-violet-600 to-violet-900 dark:from-violet-400 dark:to-violet-700">Archives</span>
                        </h1>
                    </div>
                    <p className="max-w-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-[11px] leading-relaxed italic md:text-right">
                        "Navigate through carefully curated universes. Every category is a mission statement of style and precision."
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {categories.map((category, index) => (
                        <Link
                            key={category._id}
                            href={`/categories/${category._id}`}
                            className="group relative flex flex-col gap-8"
                        >
                            <div className="relative aspect-[3/4] rounded-[56px] overflow-hidden shadow-[0_40px_80px_-15px_rgba(124,58,237,0.12)] border border-white dark:border-slate-800 ring-1 ring-slate-100 dark:ring-transparent transition-all duration-700 group-hover:shadow-[0_60px_100px_-10px_rgba(124,58,237,0.25)] group-hover:-translate-y-4">
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-violet-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            </div>

                            <div className="px-6 flex items-center justify-between">
                                <div className="space-y-2 text-center md:text-left">
                                    <span className="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[.4em]">Collection 0{index + 1}</span>
                                    <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic group-hover:text-violet-600 transition-colors">
                                        {category.name}
                                    </h2>
                                </div>
                                <div className="hidden md:flex w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 items-center justify-center text-slate-300 dark:text-slate-600 group-hover:bg-violet-600 group-hover:text-white group-hover:border-violet-600 transition-all duration-500 transform group-hover:rotate-45">
                                    <ArrowRight className="w-6 h-6" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
