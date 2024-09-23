import { faker } from '@faker-js/faker';

import { UuidValidatorAdapter } from './uuid-validator.js';

describe('uuid validator adapter', () => {
    test('should return true if id is a uuid', () => {
        const sut = new UuidValidatorAdapter();

        const id = faker.string.uuid();

        const result = sut.execute(id);

        expect(result).toBeTruthy();
        expect(typeof result).toBe('boolean');
    });

    test('should return false if id is not a uuid', () => {
        const sut = new UuidValidatorAdapter();

        const id = '12345';

        const result = sut.execute(id);

        expect(result).toBeFalsy();
        expect(typeof result).toBe('boolean');
    });
});
