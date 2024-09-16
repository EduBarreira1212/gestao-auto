import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

beforeEach(async () => {
    await prisma.sell.deleteMany({});
    await prisma.car.deleteMany({});
    await prisma.user.deleteMany({});
});
