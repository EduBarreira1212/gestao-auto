import prisma from '../../../../prisma/prisma.js';

export class PostgresDeleteSellRepository {
    async execute(sellId) {
        const deletedSell = await prisma.sell.delete({
            where: {
                id: sellId,
            },
        });

        return deletedSell;
    }
}
