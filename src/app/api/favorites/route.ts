import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId: session.user.id },
      include: {
        property: {
          include: {
            images: { where: { isPrimary: true }, take: 1 },
          },
        },
      },
    });

    return NextResponse.json(favorites.map(f => f.property));
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { propertyId } = await req.json();

    const existing = await prisma.favorite.findUnique({
      where: {
        userId_propertyId: {
          userId: session.user.id,
          propertyId,
        },
      },
    });

    if (existing) {
      await prisma.favorite.delete({
        where: { id: existing.id },
      });
      return NextResponse.json({ favorited: false });
    } else {
      await prisma.favorite.create({
        data: {
          userId: session.user.id,
          propertyId,
        },
      });
      return NextResponse.json({ favorited: true });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to toggle favorite" }, { status: 500 });
  }
}
