import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const CATEGORIES = ['fragnance', 'furniture', 'electronics', 'bags', 'footwear', 'clothing']

const AddProduct = () => {
  const [form, setForm] = useState({
    title: '',
    price: '',
    category: '', 
    stocks: '', 
    description: '', 
    image : ''
  })

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        await axios.post("http://localhost:8000/api/v1/product/create-product", form, {
            withCredentials : true
        })
        toast.success("Product added successfully");

    } catch (error) {
        console.log(error)
        toast.error("something went wrong")
    }
  }

  return (
    <div className="space-y-6 max-w-3xl">

      <div>
        <h1 className="text-2xl font-bold text-slate-900">Add Product</h1>
        <p className="text-sm text-slate-500 mt-1">Fill in the details to list a new product in the store.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">

        {/* Image URL */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Image URL</label>
          <input
            type="url"
            value={form.image}
            name = "image"
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            required
            className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
          />
          {form.image && (
            <img src={form.image} alt="preview" className="mt-3 h-40 w-full object-contain rounded-xl border border-slate-200 bg-slate-50" />
          )}
        </div>

        {/* Name & price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Product Name</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Silk Blazer"
              required
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Price ($)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              required
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Category & stock */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
            >
              <option value="" disabled>Select category</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Stock Quantity</label>
            <input
              type="number"
              name="stocks"
              value={form.stocks}
              onChange={handleChange}
              placeholder="0"
              min="0"
              required
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Describe the product..."
            className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition resize-none"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors"
          >
            Add Product
          </button>
          <button
            type="button"
            onClick={() => { setForm({ name: '', price: '', category: '', stocks: '', description: '', image : "" })}}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddProduct
