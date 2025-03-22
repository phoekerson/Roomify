import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Vérification et assignation sans utiliser `var`
declare global {
  let prisma: PrismaClient | undefined;
}

const prisma: PrismaClient = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

export default prisma;
