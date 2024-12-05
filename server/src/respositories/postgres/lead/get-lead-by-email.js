import prisma from '../../../../prisma/prisma.js';

export class PostgresGetLeadByEmailRepository {
    async execute(leadEmail) {
        const lead = await prisma.lead.findUnique({ where: { email: leadEmail } });

        return lead;
    }
}
