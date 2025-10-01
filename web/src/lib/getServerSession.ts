import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

type UserPayload = {
  id: string
  email: string
  name?: string
}

export async function getServerSession(): Promise<UserPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value
  if (!token) return null

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload
    return decoded
  } catch (err) {
    console.error(err)
    return null
  }
}
