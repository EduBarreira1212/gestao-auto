import { v4 as uuidv4 } from 'uuid';

export class CreateSellUseCase {
    constructor(
        postgresGetUserByIdRepository,
        postgresGetCarByIdRepository,
        postgresCreateSellRepository
    ) {
        this.postgresGetUserByIdRepository = postgresGetUserByIdRepository;
        this.postgresGetCarByIdRepository = postgresGetCarByIdRepository;
        this.postgresCreateSellRepository = postgresCreateSellRepository;
    }
    async execute(createSellParams) {
        const userId = createSellParams.user_id;

        const userWithProvidedIdExists =
            await this.postgresGetUserByIdRepository.execute(userId);

        if (!userWithProvidedIdExists) {
            throw new Error('User with ID not found');
        }

        const carId = createSellParams.car_id;

        const carWithProvidedIdExists =
            await this.postgresGetCarByIdRepository.execute(carId);

        if (!carWithProvidedIdExists) {
            throw new Error('Car with ID not found');
        }

        const sellId = uuidv4();

        const sell = {
            ...createSellParams,
            id: sellId,
        };

        const createdSell = await this.postgresCreateSellRepository.execute(sell);

        return createdSell;
    }
}
