import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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
