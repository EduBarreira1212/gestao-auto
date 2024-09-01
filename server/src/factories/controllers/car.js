import { CreateCarController } from '../../controllers/car/create-car.js';
import { GetCarByIdController } from '../../controllers/car/get-car-by-id.js';
import { PostgresCreateCarRepository } from '../../respositories/postgres/car/create-car.js';
import { PostgresGetCarByIdRepository } from '../../respositories/postgres/car/get-car-by-id.js';
import { PostgresGetUserById } from '../../respositories/postgres/user/get-user-by-id.js';
import { CreateCarUseCase } from '../../use-cases/car/create-car.js';
import { GetCarByIdUseCase } from '../../use-cases/car/get-car-by-id.js';

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
