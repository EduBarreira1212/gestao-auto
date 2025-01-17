import prisma from '../../../../prisma/prisma.js';

export class PostgresGetCarsByUserIdRepository {
    async execute(userId) {
        const cars = await prisma.car.findMany({
            where: {
                user_id: userId,
            },
            include: {
                expenses: true,
                sell: true,
            },
        });

        return cars;
    }
}
