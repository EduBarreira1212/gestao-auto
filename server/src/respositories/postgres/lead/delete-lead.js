import prisma from '../../../../prisma/prisma';

export class PostgresDeleteLeadRepository {
    async execute(leadId) {
        const leadDeleted = await prisma.lead.delete({ where: { id: leadId } });

        return leadDeleted;
    }
}
