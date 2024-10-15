import { faker } from '@faker-js/faker';

export const userFixture = {
    id: faker.string.uuid(),
    external_id: faker.string.alphanumeric({ length: { min: 8, max: 15 } }),
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 5 }),
};
