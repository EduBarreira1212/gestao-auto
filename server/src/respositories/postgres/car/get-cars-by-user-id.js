import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class PostgresGetCarsByUserIdRepository {
    async execute(userId) {
        const cars = await prisma.car.findMany({
            where: {
                user_id: userId,
            },
        });

        return cars;
    }
}
