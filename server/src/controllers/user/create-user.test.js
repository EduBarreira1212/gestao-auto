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

    test('should return 201 and body when user is created with sucess', async () => {
        const sut = makeSut();

        const httpRequest = {
            body: {
                name: 'Eduardo',
                email: 'edu@gmail.com',
                password: '12345678910',
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(201);
    });

    test('should return 400 when body is send with invalid data', async () => {
        const sut = makeSut();

        const httpRequest = {
            body: {
                name: 'Eduardo',
                email: 'edugmail.com',
                password: '123',
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(400);
    });

    test('should return 404 when execute throw an error', async () => {
        const sut = makeSut();

        const httpRequest = {
            body: {
                name: 'Eduardo',
                email: 'edu@gmail.com',
                password: '123456789',
            },
        };

        import.meta.jest
            .spyOn(sut.createUserUseCase, 'execute')
            .mockImplementationOnce(() => {
                throw new Error();
            });

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(404);
    });

    test('should call CreateUserUseCase with correct params', async () => {
        const sut = makeSut();

        const httpRequest = {
            body: {
                name: 'Eduardo',
                email: 'edu@gmail.com',
                password: '123456789',
            },
        };

        const executeSpy = import.meta.jest.spyOn(sut.createUserUseCase, 'execute');

        await sut.execute(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.body);
    });
});
