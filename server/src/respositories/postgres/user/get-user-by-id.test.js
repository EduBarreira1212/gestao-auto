import { PostgresGetUserById } from './get-user-by-id.js';
import { userFixture as user } from '../../../tests/fixtures/user.js';

import prisma from '../../../../prisma/prisma.js';

describe('PostgresGetUserByIdRepository', () => {
    const sut = new PostgresGetUserById();

    test('should get a user by id sucessfully', async () => {
        const createdUser = await prisma.user.create({
            data: user,
        });

        const result = await sut.execute(createdUser.id);

        expect(result).toStrictEqual({
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
            password: createdUser.password,
        });
    });
});
