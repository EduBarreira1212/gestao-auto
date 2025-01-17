export class CreateCarUseCase {
    constructor(
        postgresGetUserByIdRepository,
        postgresCreateCarRepository,
        idGeneratorAdapter
    ) {
        this.postgresGetUserByIdRepository = postgresGetUserByIdRepository;
        this.postgresCreateCarRepository = postgresCreateCarRepository;
        this.idGeneratorAdapter = idGeneratorAdapter;
    }
    async execute(createCarParams) {
        const userId = createCarParams.user_id;

        const isIdValid = await this.postgresGetUserByIdRepository.execute(userId);

        if (!isIdValid) {
            throw new Error('User ID invalid');
        }

        const carId = this.idGeneratorAdapter.execute();

        const car = {
            ...createCarParams,
            id: carId,
        };

        const carCreated = await this.postgresCreateCarRepository.execute(car);

        return carCreated;
    }
}
