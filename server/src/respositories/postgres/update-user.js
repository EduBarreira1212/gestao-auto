import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class PostgresUpdateUserRepository {
    async execute(userId, updateUserParams) {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateUserParams,
        });

        return updatedUser;
    }
}