import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["BUYER", "AGENT"]).default("BUYER"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, role } = registerSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: role as any,
      },
    });

    // Create a free subscription record for the new user
    await prisma.subscription.create({
      data: {
        userId: user.id,
        plan: "FREE",
      },
    });

    return NextResponse.json({ 
      success: true, 
      user: { id: user.id, email: user.email, name: user.name, role: user.role } 
    });
  } catch (error) {
    console.error("Registration Error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create account" }, { status: 500 });
  }
}
