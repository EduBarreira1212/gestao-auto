import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class PostgresCreateUserRepositorie {
    async execute(createUserParams) {
        const user = await prisma.user.create({
            data: {
                ...createUserParams,
            },
        });
        return user;
    }
}
