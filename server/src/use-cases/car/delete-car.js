export class DeleteCarUseCase {
    constructor(postgresGetCarByIdRepository, postgresDeleteCarRepository) {
        this.postgresGetCarByIdRepository = postgresGetCarByIdRepository;
        this.postgresDeleteCarRepository = postgresDeleteCarRepository;
    }
    async execute(carId) {
        const carExists = await this.postgresGetCarByIdRepository.execute(carId);

        if (!carExists) {
            throw new Error('Car do not exists');
        }

        const deletedCar = await this.postgresDeleteCarRepository.execute(carId);

        return deletedCar;
    }
}
