import { faker } from '@faker-js/faker';

export const expenseFixture = {
    id: faker.string.uuid(),
    car_id: faker.string.uuid(),
    amount: Number(faker.commerce.price({ min: 20000, max: 1000000 })),
    description: faker.commerce.productDescription(),
};
