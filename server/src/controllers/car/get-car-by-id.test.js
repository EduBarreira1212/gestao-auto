import { GetCarByIdController } from './get-car-by-id.js';

describe('GetUserByIdController', () => {
    class GetCarByIdUseCaseStub {
        async execute(carId) {
            const car = {
                user_id: carId,
                brand: 'Ferrari',
                name: '488',
                year: 2018,
                plate: 'FFF0F00',
                entry_price: 2500000,
            };
            return car;
        }
    }

    const makeSut = () => {
        const getCarByIdUseCase = new GetCarByIdUseCaseStub();
        const sut = new GetCarByIdController(getCarByIdUseCase);

        return sut;
    };

    test('should return 200 when car is found', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                carId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(200);
        expect(result.body.id).toBe(httpRequest.params.userId);
    });

    test('should return 400 when id is not valid', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                carId: 'invalid_id',
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(400);
    });

    test('should return 404 when car is not found', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                carId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
        };

        import.meta.jest
            .spyOn(sut.getCarByIdUseCase, 'execute')
            .mockImplementationOnce(() => {
                return null;
            });

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(404);
        expect(result.body.message).toBe('Car not found');
    });

    test('should return 500 when execute throws an error', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                carId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
        };

        import.meta.jest
            .spyOn(sut.getCarByIdUseCase, 'execute')
            .mockImplementationOnce(() => {
                throw new Error();
            });

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(500);
    });

    test('should call GetCarByIdUseCase with correct params', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                carId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
        };

        const executeSpy = import.meta.jest.spyOn(sut.getCarByIdUseCase, 'execute');

        await sut.execute(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.params.carId);
    });
});
