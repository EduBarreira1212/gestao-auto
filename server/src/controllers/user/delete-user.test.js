import { DeleteUserController } from './delete-user.js';

describe('DeleteUserController', () => {
    class DeleteUserUseCaseStub {
        execute(userID) {
            const user = {
                id: userID,
                name: 'Eduardo',
                email: 'edu@gmail.com',
                password: '12345',
            };
            return user;
        }
    }

    const makeSut = () => {
        const deleteUserUseCase = new DeleteUserUseCaseStub();
        const sut = new DeleteUserController(deleteUserUseCase);

        return sut;
    };

    test('return 200 if user deleted sucessfully', async () => {
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

    test('return 404 if id is not valid', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                userId: 'INVALID_ID',
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(404);
        expect(result.body.message).toBe('ID invalid');
    });

    test('return 500 if execute throws an error', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                userId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
        };

        import.meta.jest.spyOn(sut.deleteUserUseCase, 'execute').mockImplementationOnce(() => {
            throw new Error();
        });

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(500);
    });

    test('should call DeleteUserUseCase with correct params', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                userId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
        };

        const executeSpy = import.meta.jest.spyOn(sut.deleteUserUseCase, 'execute');

        await sut.execute(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.params.userId);
    });
});
