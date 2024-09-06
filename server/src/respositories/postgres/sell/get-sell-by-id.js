import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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
