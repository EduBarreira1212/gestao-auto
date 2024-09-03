import { validate } from 'uuid';

export class DeleteCarController {
    constructor(deleteCarUseCase) {
        this.deleteCarUseCase = deleteCarUseCase;
    }
    async execute(httpRequest) {
        try {
            const carId = httpRequest.params.carId;

            const isIdValid = validate(carId);

            if (!isIdValid) {
                return { statusCode: 400, body: { message: 'ID invalid' } };
            }

            const deletedCar = await this.deleteCarUseCase.execute(carId);

            return { statusCode: 200, body: deletedCar };
        } catch (error) {
            console.error(error);
            return { statusCode: 500, body: { error } };
        }
    }
}
