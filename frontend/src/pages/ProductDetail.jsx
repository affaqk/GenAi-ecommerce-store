import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const getProductDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/product/product-detail/${id}`);
      setProduct(response.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-500 text-sm">Loading product...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const inStock = product.stocks > 0;
  const lowStock = product.stocks <= 5 && product.stocks > 0;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-20 lg:pt-24">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <nav className="flex items-center gap-2 text-sm text-slate-400">
            <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            <span className="capitalize">{product.category}</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            <span className="text-slate-700 font-medium truncate">{product.title}</span>
          </nav>
        </div>

        {/* Product Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start">

            {/* ── Image Panel ── */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 aspect-square shadow-xl shadow-slate-200">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-24 h-24 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                  </div>
                )}

                {/* Category badge */}
                <span className="absolute top-5 left-5 text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-sm text-white capitalize tracking-wide">
                  {product.category}
                </span>

                {/* Wishlist */}
                <button className="absolute top-5 right-5 w-10 h-10 bg-white/80 backdrop-blur-sm hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-colors group">
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-rose-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                </button>
              </div>

              {/* Ambient glow */}
              <div className="absolute -inset-4 -z-10 bg-amber-400/10 rounded-3xl blur-2xl" />
            </div>

            {/* ── Info Panel ── */}
            <div className="lg:py-4 flex flex-col gap-6">

              {/* Title & rating row */}
              <div>
                <p className="text-amber-500 text-xs font-semibold uppercase tracking-widest mb-2 capitalize">{product.category}</p>
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-3">
                  {product.title}
                </h1>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} className={`w-4 h-4 ${s <= 4 ? 'text-amber-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-slate-500">4.0 <span className="text-slate-300 mx-1">·</span> 128 reviews</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-slate-900">Rs. {product.price.toLocaleString()}</span>
                <span className="text-sm text-slate-400 line-through">Rs. {(product.price * 1.2).toLocaleString()}</span>
                <span className="text-xs font-bold px-2 py-1 bg-amber-100 text-amber-700 rounded-full">20% OFF</span>
              </div>

              {/* Stock indicator */}
              <div className="flex items-center gap-2">
                {inStock ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-sm font-medium text-emerald-600">In Stock</span>
                    {lowStock && (
                      <span className="text-sm text-slate-400">— only <span className="font-semibold text-rose-500">{product.stocks} left</span></span>
                    )}
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 rounded-full bg-slate-300" />
                    <span className="text-sm font-medium text-slate-400">Out of Stock</span>
                  </>
                )}
              </div>

              {/* Divider */}
              <hr className="border-slate-100" />

              {/* Description */}
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Description</h3>
                <p className="text-slate-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Quantity + Add to Cart */}
              {inStock && (
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Quantity */}
                  <div className="flex items-center gap-0 border border-slate-200 rounded-full overflow-hidden w-fit">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="w-11 h-11 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 12h-15" />
                      </svg>
                    </button>
                    <span className="w-10 text-center text-sm font-semibold text-slate-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => Math.min(product.stocks, q + 1))}
                      className="w-11 h-11 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 flex items-center justify-center gap-2 font-semibold px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg ${
                      added
                        ? 'bg-emerald-500 shadow-emerald-500/25 text-white'
                        : 'bg-slate-900 hover:bg-amber-500 shadow-slate-900/20 hover:shadow-amber-500/25 text-white'
                    }`}
                  >
                    {added ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Perks */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { icon: '🚚', label: 'Free Shipping', sub: 'On orders over Rs. 3,000' },
                  { icon: '↩️', label: 'Easy Returns', sub: '30-day return policy' },
                  { icon: '🔒', label: 'Secure Payment', sub: 'SSL encrypted checkout' },
                  { icon: '✨', label: 'Authentic', sub: '100% genuine product' },
                ].map(({ icon, label, sub }) => (
                  <div key={label} className="flex items-start gap-2.5 bg-slate-50 rounded-2xl p-3.5">
                    <span className="text-xl leading-none mt-0.5">{icon}</span>
                    <div>
                      <p className="text-xs font-semibold text-slate-700">{label}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Meta */}
              <div className="border-t border-slate-100 pt-4 flex flex-col gap-1.5 text-xs text-slate-400">
                <span><span className="text-slate-500 font-medium">SKU:</span> {product._id.slice(-10).toUpperCase()}</span>
                <span><span className="text-slate-500 font-medium">Category:</span> <span className="capitalize">{product.category}</span></span>
                <span><span className="text-slate-500 font-medium">Added:</span> {new Date(product.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
