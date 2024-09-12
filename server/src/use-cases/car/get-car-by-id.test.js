import { GetCarByIdUseCase } from './get-car-by-id.js';

describe('GetCarByIdUseCase', () => {
    const car = {
        id: '1234edd1-2b00-42f8-00b4-2f86ba114c99',
        user_id: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
        brand: 'Ferrari',
        name: '488',
        year: 2018,
        plate: 'FFF0F00',
        entry_price: 2500000,
    };

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

        jest.spyOn(
            sut.postgresGetCarByIdRepository,
            'execute'
        ).mockImplementationOnce(() => {
            return null;
        });

        const result = await sut.execute(car.id);

        expect(result).toBeFalsy();
    });

    test('should ensure PostgresGetCarById is called', async () => {
        const sut = makeSut();

        const getCarByIdRepository = jest.spyOn(
            sut.postgresGetCarByIdRepository,
            'execute'
        );

        await sut.execute(car.id);

        expect(getCarByIdRepository).toHaveBeenCalled();
        expect(getCarByIdRepository).toHaveBeenCalledWith(car.id);
    });

    test('should throw if postgresDeleteCarRepositorie throws', async () => {
        const sut = makeSut();

        jest.spyOn(
            sut.postgresGetCarByIdRepository,
            'execute'
        ).mockImplementationOnce(() => {
            throw new Error();
        });

        const promise = sut.execute(car.id);

        await expect(promise).rejects.toThrow();
    });
});
