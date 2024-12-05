import prisma from '../../../../prisma/prisma.js';

export class PostgresGetLeadByIdRepository {
    async execute(leadId) {
        const lead = await prisma.lead.findUnique({ where: { id: leadId } });

        return lead;
    }
}
