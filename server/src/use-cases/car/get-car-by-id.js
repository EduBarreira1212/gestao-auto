export class GetCarByIdUseCase {
    constructor(postgresGetCarByIdRepository) {
        this.postgresGetCarByIdRepository = postgresGetCarByIdRepository;
    }
    async execute(carId) {
        const car = await this.postgresGetCarByIdRepository.execute(carId);

        return car;
    }
}
