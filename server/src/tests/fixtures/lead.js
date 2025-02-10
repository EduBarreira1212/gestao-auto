import { faker, fakerPT_BR } from '@faker-js/faker';

export const leadFixture = {
    id: faker.string.uuid(),
    user_id: faker.string.uuid(),
    name: faker.person.firstName(),
    email: faker.internet.email(),
    cpfCnpj: '000.000.000-00',
    phone: fakerPT_BR.phone.number({ style: 'national' }),
    birthday: faker.date.birthdate(),
};
