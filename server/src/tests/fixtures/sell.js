import { faker } from '@faker-js/faker';

export const sellFixture = {
    id: faker.string.uuid(),
    user_id: faker.string.uuid(),
    car_id: faker.string.uuid(),
    amount: Number(faker.commerce.price({ min: 20000, max: 1000000 })),
    profit: Number(faker.commerce.price({ min: 1000, max: 100000 })),
};
