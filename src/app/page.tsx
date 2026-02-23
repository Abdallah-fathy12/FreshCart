import MySlider from './_components/MySlider/MySlider'
import CategoriesSlider from "./_components/categoriesSlider/CategoriesSlider"
import { getAllProducts } from './_services/products.services'
import ProductCart from './_components/productCard/productCard'
import imageSlider1 from "@/images/slider-image-1.jpeg"
import imageSlider2 from "@/images/slider-image-2.jpeg"
import imageSlider3 from "@/images/slider-image-3.jpeg"
import { Sparkles, ArrowRight } from 'lucide-react'
import React, { Suspense } from 'react'


export default async function Home() {
  const allProducts = await getAllProducts()

  // Use stable strings for image sources to prevent hydration flickering
  const imageList = [imageSlider1.src, imageSlider2.src, imageSlider3.src]

  if (allProducts == null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfcfd] dark:bg-slate-950">
        <h1 className='text-slate-900 dark:text-white font-black text-3xl tracking-tighter italic'>Connection Error</h1>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#fcfcfd] dark:bg-slate-950 pb-32 sm:pb-60 transition-colors duration-500 overflow-x-hidden">

      {/* Dynamic Hero Stage */}
      <section className="relative pt-24 sm:pt-40">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-10">
          <div className="relative rounded-[32px] sm:rounded-[56px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-white/50 dark:border-white/5 ring-1 ring-slate-100 dark:ring-slate-800">
            <MySlider imageList={imageList} />
          </div>
        </div>
      </section>

      {/* Categories Discovery Lounge */}
      <section className="mt-24 sm:mt-40 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 sm:mb-20">
          <div className="space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-3 px-4 sm:px-6 py-1.5 sm:py-2 bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 rounded-2xl border border-violet-100 dark:border-violet-800 shadow-sm">
              <Sparkles className="w-4 h-4 sm:w-5 h-5" />
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em]">Couture Selections</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none italic uppercase">
              Shop by <span className="text-violet-600 dark:text-violet-500">Soul</span>
            </h2>
          </div>
          <p className="max-w-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-[10px] sm:text-[11px] leading-relaxed italic md:text-right">
            "Every category is a destination. Discover the universe that speaks to your identity."
          </p>
        </div>

        <div className="relative">
          <Suspense fallback={
            <div className="w-full h-64 sm:h-96 bg-slate-50 dark:bg-slate-900/50 rounded-[32px] sm:rounded-[48px] animate-pulse border border-slate-100 dark:border-slate-800 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 sm:w-12 h-12 border-2 border-violet-100 dark:border-violet-900 border-t-violet-600 rounded-full animate-spin"></div>
                <span className="text-[8px] sm:text-[9px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-widest">Fine-Tuning Aesthetics</span>
              </div>
            </div>
          }>
            <CategoriesSlider />
          </Suspense>
        </div>
      </section>

      {/* The Gallery of Curated Items */}
      <section className="mt-32 sm:mt-60 max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center text-center space-y-6 sm:space-y-10 mb-20 sm:mb-32">
          <div className="w-16 sm:w-24 h-2 sm:h-2.5 bg-violet-600 rounded-full shadow-lg shadow-violet-200 dark:shadow-none"></div>
          <h2 className="text-5xl sm:text-7xl lg:text-[120px] font-black text-slate-900 dark:text-white tracking-tighter leading-[0.85] italic uppercase">
            Elite <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-violet-600 to-violet-900 dark:from-violet-400 dark:to-violet-700">Archive</span>
          </h2>
          <p className="text-slate-400 dark:text-slate-500 font-bold text-lg sm:text-2xl max-w-2xl leading-relaxed">
            Meticulously curated gear for the <span className="text-slate-900 dark:text-white">Modern Visionary</span>. Luxury redefined for everyday precision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 sm:gap-x-12 gap-y-16 sm:gap-y-28">
          {allProducts.map(item => (
            <ProductCart key={item.id} item={item} />
          ))}
        </div>

        {/* Global CTA */}
        <div className="mt-24 sm:mt-48 flex justify-center">
          <button className="group flex flex-col sm:flex-row items-center gap-4 sm:gap-6 px-10 sm:px-16 py-6 sm:py-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[24px] sm:rounded-[32px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm hover:bg-violet-600 dark:hover:bg-violet-500 hover:shadow-2xl transition-all active:scale-95">
            Explore Every Detail
            <ArrowRight className="w-5 h-5 sm:w-6 h-6 transition-transform sm:group-hover:translate-x-2" />
          </button>
        </div>
      </section>

    </main>
  );
}
