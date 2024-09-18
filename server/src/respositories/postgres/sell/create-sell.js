import prisma from '../../../../prisma/prisma.js';

export class PostgresCreateSellRepository {
    async execute(createSellParams) {
        const createdSell = await prisma.sell.create({
            data: createSellParams,
        });

        return createdSell;
    }
}
