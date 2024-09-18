import prisma from '../../../../prisma/prisma.js';

export class PostgresGetSellByIdRepository {
    async execute(sellId) {
        const sell = await prisma.sell.findUnique({
            where: {
                id: sellId,
            },
        });

        return sell;
    }
}
