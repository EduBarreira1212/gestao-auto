import prisma from '../../../../prisma/prisma';

export class PostgresCreateLeadRepository {
    async execute(createLeadParams) {
        const leadCreated = await prisma.lead.create({ data: createLeadParams });

        return leadCreated;
    }
}