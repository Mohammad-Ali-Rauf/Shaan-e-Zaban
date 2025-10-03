import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;

    if (!decoded || !decoded?.id) {
      // Clear invalid token and return null user
      const response = NextResponse.json({ user: null });
      response.cookies.delete('token');
      return response;
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    if (!user) {
      // Clear invalid token and return null user
      const response = NextResponse.json({ user: null });
      response.cookies.delete('token');
      return response;
    }

    return NextResponse.json({ user });
    
  } catch (err: unknown) {
    console.error('ME route error:', err);
    
    // Clear invalid token on any error
    const response = NextResponse.json({ user: null });
    response.cookies.delete('token');
    
    return response;
  }
}