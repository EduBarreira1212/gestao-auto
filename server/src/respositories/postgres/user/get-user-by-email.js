import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class PostgresGetUserByEmailRepositorie {
    async execute(email) {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        return user;
    }
}
