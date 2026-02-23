import Image from "next/image";
import { getSpecificCategory } from "../../_services/categories.services";
import { getProductsByCategoryId } from "../../_services/products.services";
import { ProductType } from "../../_types/product.type";
import ProductCart from "../../_components/productCard/productCard";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

interface CategoryDetailsPageProps {
    params: Promise<{ id: string }>;
}

export default async function CategoryDetailsPage({ params }: CategoryDetailsPageProps) {
    const { id } = await params;

    const [category, products] = await Promise.all([
        getSpecificCategory(id),
        getProductsByCategoryId(id)
    ]);

    if (!category) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fcfcfd]">
                <h1 className='text-slate-900 font-black text-3xl tracking-tighter italic'>Resource Not Found</h1>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#fcfcfd] pb-60">
            {/* Immersive Category Header */}
            <div className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
                <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover scale-110"
                    priority
                />
                <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]" />

                <div className="relative z-10 text-center space-y-12 px-6">
                    <Link
                        href="/categories"
                        className="inline-flex items-center gap-4 px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-[24px] backdrop-blur-xl border border-white/20 transition-all group"
                    >
                        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-2" />
                        <span className="text-[11px] font-black uppercase tracking-[0.3em]">Back to Archives</span>
                    </Link>

                    <div className="space-y-6">
                        <div className="flex justify-center">
                            <div className="inline-flex items-center gap-3 px-6 py-2 bg-violet-600 text-white rounded-2xl shadow-xl shadow-violet-500/20">
                                <Sparkles className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Curated Segment</span>
                            </div>
                        </div>
                        <h1 className="text-8xl sm:text-[160px] font-black text-white tracking-tighter leading-none italic uppercase">
                            {category.name}
                        </h1>
                    </div>

                    <div className="flex justify-center">
                        <div className="w-24 h-1 bg-violet-500 rounded-full animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Products Landscape */}
            <section className="mt-40 max-w-[1700px] mx-auto px-6 sm:px-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-32 border-b border-slate-100 pb-16">
                    <div className="space-y-4">
                        <h2 className="text-5xl font-black text-slate-900 tracking-tighter italic uppercase">
                            The <span className="text-violet-600">Manifesto</span>
                        </h2>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[11px]">
                            Showing {products?.length || 0} precision instruments for the category: {category.name}
                        </p>
                    </div>

                    <div className="h-16 w-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-2xl">
                        <span className="text-xl font-black">{products?.length || 0}</span>
                    </div>
                </div>

                {!products || products.length === 0 ? (
                    <div className="h-[400px] rounded-[56px] border-2 border-dashed border-slate-100 flex items-center justify-center bg-slate-50/50">
                        <p className="text-slate-300 font-bold uppercase tracking-widest text-xs italic">No items currently archived in this segment</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-32">
                        {products.map((item: ProductType) => (
                            <ProductCart key={item.id} item={item} />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
