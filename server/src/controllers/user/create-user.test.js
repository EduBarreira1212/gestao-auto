import { CreateUserController } from './create-user.js';

describe('CreateUserController', () => {
    class CreateUserUseCaseStub {
        execute(user) {
            return user;
        }
    }

    const createUserUseCaseStub = new CreateUserUseCaseStub();
    const createUserController = new CreateUserController(createUserUseCaseStub);

    test('should return 201 and body when user is created sucessfully', async () => {
        const httpRequest = {
            body: {
                name: 'Eduardo',
                email: 'edu@gmail.com',
                password: '12345',
            },
        };

        const result = await createUserController.execute(httpRequest);

        expect(result.statusCode).toBe(201);
    });
});
