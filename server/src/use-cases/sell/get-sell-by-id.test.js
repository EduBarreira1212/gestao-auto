import { GetSellByIdUseCase } from './get-sell-by-id.js';
import { sellFixture as sell } from '../../tests/fixtures/sell.js';

describe('GetSellByIdUseCase', () => {
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

        import.meta.jest
            .spyOn(sut.postgresGetSellByIdRepository, 'execute')
            .mockImplementationOnce(() => {
                return null;
            });

        const result = await sut.execute(sell.id);

        expect(result).toBeFalsy();
    });

    test('should ensure PostgresGetSellByIdRepository is called', async () => {
        const sut = makeSut();

        const getCarByIdRepository = import.meta.jest.spyOn(
            sut.postgresGetSellByIdRepository,
            'execute'
        );

        await sut.execute(sell.id);

        expect(getCarByIdRepository).toHaveBeenCalled();
        expect(getCarByIdRepository).toHaveBeenCalledWith(sell.id);
    });

    test('should throw if PostgresGetSellByIdRepository throws', async () => {
        const sut = makeSut();

        import.meta.jest
            .spyOn(sut.postgresGetSellByIdRepository, 'execute')
            .mockImplementationOnce(() => {
                throw new Error();
            });

        const promise = sut.execute(sell.id);

        await expect(promise).rejects.toThrow();
    });
});
