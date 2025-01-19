import prisma from '../../../../prisma/prisma.js';

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
