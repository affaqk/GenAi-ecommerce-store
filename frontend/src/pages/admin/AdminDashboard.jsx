import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const usersStats = [
{
    label: 'Total Users',
    change: '+12%',
    up: true,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
    color: 'bg-blue-50 text-blue-600',
  }
]

const productsState = [
  {
    label: 'Total Products',
    change: '+5%',
    up: true,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
      </svg>
    ),
    color: 'bg-amber-50 text-amber-600',
  },
]

const RECENT_ORDERS = [
  { id: '#10231', customer: 'Sara Ahmed', product: 'Silk Blazer', amount: '$129', status: 'Delivered' },
  { id: '#10230', customer: 'James Lee', product: 'Classic Watch', amount: '$245', status: 'Processing' },
  { id: '#10229', customer: 'Mia Khan', product: 'Leather Bag', amount: '$89', status: 'Shipped' },
  { id: '#10228', customer: 'Tom Brady', product: 'Running Shoes', amount: '$74', status: 'Cancelled' },
  { id: '#10227', customer: 'Zara Malik', product: 'Denim Jacket', amount: '$110', status: 'Delivered' },
]

const STATUS_STYLES = {
  Delivered: 'bg-green-100 text-green-700',
  Processing: 'bg-amber-100 text-amber-700',
  Shipped: 'bg-blue-100 text-blue-700',
  Cancelled: 'bg-red-100 text-red-700',
}

const AdminDashboard = () => {
  
  const [stats, setStats] = useState([]);
  const [users, setUsers] = useState();
  const [products, setProducts] = useState()
  const getAllStats = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/product/combine-data", {
        withCredentials : true
      });
      // console.log(response.data.user)
      setProducts(response.data.product);
      setUsers(response.data.user)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getAllStats()
  },[])

  console.log(users, products)
  return (
    <div className="space-y-8">

      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {usersStats.map(({ label, value, change, up, icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-200 p-5 flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
              {icon}
            </div>
            <div className="min-w-0">
              <p className="text-sm text-slate-500 font-medium">{label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-0.5">{users}</p>
              <p className={`text-xs font-medium mt-1 ${up ? 'text-green-600' : 'text-red-500'}`}>
                {change} vs last month
              </p>
            </div>
          </div>
        ))}
        {productsState.map(({ label, value, change, up, icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-200 p-5 flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
              {icon}
            </div>
            <div className="min-w-0">
              <p className="text-sm text-slate-500 font-medium">{label}</p>
              <p className="text-2xl font-bold text-slate-900 mt-0.5">{products}</p>
              <p className={`text-xs font-medium mt-1 ${up ? 'text-green-600' : 'text-red-500'}`}>
                {change} vs last month
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-2xl border border-slate-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-900">Recent Orders</h2>
          <span className="text-xs text-slate-400 font-medium">Last 7 days</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                {['Order', 'Customer', 'Product', 'Amount', 'Status'].map(h => (
                  <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {RECENT_ORDERS.map(order => (
                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">{order.id}</td>
                  <td className="px-6 py-4 text-slate-600">{order.customer}</td>
                  <td className="px-6 py-4 text-slate-600">{order.product}</td>
                  <td className="px-6 py-4 font-semibold text-slate-800">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Link
          to="/admin/add-product"
          className="bg-amber-500 hover:bg-amber-600 transition-colors rounded-2xl p-6 flex items-center gap-4 group"
        >
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <div>
            <p className="text-white font-semibold text-base">Add New Product</p>
            <p className="text-amber-100 text-sm mt-0.5">List a new item in the store</p>
          </div>
        </Link>
        <Link
          to="/admin/users"
          className="bg-slate-900 hover:bg-slate-800 transition-colors rounded-2xl p-6 flex items-center gap-4 group"
        >
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>
          </div>
          <div>
            <p className="text-white font-semibold text-base">Manage Users</p>
            <p className="text-slate-400 text-sm mt-0.5">View and manage all accounts</p>
          </div>
        </Link>
      </div>

    </div>
  )
}

export default AdminDashboard