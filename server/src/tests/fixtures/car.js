import { faker, fakerPT_BR } from '@faker-js/faker';

export const carFixture = {
    id: faker.string.uuid(),
    user_id: faker.string.uuid(),
    brand: faker.vehicle.manufacturer(),
    name: faker.vehicle.model(),
    year: 2018,
    plate: 'AAA0A00',
    fuel: fakerPT_BR.vehicle.fuel(),
    renavam: faker.number.int({ min: 10000000000, max: 90000000000 }).toString(),
    chassis: fakerPT_BR.vehicle.vin(),
    km: faker.number.int({ min: 0, max: 200000 }),
    entry_price: Number(faker.commerce.price({ min: 20000, max: 1000000 })),
};
