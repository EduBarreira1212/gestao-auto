import prisma from './prisma/prisma.js';

beforeEach(async () => {
    await prisma.sell.deleteMany({});
    await prisma.car.deleteMany({});
    await prisma.user.deleteMany({});
});
