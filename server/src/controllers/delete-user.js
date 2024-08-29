import { validate } from 'uuid';
import { DeleteUSerUseCase } from '../use-cases/delete-user.js';

export class DeleteUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;

            const isIdValid = validate(userId);

            if (!isIdValid) {
                return { statusCode: 404, body: { message: 'ID invalid' } };
            }

            const deleteUserController = new DeleteUSerUseCase();

            const deletedUser = await deleteUserController.execute(userId);

            return { statusCode: 200, body: deletedUser };
        } catch (error) {
            console.log(error);
            return { statusCode: 500, body: error };
        }
    }
}
