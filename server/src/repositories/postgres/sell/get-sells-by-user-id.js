import prisma from '../../../../prisma/prisma.js';

export class PostgresGetSellsByUserIddRepository {
    async execute(userId) {
        const sells = await prisma.sell.findMany({
            where: {
                user_id: userId,
            },
        });

        return sells;
    }
}
