import { PrismaClient } from "@prisma/client";

const global = globalThis as unknown as { prisma: PrismaClient };

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;
