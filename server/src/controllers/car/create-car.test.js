import { CreateCarController } from './create-car.js';

describe('CreateCarController', () => {
    class CreateCarUseCaseStub {
        execute(car) {
            return car;
        }
    }

    const makeSut = () => {
        const createCarUseCase = new CreateCarUseCaseStub();
        const sut = new CreateCarController(createCarUseCase);

        return sut;
    };

    test('should return 201 and body when car is created with sucess', async () => {
        const sut = makeSut();

        const httpRequest = {
            body: {
                user_id: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
                brand: 'Ferrari',
                name: '488',
                year: 2018,
                plate: 'FFF0F00',
                km: 20000,
                entry_price: 2500000,
            },
            files: [],
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(201);
        expect(result.body).toStrictEqual({ ...httpRequest.body, photos: [] });
    });

    test('should return 400 when httpRequest send invalid body', async () => {
        const sut = makeSut();

        const httpRequest = {
            body: {
                invalid_field: 'invalid_field',
            },
        };

        const result = await sut.execute(httpRequest);

        expect(result.statusCode).toBe(400);
    });

    test('should return 404 when execute throw an error', async () => {
        const sut = makeSut();

        const httpRequest = {
            body: {
                user_id: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
                brand: 'Ferrari',
                name: '488',
                year: 2018,
                plate: 'FFF0F00',
                km: 20000,
                entry_price: 2500000,
            },
            files: [],
        };

        import.meta.jest
            .spyOn(sut.createCarUseCase, 'execute')
            .mockImplementationOnce(() => {
                throw new Error();
            });

        const result = await sut.execute(httpRequest);
        expect(result.statusCode).toBe(404);
    });

    test('should call CreateCarUseCase with correct params', async () => {
        const sut = makeSut();

        const httpRequest = {
            body: {
                user_id: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
                brand: 'Ferrari',
                name: '488',
                year: 2018,
                plate: 'FFF0F00',
                km: 20000,
                entry_price: 2500000,
            },
            files: [],
        };

        const executeSpy = import.meta.jest.spyOn(sut.createCarUseCase, 'execute');

        await sut.execute(httpRequest);

        expect(executeSpy).toHaveBeenCalledWith({ ...httpRequest.body, photos: [] });
    });
});
