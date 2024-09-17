import { CreateUserController } from '../../controllers/user/create-user.js';
import { UpdateUserController } from '../../controllers/user/update-user.js';
import { GetUserByIdCrontroller } from '../../controllers/user/get-user-by-id.js';
import { DeleteUserController } from '../../controllers/user/delete-user.js';
import {
    makeCreateUserController,
    makeDeleteUserController,
    makeGetUserByIdController,
    makeUpdateUserController,
} from './user.js';

describe('makeUserControllers factories', () => {
    test('makeCreateUserController', () => {
        expect(makeCreateUserController()).toBeInstanceOf(CreateUserController);
    });
    test('makeUpdateUserController', () => {
        expect(makeUpdateUserController()).toBeInstanceOf(UpdateUserController);
    });
    test('makeGetUserByIdController', () => {
        expect(makeGetUserByIdController()).toBeInstanceOf(GetUserByIdCrontroller);
    });
    test('makeDeleteUserController', () => {
        expect(makeDeleteUserController()).toBeInstanceOf(DeleteUserController);
    });
});
