import { Router } from 'express';

import {
    makeCreateExpenseController,
    makeDeleteExpenseController,
    makeGetExpenseByIdController,
    makeGetExpensesByCarIdController,
    makeUpdateExpenseController,
} from '../factories/controllers/expense.js';

export const expensesRouter = Router();

expensesRouter.get('/:expenseId', async (req, res) => {
    const getExpenseByIdController = makeGetExpenseByIdController();

    const { statusCode, body } = await getExpenseByIdController.execute(req);

    res.status(statusCode).send(body);
});

expensesRouter.get('/', async (req, res) => {
    const getExpensesByCarIdController = makeGetExpensesByCarIdController();

    const { statusCode, body } = await getExpensesByCarIdController.execute(req);

    res.status(statusCode).send(body);
});

expensesRouter.post('/', async (req, res) => {
    const createExpenseController = makeCreateExpenseController();

    const { statusCode, body } = await createExpenseController.execute(req);

    res.status(statusCode).send(body);
});

expensesRouter.patch('/:expenseId', async (req, res) => {
    const updateExpenseController = makeUpdateExpenseController();

    const { statusCode, body } = await updateExpenseController.execute(req);

    res.status(statusCode).send(body);
});

expensesRouter.delete('/:expenseId', async (req, res) => {
    const deleteExpenseController = makeDeleteExpenseController();

    const { statusCode, body } = await deleteExpenseController.execute(req);

    res.status(statusCode).send(body);
});
