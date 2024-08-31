import { v4 as uuidv4 } from 'uuid';

export class CreateCarUseCase {
    constructor(postgresGetUserByIdRepository, postgresCreateCarRepository) {
        this.postgresGetUserByIdRepository = postgresGetUserByIdRepository;
        this.postgresCreateCarRepository = postgresCreateCarRepository;
    }
    async execute(createCarParams) {
        const userId = createCarParams.user_id;

        const isIdValid = this.postgresGetUserByIdRepository.execute(userId);

        if (!isIdValid) {
            throw new Error('User ID invalid');
        }

        const carId = uuidv4();

        const car = {
            ...createCarParams,
            id: carId,
            expenses: 0,
        };

        const carCreated = this.postgresCreateCarRepository.execute(car);

        return carCreated;
    }
}
