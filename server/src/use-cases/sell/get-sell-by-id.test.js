import { GetSellByIdUseCase } from './get-sell-by-id.js';

describe('GetSellByIdUseCase', () => {
    const sell = {
        id: '1234edd1-2b00-42f8-00b4-2f86ba114c99',
        user_id: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
        car_id: '0124edd1-2b89-42f9-13b4-2f86ba234c41',
        amount: 100000,
        profit: 10500,
    };

    class PostgresGetSellByIdRepositorieStub {
        async execute(sellId) {
            const sellToReturn = {
                ...sell,
                id: sellId,
            };
            return sellToReturn;
        }
    }

    const makeSut = () => {
        const postgresSellCarByIdRepositoryStub =
            new PostgresGetSellByIdRepositorieStub();

        const sut = new GetSellByIdUseCase(postgresSellCarByIdRepositoryStub);

        return sut;
    };

    test('should get sell sucessfully', async () => {
        const sut = makeSut();

        const result = await sut.execute(sell.id);

        expect(result).toStrictEqual(sell);
    });

    test('should return falsy if sell do not exists', async () => {
        const sut = makeSut();

        jest.spyOn(
            sut.postgresGetSellByIdRepository,
            'execute'
        ).mockImplementationOnce(() => {
            return null;
        });

        const result = await sut.execute(sell.id);

        expect(result).toBeFalsy();
    });

    test('should ensure PostgresGetSellByIdRepository is called', async () => {
        const sut = makeSut();

        const getCarByIdRepository = jest.spyOn(
            sut.postgresGetSellByIdRepository,
            'execute'
        );

        await sut.execute(sell.id);

        expect(getCarByIdRepository).toHaveBeenCalled();
        expect(getCarByIdRepository).toHaveBeenCalledWith(sell.id);
    });

    test('should throw if PostgresGetSellByIdRepository throws', async () => {
        const sut = makeSut();

        jest.spyOn(
            sut.postgresGetSellByIdRepository,
            'execute'
        ).mockImplementationOnce(() => {
            throw new Error();
        });

        const promise = sut.execute(sell.id);

        await expect(promise).rejects.toThrow();
    });
});