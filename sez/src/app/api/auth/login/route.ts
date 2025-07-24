import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.password)
    return new Response("Invalid credentials", { status: 401 });

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid)
    return new Response("Invalid credentials", { status: 401 });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  const response = new Response(JSON.stringify({ success: true }), {
    status: 200,
  });

  response.headers.set(
    "Set-Cookie",
    `token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}`
  );

  return response;
}
