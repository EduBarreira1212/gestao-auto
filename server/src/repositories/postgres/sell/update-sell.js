import prisma from '../../../../prisma/prisma.js';

export class PostgresUpdateSellRepository {
    async execute(sellId, updateSellParams) {
        const updatedSell = await prisma.sell.update({
            where: { id: sellId },
            data: updateSellParams,
        });

        return updatedSell;
    }
}
