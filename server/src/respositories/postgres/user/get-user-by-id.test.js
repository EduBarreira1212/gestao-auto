import { PostgresGetUserById } from './get-user-by-id.js';
import { userFixture as user } from '../../../tests/fixtures/user.js';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

describe('PostgresGetUserByIdRepository', () => {
    const sut = new PostgresGetUserById();

    test('should get a user by id sucessfully', async () => {
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
