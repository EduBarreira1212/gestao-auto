import { PostgresDeleteUserRepository } from './delete-user.js';
import { userFixture as user } from '../../../tests/fixtures/user.js';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

describe('PostgresDeleteUserRepository', () => {
    const sut = new PostgresDeleteUserRepository();

    test('should delete a user sucessfully', async () => {
        await prisma.user.create({
            data: user,
        });

        const result = await sut.execute(user.id);

        expect(result).toStrictEqual({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
        });
    });
});
