import { validate } from 'uuid';
import { ZodError } from 'zod';
import { updateCarSchema } from '../../schemas/car.js';

export class UpdateCarController {
    constructor(updateCarUseCase) {
        this.updateCarUseCase = updateCarUseCase;
    }
    async execute(httpRequest) {
        try {
            const carId = httpRequest.params.carId;

            const isIdValid = validate(carId);

            if (!isIdValid) {
                return { statusCode: 404, body: { message: 'ID invalid' } };
            }

            const params = httpRequest.body;

            await updateCarSchema.parseAsync(params);

            const updatedCar = await this.updateCarUseCase.execute(carId, params);

            return { statusCode: 200, body: updatedCar };
        } catch (error) {
            console.error(error);
            if (error instanceof ZodError) {
                return {
                    statusCode: 400,
                    body: { message: error.errors[0].message },
                };
            }
            return { statusCode: 500, body: { error } };
        }
    }
}
