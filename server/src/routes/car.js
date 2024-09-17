import { Router } from 'express';

import {
    makeCreateCarController,
    makeDeleteCarController,
    makeGetCarByIdController,
    makeGetCarsByUserIdController,
    makeUpdateCarController,
} from '../factories/controllers/car.js';

export const carsRouter = Router();

carsRouter.get('/:carId', async (req, res) => {
    const getCarByIdController = makeGetCarByIdController();

    const { statusCode, body } = await getCarByIdController.execute(req);

    res.status(statusCode).send(body);
});

carsRouter.get('/', async (req, res) => {
    const getCarsByUserIdController = makeGetCarsByUserIdController();

    const { statusCode, body } = await getCarsByUserIdController.execute(req);

    res.status(statusCode).send(body);
});

carsRouter.post('/', async (req, res) => {
    const createCarController = makeCreateCarController();

    const { statusCode, body } = await createCarController.execute(req);

    res.status(statusCode).send(body);
});

carsRouter.patch('/:carId', async (req, res) => {
    const updateCarController = makeUpdateCarController();

    const { statusCode, body } = await updateCarController.execute(req);

    res.status(statusCode).send(body);
});

carsRouter.delete('/:carId', async (req, res) => {
    const deleteCarController = makeDeleteCarController();

    const { statusCode, body } = await deleteCarController.execute(req);

    res.status(statusCode).send(body);
});
