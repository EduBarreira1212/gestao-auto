import { expenseFixture } from '../../tests/fixtures/expense.js';
import { CreateExpenseController } from './create-expense.js';

describe('CreateExpenseController', () => {
    class CreateExpenseUseCaseStub {
        execute(expense) {
            return expense;
        }
    }

    const makeSut = () => {
        const createExpenseUseCase = new CreateExpenseUseCaseStub();
        const sut = new CreateExpenseController(createExpenseUseCase);

        return sut;
    };

    test('should return 201 and body when expense is created with sucess', async () => {
        const sut = makeSut();

        const httpRequest = {
            body: {
                ...expenseFixture,
                id: undefined,
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(201);
        expect(result.body).toBe(httpRequest.body);
    });

    test('should return 400 when httpRequest send invalid body', async () => {
        const sut = makeSut();

        const httpRequest = {
            body: {
                invalid_field: 'invalid_field',
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(400);
    });

    test('should return 500 when execute throw an error', async () => {
        const sut = makeSut();

        const httpRequest = {
            body: {
                ...expenseFixture,
                id: undefined,
            },
        };

        import.meta.jest
            .spyOn(sut.createExpenseUseCase, 'execute')
            .mockImplementationOnce(() => {
                throw new Error();
            });

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(500);
    });

    test('should call CreateExpenseUseCase with correct params', async () => {
        const sut = makeSut();

        const httpRequest = {
            body: {
                ...expenseFixture,
                id: undefined,
            },
        };

        const executeSpy = import.meta.jest.spyOn(
            sut.createExpenseUseCase,
            'execute'
        );

        await sut.execute(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.body);
    });
});
