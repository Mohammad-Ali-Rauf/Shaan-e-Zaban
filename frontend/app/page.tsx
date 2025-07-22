'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

interface User {
  id: number
  username: string
  email: string
  progress: Record<string, any>
}

const Home = () => {
  const [users, setUsers] = useState<User[]>([])
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const [userIdToFetch, setUserIdToFetch] = useState('')
  const [fetchedUser, setFetchedUser] = useState<User | null>(null)
  const [fetchError, setFetchError] = useState('')
  const [editingUserId, setEditingUserId] = useState<number | null>(null)
  const [editUsername, setEditUsername] = useState('')
  const [editEmail, setEditEmail] = useState('')


  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8080/users')
      setUsers(res.data)
    } catch (err) {
      console.error('Failed to fetch users:', err)
    }
  }

  const addUser = async () => {
    if (!username || !email) return alert('Both fields required')
    setLoading(true)
    try {
      await axios.post('http://localhost:8080/users', {
        username,
        email,
      })
      setUsername('')
      setEmail('')
      fetchUsers()
    } catch (err) {
      console.error('Failed to add user:', err)
      alert('Error adding user')
    } finally {
      setLoading(false)
    }
  }

  const fetchSingleUser = async () => {
    if (!userIdToFetch) return
    setFetchedUser(null)
    setFetchError('')
    try {
      const res = await axios.get(`http://localhost:8080/users/${userIdToFetch}`)
      setFetchedUser(res.data)
    } catch (err) {
      console.error('Failed to fetch single user:', err)
      setFetchError('❌ User not found')
    }
  }

  const deleteUser = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    try {
      await axios.delete(`http://localhost:8080/users/${id}`)
      fetchUsers()
    } catch (err) {
      console.error('Failed to delete user:', err)
      alert('Failed to delete user 😢')
    }
  }

  const updateUser = async () => {
    if (!editingUserId) return

    try {
      await axios.put(`http://localhost:8080/users/${editingUserId}`, {
        username: editUsername,
        email: editEmail,
      })

      setEditingUserId(null)
      setEditUsername('')
      setEditEmail('')
      fetchUsers()
    } catch (err) {
      console.error('Failed to update user:', err)
      alert('Failed to update user 😤')
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-md p-6">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">Shaan-e-Zaban Sign Up</h1>

        {/* ADD USER FORM */}
        <div className="mb-8 space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Username</label>
            <input
              type="text"
              placeholder="e.g. ali_the_giga"
              value={username}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              placeholder="e.g. ali@shaan.io"
              value={email}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            onClick={addUser}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition-all"
          >
            {loading ? 'Adding...' : '➕ Add User'}
          </button>
        </div>

        <hr className="my-6" />

        {/* GET SINGLE USER */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">🔍 Get User by ID</h2>
          <div className="flex items-center gap-4">
            <input
              type="number"
              placeholder="Enter user ID"
              value={userIdToFetch}
              onChange={(e) => setUserIdToFetch(e.target.value)}
              className="w-40 border border-gray-300 px-4 py-2 rounded-md"
            />
            <button
              onClick={fetchSingleUser}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
            >
              Fetch
            </button>
          </div>

          {fetchError && <p className="text-red-500 mt-2">{fetchError}</p>}

          {fetchedUser && (
            <div className="mt-4 p-4 border border-gray-200 bg-purple-50 rounded-md shadow-sm">
              <p><strong>ID:</strong> {fetchedUser.id}</p>
              <p><strong>Username:</strong> {fetchedUser.username}</p>
              <p><strong>Email:</strong> {fetchedUser.email}</p>
            </div>
          )}
        </div>

        {/* ALL USERS LIST */}
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">📋 Registered Users</h2>
        {users.length === 0 ? (
          <p className="text-gray-500">No users found yet.</p>
        ) : (
          <ul className="space-y-4">
            {users.map((user) => (
              <li
                key={user.id}
                className="p-4 bg-gray-50 border border-gray-200 rounded-md shadow-sm"
              >
                {editingUserId === user.id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editUsername}
                      onChange={(e) => setEditUsername(e.target.value)}
                      className="w-full border px-3 py-1 rounded"
                      placeholder="Username"
                    />
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full border px-3 py-1 rounded"
                      placeholder="Email"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={updateUser}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                      >
                        ✅ Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingUserId(null)
                          setEditUsername('')
                          setEditEmail('')
                        }}
                        className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded"
                      >
                        ❌ Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-gray-800">{user.username}</p>
                      <p className="text-gray-600">{user.email}</p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setEditingUserId(user.id)
                          setEditUsername(user.username)
                          setEditEmail(user.email)
                        }}
                        className="text-blue-600 hover:text-blue-800 font-bold text-xl"
                        title="Edit User"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="text-red-600 hover:text-red-800 font-bold text-xl"
                        title="Delete User"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}

export default Home