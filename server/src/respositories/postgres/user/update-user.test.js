import { PostgresUpdateUserRepository } from './update-user.js';
import { userFixture as user } from '../../../tests/fixtures/user.js';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

describe('PostgresUpdateUserRepository', () => {
    const updateUserParams = {
        ...user,
        id: undefined,
    };

    const sut = new PostgresUpdateUserRepository();

    test('should update a user sucessfully', async () => {
        const createdUser = await prisma.user.create({
            data: user,
        });

        const result = await sut.execute(createdUser.id, updateUserParams);

        console.log(result);

        expect(result).toStrictEqual({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
        });
    });
});
