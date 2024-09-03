export class UpdateCarUseCase {
    constructor(postgresGetCarByIdRepository, postgresUpdateCarRepository) {
        this.postgresGetCarByIdRepository = postgresGetCarByIdRepository;
        this.postgresUpdateCarRepository = postgresUpdateCarRepository;
    }
    async execute(carId, updateCarParams) {
        const car = await this.postgresGetCarByIdRepository.execute(carId);

        if (!car) {
            throw new Error('Car do not exists');
        }

        const updatedCar = await this.postgresUpdateCarRepository.execute(
            carId,
            updateCarParams
        );

        return updatedCar;
    }
}
