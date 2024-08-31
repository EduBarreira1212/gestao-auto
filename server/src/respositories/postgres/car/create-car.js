import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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
