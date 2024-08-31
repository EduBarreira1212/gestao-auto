import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class PostgresGetUserById {
    async execute(userID) {
        const user = await prisma.user.findUnique({
            where: {
                id: userID,
            },
        });
        return user;
    }
}
