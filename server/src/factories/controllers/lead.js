import { IdGeneratorAdapter } from '../../adapters/id-generator.js';
import { PostgresGetUserById } from '../../respositories/postgres/user/get-user-by-id.js';
import { PostgresCreateLeadRepository } from '../../respositories/postgres/lead/create-lead.js';
import { PostgresDeleteLeadRepository } from '../../respositories/postgres/lead/delete-lead.js';
import { PostgresGetLeadByEmailRepository } from '../../respositories/postgres/lead/get-lead-by-email.js';
import { PostgresGetLeadByIdRepository } from '../../respositories/postgres/lead/get-lead-by-id.js';
import { PostgresGetLeadByPhoneRepository } from '../../respositories/postgres/lead/get-lead-by-phone.js';
import { PostgresGetLeadsByUserIdRepository } from '../../respositories/postgres/lead/get-leads-by-user-id.js';
import { PostgresUpdateLeadRepository } from '../../respositories/postgres/lead/update-lead.js';
import { CreateLeadUseCase } from '../../use-cases/lead/create-lead.js';
import { GetLeadByIdUseCase } from '../../use-cases/lead/get-lead-by-id.js';
import { GetLeadsByUserIdUseCase } from '../../use-cases/lead/get-leads-by-user-id.js';
import { DeleteLeadUseCase } from '../../use-cases/lead/delete-lead.js';
import { UpdateLeadUseCase } from '../../use-cases/lead/update-lead.js';
import { CreateLeadController } from '../../controllers/lead/create-lead.js';
import { DeleteLeadController } from '../../controllers/lead/delete-lead.js';
import { GetLeadByIdController } from '../../controllers/lead/get-lead-by-id.js';
import { GetLeadsByUserIdController } from '../../controllers/lead/get-leads-by-user-id.js';
import { UpdateLeadController } from '../../controllers/lead/update-lead.js';

export const makeCreateLeadController = () => {
    const postgresGetUserByIdRepository = new PostgresGetUserById();
    const postgresGetLeadByEmailRepository = new PostgresGetLeadByEmailRepository();
    const postgresGetLeadByPhoneRepository = new PostgresGetLeadByPhoneRepository();
    const idGeneratorAdapter = new IdGeneratorAdapter();
    const postgresCreateLeadRepository = new PostgresCreateLeadRepository();

    const createLeadUseCase = new CreateLeadUseCase(
        postgresGetUserByIdRepository,
        postgresGetLeadByEmailRepository,
        postgresGetLeadByPhoneRepository,
        idGeneratorAdapter,
        postgresCreateLeadRepository
    );

    const createLeadController = new CreateLeadController(createLeadUseCase);

    return createLeadController;
};

export const makeGetLeadByIdController = () => {
    const postgresGetLeadByIdRepository = new PostgresGetLeadByIdRepository();

    const getLeadByIdUseCase = new GetLeadByIdUseCase(postgresGetLeadByIdRepository);

    const getLeadByIdController = new GetLeadByIdController(getLeadByIdUseCase);

    return getLeadByIdController;
};

export const makeGetLeadsByUserIdController = () => {
    const postgresGetUserByIdRepository = new PostgresGetUserById();
    const postgresGetLeadsByUserIdRepository =
        new PostgresGetLeadsByUserIdRepository();

    const getLeadsByUserIdUseCase = new GetLeadsByUserIdUseCase(
        postgresGetUserByIdRepository,
        postgresGetLeadsByUserIdRepository
    );

    const getLeadsByUserIdController = new GetLeadsByUserIdController(
        getLeadsByUserIdUseCase
    );

    return getLeadsByUserIdController;
};

export const makeUpdateLeadController = () => {
    const postgresGetLeadByIdRepository = new PostgresGetLeadByIdRepository();
    const postgresGetLeadByEmailRepository = new PostgresGetLeadByEmailRepository();
    const postgresGetLeadByPhoneRepository = new PostgresGetLeadByPhoneRepository();
    const postgresUpdateLeadRepository = new PostgresUpdateLeadRepository();

    const updateLeadUseCase = new UpdateLeadUseCase(
        postgresGetLeadByIdRepository,
        postgresGetLeadByEmailRepository,
        postgresGetLeadByPhoneRepository,
        postgresUpdateLeadRepository
    );

    const updateLeadController = new UpdateLeadController(updateLeadUseCase);

    return updateLeadController;
};

export const makeDeleteLeadController = () => {
    const postgresGetLeadByIdRepository = new PostgresGetLeadByIdRepository();
    const postgresDeleteLeadRepository = new PostgresDeleteLeadRepository();

    const deleteLeadUseCase = new DeleteLeadUseCase(
        postgresGetLeadByIdRepository,
        postgresDeleteLeadRepository
    );

    const deleteLeadController = new DeleteLeadController(deleteLeadUseCase);

    return deleteLeadController;
};
