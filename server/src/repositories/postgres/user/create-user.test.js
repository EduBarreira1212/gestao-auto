import { PostgresCreateUserRepositorie } from './create-user.js';
import { userFixture as user } from '../../../tests/fixtures/user.js';

describe('PostgresCreateUserRepository', () => {
    const sut = new PostgresCreateUserRepositorie();

    test('should create a user sucessfully', async () => {
        const result = await sut.execute(user);

        expect(result).not.toBeFalsy();
    });

    test('should return a user with correct properties', async () => {
        const result = await sut.execute(user);

        expect(result).toStrictEqual({
            id: user.id,
            external_id: user.external_id,
            name: user.name,
            email: user.email,
            password: user.password,
            paid: false,
            createdAt: result.createdAt,
        });
    });
});
