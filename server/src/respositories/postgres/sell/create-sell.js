import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class PostgresCreateSellRepository {
    async execute(createSellParams) {
        const createdSell = await prisma.sell.create({
            data: createSellParams,
        });

        return createdSell;
    }
}
