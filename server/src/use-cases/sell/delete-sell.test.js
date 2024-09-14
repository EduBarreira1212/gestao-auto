import { DeleteSellUseCase } from './delete-sell.js';
import { sellFixture as sell } from '../../tests/fixtures/sell.js';

describe('DeleteSellUseCase', () => {
    class PostgresGetSellByIdRepositoryStub {
        async execute(sellId) {
            const sellToReturn = {
                ...sell,
                id: sellId,
            };

            return sellToReturn;
        }
    }

    class PostgresDeleteSellRepositoryStub {
        async execute(sellId) {
            const sellToReturn = {
                ...sell,
                id: sellId,
            };

            return sellToReturn;
        }
    }

    const makeSut = () => {
        const postgresDeleteSellRepositoryStub =
            new PostgresDeleteSellRepositoryStub();

        const postgresGetSellByIdRepositoryStub =
            new PostgresGetSellByIdRepositoryStub();

        const sut = new DeleteSellUseCase(
            postgresGetSellByIdRepositoryStub,
            postgresDeleteSellRepositoryStub
        );

        return sut;
    };
    test('should delete sell sucessfully', async () => {
        const sut = makeSut();

        const result = await sut.execute(sell.id);

        expect(result).toStrictEqual(sell);
    });

    test('should throw a sell do not exists error', async () => {
        const sut = makeSut();

        jest.spyOn(
            sut.postgresGetSellByIdRepository,
            'execute'
        ).mockImplementationOnce(() => {
            return null;
        });

        const promise = sut.execute(sell.id);

        await expect(promise).rejects.toThrow(new Error('Sell do not exists'));
    });

    test('should ensure PostgresGetSellByIdRepository is called', async () => {
        const sut = makeSut();

        const getSellByIdRepository = jest.spyOn(
            sut.postgresGetSellByIdRepository,
            'execute'
        );

        await sut.execute(sell.id);

        expect(getSellByIdRepository).toHaveBeenCalled();
        expect(getSellByIdRepository).toHaveBeenCalledWith(sell.id);
    });

    test('should ensure PostgresDeleteSellrepository is called', async () => {
        const sut = makeSut();

        const deleteUserRepository = jest.spyOn(
            sut.postgresDeleteSellrepository,
            'execute'
        );

        await sut.execute(sell.id);

        expect(deleteUserRepository).toHaveBeenCalled();
        expect(deleteUserRepository).toHaveBeenCalledWith(sell.id);
    });

    test('should throw if PostgresDeleteSellrepository throws', async () => {
        const sut = makeSut();

        jest.spyOn(
            sut.postgresDeleteSellrepository,
            'execute'
        ).mockImplementationOnce(() => {
            throw new Error();
        });

        const promise = sut.execute(sell.id);

        await expect(promise).rejects.toThrow();
    });
});
