import prisma from '../../../../prisma/prisma.js';

export class PostgresChangePaidStatusRepository {
    async execute(email, paidStatus) {
        const updatedUser = await prisma.user.update({
            where: { email: email },
            data: { paid: paidStatus },
        });

        return updatedUser;
    }
}
