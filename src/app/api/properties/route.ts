import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import redis from "@/lib/redis";

const searchSchema = z.object({
  city: z.string().optional(),
  type: z.enum(["BUY", "RENT", "COMMERCIAL"]).optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  beds: z.coerce.number().optional(),
  baths: z.coerce.number().optional(),
  limit: z.coerce.number().default(10),
  page: z.coerce.number().default(1),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const params = searchSchema.parse(Object.fromEntries(searchParams.entries()));

    const skip = (params.page - 1) * params.limit;

    // Cache key based on params
    const cacheKey = `properties:search:${JSON.stringify(params)}`;
    let cachedData = null;
    
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_URL.trim() !== "") {
      try {
        cachedData = await redis.get(cacheKey);
      } catch (redisError) {
        console.warn("Redis read error, falling back to DB:", redisError);
      }
    }

    if (cachedData) {
      console.log("Serving from cache:", cacheKey);
      return NextResponse.json(cachedData);
    }

    // Build filters
    const where: any = {
      status: "ACTIVE",
    };

    if (params.city) where.city = { contains: params.city, mode: "insensitive" };
    if (params.type) where.type = params.type;
    if (params.minPrice || params.maxPrice) {
      where.price = {};
      if (params.minPrice) where.price.gte = params.minPrice;
      if (params.maxPrice) where.price.lte = params.maxPrice;
    }
    if (params.beds) where.beds = params.beds;
    if (params.baths) where.baths = params.baths;

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        include: {
          images: {
            where: { isPrimary: true },
            take: 1,
          },
          agent: {
            select: {
              name: true,
              avatar: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: params.limit,
      }),
      prisma.property.count({ where }),
    ]);

    const response = {
      properties,
      pagination: {
        total,
        pages: Math.ceil(total / params.limit),
        currentPage: params.page,
      },
    };

    // Cache the result for 5 minutes
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_URL.trim() !== "") {
      try {
        await redis.set(cacheKey, response, { ex: 300 });
      } catch (redisError) {
        console.warn("Redis write error:", redisError);
      }
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Properties API Error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 });
  }
}
