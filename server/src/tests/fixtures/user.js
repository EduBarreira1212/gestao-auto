import { faker } from '@faker-js/faker';

export const userFixture = {
    id: faker.string.uuid(),
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 5 }),
};
