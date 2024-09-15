import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

beforeEach(async () => {
    await prisma.user.deleteMany({});
    await prisma.car.deleteMany({});
    await prisma.sell.deleteMany({});
});
