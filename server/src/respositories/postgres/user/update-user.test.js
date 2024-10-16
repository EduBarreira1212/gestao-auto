import { PostgresUpdateUserRepository } from './update-user.js';
import { userFixture as user } from '../../../tests/fixtures/user.js';

import prisma from '../../../../prisma/prisma.js';

describe('PostgresUpdateUserRepository', () => {
    const sut = new PostgresUpdateUserRepository();

    test('should update a user sucessfully', async () => {
        const createdUser = await prisma.user.create({
            data: user,
        });

        const result = await sut.execute(createdUser.id, user);

        expect(result).toStrictEqual({
            id: user.id,
            external_id: user.external_id,
            name: user.name,
            email: user.email,
            password: user.password,
            createdAt: result.createdAt,
        });
    });
});
