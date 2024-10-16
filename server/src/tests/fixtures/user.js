import { faker } from '@faker-js/faker';

export const userFixture = {
    id: faker.string.uuid(),
    external_id: `user_${faker.string.alphanumeric({ length: { min: 27, max: 27 } })}`,
    name: faker.person.firstName(),
    email: `${faker.person.firstName()}+clerk_test@gmail.com`,
    password: faker.internet.password({ length: 9 }),
};
