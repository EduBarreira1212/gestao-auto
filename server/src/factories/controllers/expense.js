import { PostgresGetCarByIdRepository } from '../../respositories/postgres/car/get-car-by-id.js';
import { IdGeneratorAdapter } from '../../adapters/id-generator.js';
import { PostgresCreateExpenseRepository } from '../../respositories/postgres/expense/create-expense.js';
import { PostgresGetExpenseByIdRepository } from '../../respositories/postgres/expense/get-expense-by-id.js';
import { PostgresGetExpensesByCarIdRepository } from '../../respositories/postgres/expense/get-expenses-by-car-id.js';
import { PostgresUpdateExpenseRepository } from '../../respositories/postgres/expense/update-expense.js';
import { PostgresDeleteExpenseRepository } from '../../respositories/postgres/expense/delete-expense.js';
import { CreateExpenseUseCase } from '../../use-cases/expense/create-expense.js';
import { GetExpenseByIdUseCase } from '../../use-cases/expense/get-expense-by-id.js';
import { GetExpensesByCarIdUseCase } from '../../use-cases/expense/get-expenses-by-car-id.js';
import { UpdateExpenseUseCase } from '../../use-cases/expense/update-expense.js';
import { DeleteExpenseUseCase } from '../../use-cases/expense/delete-expense.js';
import { CreateExpenseController } from '../../controllers/expense/create-expense.js';
import { GetExpenseByIdController } from '../../controllers/expense/get-expense-by-id.js';
import { GetExpensesByCarIdController } from '../../controllers/expense/get-expenses-by-car-id.js';
import { UpdateExpenseController } from '../../controllers/expense/update-expense.js';
import { DeleteExpenseController } from '../../controllers/expense/delete-expense.js';

export const makeCreateExpenseController = () => {
    const getCarByIdRepository = new PostgresGetCarByIdRepository();
    const idGeneratorAdapter = new IdGeneratorAdapter();
    const createExpenseRepository = new PostgresCreateExpenseRepository();

    const createExpenseUseCase = new CreateExpenseUseCase(
        getCarByIdRepository,
        idGeneratorAdapter,
        createExpenseRepository
    );

    const createExpenseController = new CreateExpenseController(
        createExpenseUseCase
    );

    return createExpenseController;
};

export const makeGetExpenseByIdController = () => {
    const getExpenseByIdRepository = new PostgresGetExpenseByIdRepository();

    const getExpenseByIdUseCase = new GetExpenseByIdUseCase(
        getExpenseByIdRepository
    );

    const getExpenseByIdController = new GetExpenseByIdController(
        getExpenseByIdUseCase
    );

    return getExpenseByIdController;
};

export const makeGetExpensesByCarIdController = () => {
    const getCarByIdRepository = new PostgresGetCarByIdRepository();
    const getExpensesByCarIdRepository = new PostgresGetExpensesByCarIdRepository();

    const getExpensesByCarIdUseCase = new GetExpensesByCarIdUseCase(
        getCarByIdRepository,
        getExpensesByCarIdRepository
    );

    const getExpensesByUserIdController = new GetExpensesByCarIdController(
        getExpensesByCarIdUseCase
    );

    return getExpensesByUserIdController;
};

export const makeUpdateExpenseController = () => {
    const getExpenseByIdRepository = new PostgresGetExpenseByIdRepository();
    const updateExpenseRepository = new PostgresUpdateExpenseRepository();

    const updateExpenseUseCase = new UpdateExpenseUseCase(
        getExpenseByIdRepository,
        updateExpenseRepository
    );

    const updateExpenseController = new UpdateExpenseController(
        updateExpenseUseCase
    );

    return updateExpenseController;
};

export const makeDeleteExpenseController = () => {
    const getExpenseByIdRepository = new PostgresGetExpenseByIdRepository();
    const deleteExpenseRepository = new PostgresDeleteExpenseRepository();

    const deleteExpenseUseCase = new DeleteExpenseUseCase(
        getExpenseByIdRepository,
        deleteExpenseRepository
    );

    const deleteExpenseController = new DeleteExpenseController(
        deleteExpenseUseCase
    );

    return deleteExpenseController;
};
