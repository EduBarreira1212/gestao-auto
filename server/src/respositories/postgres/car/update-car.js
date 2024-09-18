import prisma from '../../../../prisma/prisma.js';

export class PostgresUpdateCarRepository {
    async execute(carId, data) {
        const updatedCar = await prisma.car.update({
            where: { id: carId },
            data: data,
        });

        return updatedCar;
    }
}
