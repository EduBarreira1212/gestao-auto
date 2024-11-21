import { ZodError } from 'zod';
import { createCarSchema } from '../../schemas/car.js';

export class CreateCarController {
    constructor(createCarUseCase) {
        this.createCarUseCase = createCarUseCase;
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            await createCarSchema.parseAsync(params);

            console.log(params);

            const createdCar = await this.createCarUseCase.execute(params);

            return { statusCode: 201, body: createdCar };
        } catch (error) {
            console.error(error);
            if (error instanceof ZodError) {
                return {
                    statusCode: 400,
                    body: { message: error.errors[0].message },
                };
            }
            return { statusCode: 404, body: error };
        }
    }
}
