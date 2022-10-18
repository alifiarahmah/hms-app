import { PrismaClient } from '@prisma/client';

// Only create one prisma client instance
const prisma = new PrismaClient();

export default prisma;
