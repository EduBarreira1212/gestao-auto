import { CreateUserController } from './create-user.js';

describe('CreateUserController', () => {
    class CreateUserUseCaseStub {
        execute(user) {
            return user;
        }
    }

    const makeSut = () => {
        const createUserUseCaseStub = new CreateUserUseCaseStub();
        const sut = new CreateUserController(createUserUseCaseStub);

        return sut;
    };

    test('should return 201 and body when user is created sucessfully', async () => {
        const sut = makeSut();

        const httpRequest = {
            body: {
                name: 'Eduardo',
                email: 'edu@gmail.com',
                password: '12345',
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(201);
        expect(result.body).toBe(httpRequest.body);
    });

    test('should return 404 when execute throw an error', async () => {
        const sut = makeSut();

        const httpRequest = {
            body: {
                name: 'Eduardo',
                email: 'edu@gmail.com',
                password: '12345',
            },
        };

        jest.spyOn(sut.createUserUseCase, 'execute').mockImplementationOnce(() => {
            throw new Error();
        });

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(404);
    });
});
