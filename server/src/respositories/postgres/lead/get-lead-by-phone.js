import prisma from '../../../../prisma/prisma';

export class PostgresGetLeadByPhoneRepository {
    async execute(leadPhone) {
        const lead = await prisma.lead.findUnique({ where: { phone: leadPhone } });

        return lead;
    }
}
