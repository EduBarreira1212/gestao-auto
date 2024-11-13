import { validate } from 'uuid';
import { ZodError } from 'zod';
import { updateUserSchema } from '../../schemas/user.js';
import { EmailAlreadyInUse } from '../../errors/user.js';

export class UpdateUserController {
    constructor(updateUserUseCase) {
        this.updateUserUseCase = updateUserUseCase;
    }
    async execute(httpRequest) {
        try {
            const isIdValid = validate(httpRequest.params.userId);

            if (!isIdValid) {
                return { statusCode: 404, body: { message: 'ID invalid' } };
            }

            const params = httpRequest.body;

            await updateUserSchema.parseAsync(params);

            const userId = httpRequest.params.userId;

            const updatedUser = await this.updateUserUseCase.execute(userId, params);

            return { statusCode: 200, body: updatedUser };
        } catch (error) {
            console.log(error);
            if (error instanceof ZodError) {
                return {
                    statusCode: 400,
                    body: { message: error.errors[0].message },
                };
            }
            if (error instanceof EmailAlreadyInUse) {
                return {
                    statusCode: 400,
                    body: { message: error.message },
                };
            }
            return { statusCode: 500, body: error };
        }
    }
}
