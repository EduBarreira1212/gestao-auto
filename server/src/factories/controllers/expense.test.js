import { CreateExpenseController } from '../../controllers/expense/create-expense.js';
import { DeleteExpenseController } from '../../controllers/expense/delete-expense.js';
import { GetExpenseByIdController } from '../../controllers/expense/get-expense-by-id.js';
import { GetExpensesByCarIdController } from '../../controllers/expense/get-expenses-by-car-id.js';
import { UpdateExpenseController } from '../../controllers/expense/update-expense.js';
import {
    makeCreateExpenseController,
    makeDeleteExpenseController,
    makeGetExpenseByIdController,
    makeGetExpensesByCarIdController,
    makeUpdateExpenseController,
} from './expense.js';

describe('makeExpenseControllers factories', () => {
    test('makeCreateExpenseController', () => {
        expect(makeCreateExpenseController()).toBeInstanceOf(
            CreateExpenseController
        );
    });
    test('makeDeleteExpenseController', () => {
        expect(makeDeleteExpenseController()).toBeInstanceOf(
            DeleteExpenseController
        );
    });
    test('makeGeeExpenseByIdController', () => {
        expect(makeGetExpenseByIdController()).toBeInstanceOf(
            GetExpenseByIdController
        );
    });
    test('makeGeeExpensesByCarIdController', () => {
        expect(makeGetExpensesByCarIdController()).toBeInstanceOf(
            GetExpensesByCarIdController
        );
    });
    test('makeUpdateExpenseController', () => {
        expect(makeUpdateExpenseController()).toBeInstanceOf(
            UpdateExpenseController
        );
    });
});
