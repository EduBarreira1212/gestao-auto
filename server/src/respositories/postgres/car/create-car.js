import prisma from '../../../../prisma/prisma.js';

export class PostgresCreateCarRepository {
    async execute(createCarParams) {
        const createdCar = await prisma.car.create({
            data: {
                ...createCarParams,
            },
        });

        return createdCar;
    }
}
