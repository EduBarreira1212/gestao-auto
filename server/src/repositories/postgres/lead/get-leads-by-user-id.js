import prisma from '../../../../prisma/prisma.js';

export class PostgresGetLeadsByUserIdRepository {
    async execute(userId) {
        const leads = await prisma.lead.findMany({
            where: { user_id: userId },
            include: { purchases: true },
        });

        return leads;
    }
}
