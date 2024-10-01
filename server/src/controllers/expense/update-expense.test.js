import { UpdateExpenseController } from './update-expense.js';

describe('UpdateExpenseController', () => {
    class UpdateExpenseUseCaseStub {
        async execute(expenseId, params) {
            return {
                id: expenseId,
                ...params,
            };
        }
    }

    const makeSut = () => {
        const updateExpenseUseCaseStub = new UpdateExpenseUseCaseStub();
        const sut = new UpdateExpenseController(updateExpenseUseCaseStub);

        return sut;
    };

    test('should return 200 and body when expense is updated with sucess', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                expenseId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
            body: {
                amount: 1000,
                description: 'Mechanic',
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(200);
        expect(result.body).not.toBe(null);
    });

    test('should return 400 when id is not valid', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                expenseId: 'invalid_id',
            },
            body: {
                amount: 1000,
                description: 'Mechanic',
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(400);
    });

    test('should return 400 when any field is not valid', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                expenseId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
            body: {
                car_id: 'invalid_id',
                amount: 1000,
                description: 'Mechanic',
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(400);
    });

    test('should return 400 when unnalowed field is passed', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                expenseId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
            body: {
                amount: 1000,
                description: 'Mechanic',
                inavlid_field: 'invalid_field',
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(400);
    });

    test('should return 500 when execute throws an error', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                expenseId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
            body: {
                amount: 1000,
                description: 'Mechanic',
            },
        };

        import.meta.jest
            .spyOn(sut.updateExpenseUseCase, 'execute')
            .mockImplementationOnce(() => {
                throw new Error();
            });

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(500);
    });

    test('should call UpdateExpenseUseCase with correct params', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                expenseId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
            body: {
                amount: 1000,
                description: 'Mechanic',
            },
        };

        const executeSpy = import.meta.jest.spyOn(
            sut.updateExpenseUseCase,
            'execute'
        );

        await sut.execute(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith(
            httpRequest.params.expenseId,
            httpRequest.body
        );
    });
});
