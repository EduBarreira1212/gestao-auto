import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class PostgresDeleteCarRepository {
    async execute(carId) {
        const deletedUser = await prisma.car.delete({
            where: {
                id: carId,
            },
        });

        return deletedUser;
    }
}
