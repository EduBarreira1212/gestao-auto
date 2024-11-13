import { validate } from 'uuid';
import { UserNotFound } from '../../errors/user.js';

export class DeleteUserController {
    constructor(deleteUserUseCase) {
        this.deleteUserUseCase = deleteUserUseCase;
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;

            const isIdValid = validate(userId);

            if (!isIdValid) {
                return { statusCode: 404, body: { message: 'ID invalid' } };
            }

            const deletedUser = await this.deleteUserUseCase.execute(userId);

            return { statusCode: 200, body: deletedUser };
        } catch (error) {
            console.log(error);
            if (error instanceof UserNotFound) {
                return {
                    statusCode: 404,
                    body: { message: error.message },
                };
            }
            return { statusCode: 500, body: error };
        }
    }
}
