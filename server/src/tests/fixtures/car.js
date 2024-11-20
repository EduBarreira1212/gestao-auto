import { faker } from '@faker-js/faker';

export const carFixture = {
    id: faker.string.uuid(),
    user_id: faker.string.uuid(),
    brand: faker.vehicle.manufacturer(),
    name: faker.vehicle.model(),
    year: 2018,
    plate: 'AAA0A00',
    km: faker.number.int({ min: 0, max: 200000 }),
    entry_price: Number(faker.commerce.price({ min: 20000, max: 1000000 })),
};
