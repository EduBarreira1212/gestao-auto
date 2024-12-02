import prisma from '../../../../prisma/prisma';

export class PostgresGetLeadsByUserIdRepository {
    async execute(userId) {
        const leads = await prisma.lead.findMany({ where: { user_id: userId } });

        return leads;
    }
}
