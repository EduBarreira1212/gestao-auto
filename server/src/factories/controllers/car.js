import { CreateCarController } from '../../controllers/car/create-car.js';
import { GetCarByIdController } from '../../controllers/car/get-car-by-id.js';
import { GetCarsByUserIdController } from '../../controllers/car/get-cars-by-user-id.js';
import { UpdateCarController } from '../../controllers/car/update-car.js';
import { PostgresCreateCarRepository } from '../../respositories/postgres/car/create-car.js';
import { PostgresGetCarByIdRepository } from '../../respositories/postgres/car/get-car-by-id.js';
import { PostgresGetCarsByUserIdRepository } from '../../respositories/postgres/car/get-cars-by-user-id.js';
import { PostgresUpdateCarRepository } from '../../respositories/postgres/car/update-car.js';
import { PostgresGetUserById } from '../../respositories/postgres/user/get-user-by-id.js';
import { CreateCarUseCase } from '../../use-cases/car/create-car.js';
import { GetCarByIdUseCase } from '../../use-cases/car/get-car-by-id.js';
import { GetCarsByUserIdUseCase } from '../../use-cases/car/get-cars-by-user-id.js';
import { UpdateCarUseCase } from '../../use-cases/car/update-car.js';

export const makeCreateCarController = () => {
    const postgresGetUserByIdRepository = new PostgresGetUserById();
    const postgresCreateCarRepository = new PostgresCreateCarRepository();

    const createCarUseCase = new CreateCarUseCase(
        postgresGetUserByIdRepository,
        postgresCreateCarRepository
    );

    const createCarController = new CreateCarController(createCarUseCase);

    return createCarController;
};

export const makeGetCarByIdController = () => {
    const postgresGetCarByIdRepository = new PostgresGetCarByIdRepository();

    const getCarByIdUseCase = new GetCarByIdUseCase(postgresGetCarByIdRepository);

    const getCarByIdController = new GetCarByIdController(getCarByIdUseCase);

    return getCarByIdController;
};

export const makeGetCarsByUserIdController = () => {
    const postgresGetCarsByUserIdRepository =
        new PostgresGetCarsByUserIdRepository();
    const postgresGetUserByIdRepository = new PostgresGetUserById();

    const getCarsByUserIdUseCase = new GetCarsByUserIdUseCase(
        postgresGetUserByIdRepository,
        postgresGetCarsByUserIdRepository
    );

    const getCarsByUserIdController = new GetCarsByUserIdController(
        getCarsByUserIdUseCase
    );

    return getCarsByUserIdController;
};

export const makeUpdateCarController = () => {
    const postgresGetCarByIdRepository = new PostgresGetCarByIdRepository();
    const postgresUpdateCarRepository = new PostgresUpdateCarRepository();

    const updateCarUseCase = new UpdateCarUseCase(
        postgresGetCarByIdRepository,
        postgresUpdateCarRepository
    );

    const updateCarController = new UpdateCarController(updateCarUseCase);

    return updateCarController;
};
