import { PostgresGetUserByEmailRepositorie } from './get-user-by-email.js';
import { userFixture as user } from '../../../tests/fixtures/user.js';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

describe('PostgresGetUserByEmailRepository', () => {
    const sut = new PostgresGetUserByEmailRepositorie();

    test('should get a user by email sucessfully', async () => {
        const createdUser = await prisma.user.create({
            data: user,
        });

        const result = await sut.execute(createdUser.email);

        expect(result).toStrictEqual({
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
            password: createdUser.password,
        });
    });
});
