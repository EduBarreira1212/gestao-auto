import { validate } from 'uuid';
import { UpdateUserUseCase } from '../use-cases/update-user.js';

export class UpdateUserController {
    async execute(httpRequest) {
        try {
            const isIdValid = validate(httpRequest.params.userId);

            if (!isIdValid) {
                return { statusCode: 404, body: { message: 'ID invalid' } };
            }

            const params = httpRequest.body;

            const allowedFields = ['name', 'email', 'password'];

            const someFieldIsNotAllowed = Object.keys(params).some(
                (field) => !allowedFields.includes(field)
            );

            if (someFieldIsNotAllowed) {
                return {
                    statusCode: 404,
                    body: { message: 'Some provided field is not allowed' },
                };
            }

            if (params.password) {
                const isPasswordValid = params.password >= 5;

                if (!isPasswordValid) {
                    return {
                        statusCode: 404,
                        body: { message: 'Password invalid' },
                    };
                }
            }

            const updateUserUseCase = new UpdateUserUseCase();

            const updatedUser = await updateUserUseCase.execute(
                httpRequest.params.userId,
                params
            );

            return { statusCode: 200, body: updatedUser };
        } catch (error) {
            console.log(error);
            return { statusCode: 500, body: error };
        }
    }
}