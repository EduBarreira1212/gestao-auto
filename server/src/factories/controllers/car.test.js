import { CreateCarController } from '../../controllers/car/create-car.js';
import { DeleteCarController } from '../../controllers/car/delete-car.js';
import { GetCarByIdController } from '../../controllers/car/get-car-by-id.js';
import { GetCarsByUserIdController } from '../../controllers/car/get-cars-by-user-id.js';
import { UpdateCarController } from '../../controllers/car/update-car.js';
import {
    makeCreateCarController,
    makeDeleteCarController,
    makeGetCarByIdController,
    makeGetCarsByUserIdController,
    makeUpdateCarController,
} from './car.js';

describe('makeCarControllers factories', () => {
    test('makeCreateCarController', () => {
        expect(makeCreateCarController()).toBeInstanceOf(CreateCarController);
    });
    test('makeUpdateCarController', () => {
        expect(makeUpdateCarController()).toBeInstanceOf(UpdateCarController);
    });
    test('makeGetCarByIdController', () => {
        expect(makeGetCarByIdController()).toBeInstanceOf(GetCarByIdController);
    });
    test('makeGetCarsByUserIdController', () => {
        expect(makeGetCarsByUserIdController()).toBeInstanceOf(
            GetCarsByUserIdController
        );
    });
    test('makeDeleteCarController', () => {
        expect(makeDeleteCarController()).toBeInstanceOf(DeleteCarController);
    });
});
