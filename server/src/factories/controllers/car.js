import { CreateCarController } from '../../controllers/car/create-car.js';
import { PostgresCreateCarRepository } from '../../respositories/postgres/car/create-car.js';
import { PostgresGetUserById } from '../../respositories/postgres/user/get-user-by-id.js';
import { CreateCarUseCase } from '../../use-cases/car/create-car.js';

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
