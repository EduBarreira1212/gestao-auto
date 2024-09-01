import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class PostgresGetCarByIdRepository {
    async execute(carId) {
        const car = await prisma.car.findUnique({
            where: {
                id: carId,
            },
        });

        return car;
    }
}
