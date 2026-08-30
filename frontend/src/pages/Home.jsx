import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { CATEGORIES, PERKS } from '../Data'
import axios from 'axios'
import ProductCard from '../components/ProductCard'

const Home = () => {
    const [products, setProducts] = useState([]);

    const getAllProducts = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/product/get-all-products");
            // console.log(response.data.products)
            setProducts(response.data.products)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getAllProducts()
    },[])

    console.log(products)
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-16 lg:pt-20 overflow-hidden">
        <div className="min-h-[88vh] bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-150 h-150 bg-amber-500/10 rounded-full translate-x-1/3 -translate-y-1/4 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-100 h-100 bg-amber-500/5 rounded-full -translate-x-1/3 translate-y-1/4 blur-2xl" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-amber-400 text-sm font-medium tracking-widest uppercase mb-6">
                <span className="w-8 h-px bg-amber-400" />
                New Season 2026
              </span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6">
                Elevate Your
                <span className="block text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-amber-300">
                  Everyday Style
                </span>
              </h1>
              <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-lg">
                Discover curated collections crafted for those who appreciate the finer things. Luxury made accessible.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold px-8 py-3.5 rounded-full transition-colors duration-200 shadow-lg shadow-amber-500/25"
                >
                  Shop Now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link
                  to="/collections"
                  className="inline-flex items-center gap-2 border border-slate-600 hover:border-amber-400 text-white font-medium px-8 py-3.5 rounded-full transition-colors duration-200"
                >
                  View Collections
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-10 mt-14 pt-10 border-t border-slate-700/60">
                {[['10K+', 'Happy Customers'], ['500+', 'Products'], ['4.9★', 'Average Rating']].map(([num, label]) => (
                  <div key={label}>
                    <p className="text-2xl font-bold text-white">{num}</p>
                    <p className="text-slate-400 text-sm mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Perks Bar ── */}
      <section className="bg-amber-50 border-y border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {PERKS.map(({ title, desc, icon }) => (
              <div key={title} className="flex items-center gap-3">
                <div className="w-11 h-11 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                  {icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-amber-500 text-sm font-medium uppercase tracking-widest mb-2">Browse</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Shop by Category</h2>
          </div>
          <a href="#" className="hidden sm:flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-amber-500 transition-colors">
            All categories
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {CATEGORIES.map(({ title, subtitle, gradient, icon }) => (
            <a
              key={title}
              href="#"
              className={`group relative rounded-2xl bg-linear-to-br ${gradient} p-6 lg:p-8 overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200`}
            >
              <div className="mb-4">{icon}</div>
              <h3 className="text-slate-800 font-semibold text-base lg:text-lg">{title}</h3>
              <p className="text-slate-500 text-sm mt-1">{subtitle}</p>
              <div className="absolute bottom-4 right-4 w-8 h-8 bg-white/60 group-hover:bg-white rounded-full flex items-center justify-center transition-colors">
                <svg className="w-3.5 h-3.5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-amber-500 text-sm font-medium uppercase tracking-widest mb-2">Handpicked</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Featured Products</h2>
            </div>
            <a href="#" className="hidden sm:flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-amber-500 transition-colors">
              View all
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {products.map((product) => (
              <ProductCard product = {product}/>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative overflow-hidden bg-linear-to-r from-slate-900 to-slate-800">
        <div className="absolute inset-0 bg-amber-500/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-amber-400 text-sm font-medium uppercase tracking-widest mb-4">Limited Time</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Up to 40% Off — End of Season Sale
          </h2>
          <p className="text-slate-300 mb-8 max-w-md mx-auto">
            Premium pieces at unbeatable prices. Don't miss out — limited stock available.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold px-8 py-3.5 rounded-full transition-colors shadow-lg shadow-amber-500/20"
          >
            Shop the Sale
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
