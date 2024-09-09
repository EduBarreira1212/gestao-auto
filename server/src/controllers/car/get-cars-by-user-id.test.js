import { GetCarsByUserIdController } from './get-cars-by-user-id.js';

describe('GetCarsByUserIdController', () => {
    class GetCarsByUserIdUseCase {
        async execute(carId) {
            const car = {
                user_id: carId,
                brand: 'Ferrari',
                name: '488',
                year: 2018,
                plate: 'FFF0F00',
                entry_price: 2500000,
            };
            return [car];
        }
    }

    const makeSut = () => {
        const getCarsByUserIdUseCase = new GetCarsByUserIdUseCase();
        const sut = new GetCarsByUserIdController(getCarsByUserIdUseCase);

        return sut;
    };

    test('should return 200 when cars is found', async () => {
        const sut = makeSut();

        const httpRequest = {
            query: {
                userId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
        };

        const result = await sut.execute(httpRequest);

        console.log(result);

        expect(result.statusCode).toBe(200);
    });

    test('should return 400 when id is not valid', async () => {
        const sut = makeSut();

        const httpRequest = {
            query: {
                userId: 'invalid_id',
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(400);
    });

    test('should return 400 when id is not provided', async () => {
        const sut = makeSut();

        const httpRequest = {
            query: {
                userId: null,
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(400);
        expect(result.body.message).toBe('User ID not provided');
    });

    test('should return 500 when execute throws an error', async () => {
        const sut = makeSut();

        const httpRequest = {
            query: {
                userId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
        };

        jest.spyOn(sut.getCarsByUserIdUseCase, 'execute').mockImplementationOnce(
            () => {
                throw new Error();
            }
        );

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(500);
    });
});
