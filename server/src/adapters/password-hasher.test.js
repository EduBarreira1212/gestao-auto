import { PasswordHasherAdapter } from './password-hasher.js';

describe('password hasher adapter', () => {
    test('should return the password hashed', async () => {
        const sut = new PasswordHasherAdapter();
        const password = 'valid_password';

        const result = await sut.execute(password);

        expect(result).toBeTruthy();
        expect(typeof result).toBe('string');
        expect(result).not.toBe(password);
    });
});
