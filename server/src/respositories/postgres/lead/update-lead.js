import prisma from '../../../../prisma/prisma.js';

export class PostgresUpdateLeadRepository {
    async execute(leadId, updateLeadParams) {
        const leadUpdated = await prisma.lead.update({
            where: { id: leadId },
            data: updateLeadParams,
        });

        return leadUpdated;
    }
}
