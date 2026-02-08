import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ["query"],
        // In Prisma 7, when using prisma+postgres:// URLs, 
        // we must explicitly provide the URL as accelerateUrl if not using an adapter.
        ...(process.env.DATABASE_URL?.startsWith("prisma")
            ? { accelerateUrl: process.env.DATABASE_URL }
            : {}),
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
