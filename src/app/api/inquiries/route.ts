import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { auth } from "@/auth";

const inquirySchema = z.object({
  propertyId: z.string(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    const body = await req.json();
    const data = inquirySchema.parse(body);

    const property = await prisma.property.findUnique({
      where: { id: data.propertyId },
      select: { agentId: true },
    });

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        propertyId: data.propertyId,
        senderId: session?.user?.id,
        agentId: property.agentId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
      },
    });

    // In a real app, send email here via Resend
    console.log("Inquiry created:", inquiry.id);

    return NextResponse.json({ success: true, inquiryId: inquiry.id });
  } catch (error) {
    console.error("Inquiry API Error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to send inquiry" }, { status: 500 });
  }
}
