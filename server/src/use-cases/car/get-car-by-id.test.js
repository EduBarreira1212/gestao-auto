import { GetCarByIdUseCase } from './get-car-by-id.js';
import { carFixture as car } from '../../tests/fixtures/car.js';

describe('GetCarByIdUseCase', () => {
    class PostgresGetCarByIdRepositorieStub {
        async execute(CarId) {
            const carToReturn = {
                ...car,
                id: CarId,
            };
            return carToReturn;
        }
    }

    const makeSut = () => {
        const postgresGetCarByIdRepositoryStub =
            new PostgresGetCarByIdRepositorieStub();

        const sut = new GetCarByIdUseCase(postgresGetCarByIdRepositoryStub);

        return sut;
    };

    test('should get car sucessfully', async () => {
        const sut = makeSut();

        const result = await sut.execute(car.id);

        expect(result).toStrictEqual(car);
    });

    test('should return falsy if car do not exists', async () => {
        const sut = makeSut();

        import.meta.jest
            .spyOn(sut.postgresGetCarByIdRepository, 'execute')
            .mockImplementationOnce(() => {
                return null;
            });

        const result = await sut.execute(car.id);

        expect(result).toBeFalsy();
    });

    test('should ensure PostgresGetCarById is called', async () => {
        const sut = makeSut();

        const getCarByIdRepository = import.meta.jest.spyOn(
            sut.postgresGetCarByIdRepository,
            'execute'
        );

        await sut.execute(car.id);

        expect(getCarByIdRepository).toHaveBeenCalled();
        expect(getCarByIdRepository).toHaveBeenCalledWith(car.id);
    });

    test('should throw if postgresDeleteCarRepositorie throws', async () => {
        const sut = makeSut();

        import.meta.jest
            .spyOn(sut.postgresGetCarByIdRepository, 'execute')
            .mockImplementationOnce(() => {
                throw new Error();
            });

        const promise = sut.execute(car.id);

        await expect(promise).rejects.toThrow();
    });
});
