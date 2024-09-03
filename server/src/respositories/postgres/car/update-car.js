import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class PostgresUpdateCarRepository {
    async execute(carId, data) {
        const updatedCar = await prisma.car.update({
            where: { id: carId },
            data: data,
        });

        return updatedCar;
    }
}
