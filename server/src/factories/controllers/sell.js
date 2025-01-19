import { IdGeneratorAdapter } from '../../adapters/id-generator.js';
import { CreateSellController } from '../../controllers/sell/create-sell.js';
import { DeleteSellController } from '../../controllers/sell/delete-sell.js';
import { GetSellByIdController } from '../../controllers/sell/get-sell-by-id.js';
import { GetSellsByUserIdController } from '../../controllers/sell/get-sells-by-user-id.js';
import { UpdateSellController } from '../../controllers/sell/update-sell.js';
import { PostgresGetCarByIdRepository } from '../../repositories/postgres/car/get-car-by-id.js';
import { PostgresCreateSellRepository } from '../../repositories/postgres/sell/create-sell.js';
import { PostgresDeleteSellRepository } from '../../repositories/postgres/sell/delete-sell.js';
import { PostgresGetSellByIdRepository } from '../../repositories/postgres/sell/get-sell-by-id.js';
import { PostgresGetSellsByUserIddRepository } from '../../repositories/postgres/sell/get-sells-by-user-id.js';
import { PostgresUpdateSellRepository } from '../../repositories/postgres/sell/update-sell.js';
import { PostgresGetUserById } from '../../repositories/postgres/user/get-user-by-id.js';
import { CreateSellUseCase } from '../../use-cases/sell/create-sell.js';
import { DeleteSellUseCase } from '../../use-cases/sell/delete-sell.js';
import { GetSellByIdUseCase } from '../../use-cases/sell/get-sell-by-id.js';
import { GetSellsByUserIdUseCase } from '../../use-cases/sell/get-sells-by-user-id.js';
import { UpdateSellUseCase } from '../../use-cases/sell/update-sell.js';

export const makeCreateSellController = () => {
    const postgresGetUserByIdRepository = new PostgresGetUserById();
    const postgresGetCarByIdRepository = new PostgresGetCarByIdRepository();
    const postgresCreateSellRepository = new PostgresCreateSellRepository();
    const idGeneratorAdapter = new IdGeneratorAdapter();

    const createSellUseCase = new CreateSellUseCase(
        postgresGetUserByIdRepository,
        postgresGetCarByIdRepository,
        postgresCreateSellRepository,
        idGeneratorAdapter
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

export const makeGetSellsByUserIdController = () => {
    const postgresGetUserByIdRepository = new PostgresGetUserById();
    const postgresGetSellsByUserIdRepository =
        new PostgresGetSellsByUserIddRepository();

    const getSellsByUserIdUseCase = new GetSellsByUserIdUseCase(
        postgresGetUserByIdRepository,
        postgresGetSellsByUserIdRepository
    );

    const getSellsByUserIdController = new GetSellsByUserIdController(
        getSellsByUserIdUseCase
    );

    return getSellsByUserIdController;
};

export const makeUpdateSellController = () => {
    const postgresGetSellByIdRepository = new PostgresGetSellByIdRepository();
    const postgresUpdateSellRepository = new PostgresUpdateSellRepository();

    const updateSellUseCase = new UpdateSellUseCase(
        postgresGetSellByIdRepository,
        postgresUpdateSellRepository
    );

    const updateSellController = new UpdateSellController(updateSellUseCase);

    return updateSellController;
};

export const makeDeleteSellController = () => {
    const postgresGetSellByIdRepository = new PostgresGetSellByIdRepository();
    const postgresDeleteSellRepository = new PostgresDeleteSellRepository();

    const deleteSellUseCase = new DeleteSellUseCase(
        postgresGetSellByIdRepository,
        postgresDeleteSellRepository
    );

    const deleteSellController = new DeleteSellController(deleteSellUseCase);

    return deleteSellController;
};
