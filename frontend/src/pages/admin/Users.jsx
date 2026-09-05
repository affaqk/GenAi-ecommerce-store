import axios from 'axios'
import React, { useEffect, useState } from 'react'

const SAMPLE_USERS = [
  { id: 1, name: 'Sara Ahmed', email: 'sara@email.com', role: 'Customer', joined: '2025-01-14', orders: 12, status: 'Active' },
  { id: 2, name: 'James Lee', email: 'james@email.com', role: 'Customer', joined: '2025-03-02', orders: 5, status: 'Active' },
  { id: 3, name: 'Mia Khan', email: 'mia@email.com', role: 'Customer', joined: '2025-04-19', orders: 8, status: 'Inactive' },
  { id: 4, name: 'Tom Brady', email: 'tom@email.com', role: 'Admin', joined: '2024-11-07', orders: 0, status: 'Active' },
  { id: 5, name: 'Zara Malik', email: 'zara@email.com', role: 'Customer', joined: '2025-06-23', orders: 3, status: 'Active' },
  { id: 6, name: 'Ali Hassan', email: 'ali@email.com', role: 'Customer', joined: '2025-07-01', orders: 1, status: 'Inactive' },
]

const STATUS_STYLE = {
  Active: 'bg-green-100 text-green-700',
  Inactive: 'bg-slate-100 text-slate-500',
}

const ROLE_STYLE = {
  Admin: 'bg-amber-100 text-amber-700',
  Customer: 'bg-blue-50 text-blue-600',
}

const Users = () => {
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState([])

  const getAllUsers = async () => {
    try {
        const response = await axios.get("http://localhost:8000/api/v1/user/get-all-users",{
            withCredentials : true
        })
        setUsers(response.data.users)
    } catch (error) {
        console.log(error)
    }
  }

  const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:8000/api/v1/user/delete-user/${id}`, {
            withCredentials: true
        })
        setUsers(prev => prev.filter(u => u._id !== id))
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(()=>{
    getAllUsers()
  },[])

  console.log(users)
  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Users</h1>
          <p className="text-sm text-slate-500 mt-1">{users.length} total registered accounts</p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {['User', 'Role', 'Joined', 'Orders', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-slate-400 text-sm">
                    No users found.
                  </td>
                </tr>
              ) : filtered.map(user => (
                <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 font-bold text-sm flex items-center justify-center shrink-0">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 leading-tight">{user.name}</p>
                        <p className="text-slate-400 text-xs mt-0.5">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${ROLE_STYLE[user.role]}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-500 whitespace-nowrap">{user.joined}</td>
                  <td className="px-5 py-4 font-semibold text-slate-700">{user.orders}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_STYLE[user.status]}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      
                      <button onClick={() => handleDelete(user._id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Delete">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>Showing {filtered.length} of {users.length} users</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors text-slate-500 font-medium">Prev</button>
            <button className="px-3 py-1 rounded-lg bg-amber-500 text-white font-medium">1</button>
            <button className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors text-slate-500 font-medium">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Users
