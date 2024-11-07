import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

import { ClerkClientAdapter } from './clerk-client.js';
import { userFixture } from '../tests/fixtures/user.js';

describe('clerk client adapter', () => {
    test('should create, update and delete a user sucessfully', async () => {
        const sut = new ClerkClientAdapter();

        const user = await sut.createUser({
            externalId: userFixture.id,
            firstName: userFixture.name,
            emailAddress: [userFixture.email],
            passwordDigest: bcrypt.hashSync(userFixture.password, 10),
            passwordHasher: 'bcrypt',
        });

        const updatedUser = await sut.updateUser(user.id, {
            firstName: 'test_name',
            emailAddress: 'email+clerk_test@gmail.com',
        });

        const deletedUser = await sut.deleteUser(updatedUser.id);

        expect(typeof user).toBe('object');
        expect(typeof updatedUser).toBe('object');
        expect(typeof deletedUser).toBe('object');
    });
    test('should create and delete a user email sucessfully', async () => {
        const sut = new ClerkClientAdapter();

        const user = await sut.createUser({
            externalId: userFixture.id,
            firstName: userFixture.name,
            emailAddress: [faker.internet.email()],
            passwordDigest: bcrypt.hashSync(userFixture.password, 10),
            passwordHasher: 'bcrypt',
        });

        const emailCreated = await sut.createEmail({
            userId: user.id,
            emailAddress: userFixture.email,
            primary: true,
            verified: true,
        });

        const emaildeleted = await sut.deleteEmail(emailCreated.id);

        expect(typeof emailCreated).toBe('object');
        expect(typeof emaildeleted).toBe('object');
    });
});
