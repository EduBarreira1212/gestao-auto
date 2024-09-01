import { validate } from 'uuid';

export class GetCarByIdController {
    constructor(getCarByIdUseCase) {
        this.getCarByIdUseCase = getCarByIdUseCase;
    }
    async execute(httpRequest) {
        try {
            const carId = httpRequest.params.carId;

            const isIdValid = validate(carId);

            if (!isIdValid) {
                return { statusCode: 400, body: { message: 'ID invalid' } };
            }

            const car = await this.getCarByIdUseCase.execute(carId);

            if (!car) {
                return { statusCode: 404, body: { message: 'Car not found' } };
            }

            return { statusCode: 200, body: car };
        } catch (error) {
            console.error(error);
            return { statusCode: 500, body: { message: 'Error' } };
        }
    }
}
