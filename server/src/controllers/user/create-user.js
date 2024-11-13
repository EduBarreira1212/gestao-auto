import { ZodError } from 'zod';
import { createUserSchema } from '../../schemas/user.js';
import { EmailAlreadyInUse } from '../../errors/user.js';

export class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            await createUserSchema.parseAsync(params);

            const user = await this.createUserUseCase.execute(params);

            return { statusCode: 201, body: user };
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
            return { statusCode: 404, body: error };
        }
    }
}
