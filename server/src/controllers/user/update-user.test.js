import { UpdateUserController } from './update-user.js';

describe('CreateUserController', () => {
    class UpdateUserUseCaseStub {
        async execute(userId, params) {
            return {
                id: userId,
                ...params,
            };
        }
    }

    const makeSut = () => {
        const updateUserUseCase = new UpdateUserUseCaseStub();
        const sut = new UpdateUserController(updateUserUseCase);

        return sut;
    };

    test('should return 200 and body when user is updated with sucess', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                userId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
            body: {
                name: 'Eduardo',
                email: 'edu@gmail.com',
                password: '12345',
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(200);
        expect(result.body).not.toBe(null);
    });

    test('should return 404 when id is not valid', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                userId: 'invalid_id',
            },
            body: {
                name: 'Eduardo',
                email: 'edu@gmail.com',
                password: '12345',
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(404);
    });

    test('should return 400 when any field is not valid', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                userId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
            body: {
                name: 'Eduardo',
                email: 'edu.com',
                password: '12345',
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(400);
    });

    test('should return 400 when unnalowed field is passed', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                userId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
            body: {
                name: 'Eduardo',
                email: 'edu@gmail.com',
                password: '12345',
                unnalowed_field: 'not_valid',
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(400);
    });

    test('should return 500 when execute throws an error', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                userId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
            body: {
                name: 'Eduardo',
                email: 'edu@gmail.com',
                password: '12345',
            },
        };

        jest.spyOn(sut.updateUserUseCase, 'execute').mockImplementationOnce(() => {
            throw new Error();
        });

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(500);
    });

    test('should call UpdateUserUseCase with correct params', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                userId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
            body: {
                name: 'Eduardo',
                email: 'edu@gmail.com',
                password: '12345',
            },
        };

        const executeSpy = jest.spyOn(sut.updateUserUseCase, 'execute');

        await sut.execute(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith(
            httpRequest.params.userId,
            httpRequest.body
        );
    });
});
