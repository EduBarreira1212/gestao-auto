import { UpdateCarController } from './update-car.js';

describe('UpdateCarController', () => {
    class UpdateCarUseCaseStub {
        async execute(carId, params) {
            return {
                id: carId,
                ...params,
            };
        }
    }

    const makeSut = () => {
        const updateCarUseCase = new UpdateCarUseCaseStub();
        const sut = new UpdateCarController(updateCarUseCase);

        return sut;
    };

    test('should return 200 and body when car is updated with sucess', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                carId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
            body: {
                user_id: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
                brand: 'Ferrari',
                name: '488',
                year: 2018,
                plate: 'FFF0F00',
                entry_price: 2500000,
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(200);
        expect(result.body).not.toBe(null);
    });

    test('should return 404 when id is not valid', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                carId: 'invalid_id',
            },
            body: {
                user_id: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
                brand: 'Ferrari',
                name: '488',
                year: 2018,
                plate: 'FFF0F00',
                entry_price: 2500000,
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(404);
    });

    test('should return 400 when any field is not valid', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                carId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
            body: {
                user_id: 'invalid_id',
                brand: 'Ferrari',
                name: '488',
                year: 2018,
                plate: 'FFF0F00',
                entry_price: 2500000,
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(400);
    });

    test('should return 400 when unnalowed field is passed', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                carId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
            body: {
                user_id: 'invalid_id',
                brand: 'Ferrari',
                name: '488',
                year: 2018,
                plate: 'FFF0F00',
                entry_price: 2500000,
                inavlid_field: 'invalid_field',
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(400);
    });

    test('should return 500 when execute throws an error', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                carId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
            body: {
                user_id: '6000edd1-2b56-42f9-00b0-2f86ba234c41',
                brand: 'Ferrari',
                name: '488',
                year: 2018,
                plate: 'FFF0F00',
                entry_price: 2500000,
            },
        };

        jest.spyOn(sut.updateCarUseCase, 'execute').mockImplementationOnce(() => {
            throw new Error();
        });

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(500);
    });

    test('should call UpdateCarUseCase with correct params', async () => {
        const sut = makeSut();

        const httpRequest = {
            params: {
                carId: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
            },
            body: {
                user_id: '6000edd1-2b56-42f9-00b0-2f86ba234c41',
                brand: 'Ferrari',
                name: '488',
                year: 2018,
                plate: 'FFF0F00',
                entry_price: 2500000,
            },
        };

        const executeSpy = jest.spyOn(sut.updateCarUseCase, 'execute');

        await sut.execute(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith(
            httpRequest.params.carId,
            httpRequest.body
        );
    });
});
