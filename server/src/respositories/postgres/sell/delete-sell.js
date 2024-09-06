import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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
