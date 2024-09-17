import { CreateSellController } from '../../controllers/sell/create-sell.js';
import { DeleteSellController } from '../../controllers/sell/delete-sell.js';
import { GetSellByIdController } from '../../controllers/sell/get-sell-by-id.js';
import { GetSellsByUserIdController } from '../../controllers/sell/get-sells-by-user-id.js';
import { UpdateSellController } from '../../controllers/sell/update-sell.js';
import {
    makeCreateSellController,
    makeDeleteSellController,
    makeGetSellByIdController,
    makeGetSellsByUserIdController,
    makeUpdateSellController,
} from './sell.js';

describe('makeCarControllers factories', () => {
    test('makeCreateSellController', () => {
        expect(makeCreateSellController()).toBeInstanceOf(CreateSellController);
    });
    test('makeDeleteSellController', () => {
        expect(makeDeleteSellController()).toBeInstanceOf(DeleteSellController);
    });
    test('makeGetSellByIdController', () => {
        expect(makeGetSellByIdController()).toBeInstanceOf(GetSellByIdController);
    });
    test('makeGetSellsByUserIdController', () => {
        expect(makeGetSellsByUserIdController()).toBeInstanceOf(
            GetSellsByUserIdController
        );
    });
    test('makeUpdateSellController', () => {
        expect(makeUpdateSellController()).toBeInstanceOf(UpdateSellController);
    });
});
