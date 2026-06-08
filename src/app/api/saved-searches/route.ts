import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, filters } = await req.json();

    const savedSearch = await prisma.savedSearch.create({
      data: {
        userId: session.user.id,
        name,
        filters: JSON.stringify(filters),
      },
    });

    return NextResponse.json(savedSearch);
  } catch (error) {
    return NextResponse.json({ error: "Failed to save search" }, { status: 500 });
  }
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const savedSearches = await prisma.savedSearch.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(savedSearches);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch saved searches" }, { status: 500 });
  }
}
