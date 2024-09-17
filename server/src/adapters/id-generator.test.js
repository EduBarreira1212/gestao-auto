import { IdGeneratorAdapter } from './id-generator.js';

describe('id generator adapter', () => {
    test('should return a uuid', () => {
        const sut = new IdGeneratorAdapter();

        const result = sut.execute();

        expect(result).toBeTruthy();
        expect(typeof result).toBe('string');
        const validator =
            /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
        expect(result).toMatch(validator);
    });
});
