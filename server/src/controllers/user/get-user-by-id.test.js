import { GetUserByIdCrontroller } from './get-user-by-id';

describe('GetUserByIdController', () => {
    class GetUserByIdUseCaseStub {
        async execute(userId) {
            const user = {
                id: userId,
                name: 'Eduardo',
                email: 'edu@gmail.com',
                password: '12345',
            };
            return user;
        }
    }

    const makeSut = () => {
        const getUserByIdUseCase = new GetUserByIdUseCaseStub();
        const sut = new GetUserByIdCrontroller(getUserByIdUseCase);

        return sut;
    };

    test('should return 200 when id is valid', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                userId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(200);
        expect(result.body.id).toBe(httpRequest.params.userId);
    });

    test('should return 404 when id is not valid', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                userId: 'invalid_id',
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(404);
    });

    test('should return 404 when user is not found', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                userId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
        };

        jest.spyOn(sut.getUserByIdUseCase, 'execute').mockImplementationOnce(() => {
            return null;
        });

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(404);
        expect(result.body.message).toBe('User not found');
    });

    test('should return 500 when execute throws an error', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                userId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
        };

        jest.spyOn(sut.getUserByIdUseCase, 'execute').mockImplementationOnce(() => {
            throw new Error();
        });

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(500);
    });

    test('should call GetUserByIdUseCase with correct params', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                userId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
        };

        const executeSpy = jest.spyOn(sut.getUserByIdUseCase, 'execute');

        await sut.execute(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.params.userId);
    });
});
