import { DeleteCarController } from './delete-car.js';

describe('DeleteCarController', () => {
    class DeleteCarUseCaseStub {
        async execute(carId) {
            const car = {
                user_id: carId,
                brand: 'Ferrari',
                name: '488',
                year: 2018,
                plate: 'FFF0F00',
                km: 20000,
                entry_price: 2500000,
            };
            return car;
        }
    }

    const makeSut = () => {
        const deleteCarUseCase = new DeleteCarUseCaseStub();
        const sut = new DeleteCarController(deleteCarUseCase);

        return sut;
    };

    test('return 200 if car deleted sucessfully', async () => {
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

    test('return 404 if id is not valid', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                carId: 'INVALID_ID',
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(400);
        expect(result.body.message).toBe('ID invalid');
    });

    test('return 500 if execute throws an error', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                carId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
        };

        import.meta.jest
            .spyOn(sut.deleteCarUseCase, 'execute')
            .mockImplementationOnce(() => {
                throw new Error();
            });

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(500);
    });

    test('should call DeleteCarUseCase with correct params', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                carId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
        };

        const executeSpy = import.meta.jest.spyOn(sut.deleteCarUseCase, 'execute');

        await sut.execute(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith(httpRequest.params.carId);
    });
});
