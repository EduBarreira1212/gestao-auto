import prisma from '../../../../prisma/prisma.js';

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
