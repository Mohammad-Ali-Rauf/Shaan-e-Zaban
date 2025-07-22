"use client"
import { signIn } from "next-auth/react"
import { useState } from "react"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 space-y-4">
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} className="w-full p-2 border" />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className="w-full p-2 border" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Sign In</button>
    </form>
  )
}