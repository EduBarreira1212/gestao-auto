import prisma from '../../../../prisma/prisma.js';

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
