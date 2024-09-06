import { CreateSellController } from '../../controllers/sell/create-sell.js';
import { GetSellByIdController } from '../../controllers/sell/get-sell-by-id.js';
import { PostgresGetCarByIdRepository } from '../../respositories/postgres/car/get-car-by-id.js';
import { PostgresCreateSellRepository } from '../../respositories/postgres/sell/create-sell.js';
import { PostgresGetSellByIdRepository } from '../../respositories/postgres/sell/get-sell-by-id.js';
import { PostgresGetUserById } from '../../respositories/postgres/user/get-user-by-id.js';
import { CreateSellUseCase } from '../../use-cases/sell/create-sell.js';
import { GetSellByIdUseCase } from '../../use-cases/sell/get-sell-by-id.js';

export const makeCreateSellController = () => {
    const postgresGetUserByIdRepository = new PostgresGetUserById();
    const postgresGetCarByIdRepository = new PostgresGetCarByIdRepository();
    const postgresCreateSellRepository = new PostgresCreateSellRepository();

    const createSellUseCase = new CreateSellUseCase(
        postgresGetUserByIdRepository,
        postgresGetCarByIdRepository,
        postgresCreateSellRepository
    );

    const createSellController = new CreateSellController(createSellUseCase);

    return createSellController;
};

export const makeGetSellByIdController = () => {
    const postgresGetSellByIdRepository = new PostgresGetSellByIdRepository();

    const getSellByIdUseCase = new GetSellByIdUseCase(postgresGetSellByIdRepository);

    const getSellByIdController = new GetSellByIdController(getSellByIdUseCase);

    return getSellByIdController;
};
