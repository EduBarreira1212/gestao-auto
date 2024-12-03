import prisma from '../../../../prisma/prisma';

export class PostgresGetLeadByEmailRepository {
    async execute(leadEmail) {
        const lead = await prisma.lead.findUnique({ where: { email: leadEmail } });

        return lead;
    }
}
