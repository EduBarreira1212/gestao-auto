import express from 'express';
import dotenv from 'dotenv';

import {
    makeCreateUserController,
    makeDeleteUserController,
    makeGetUserByIdController,
    makeUpdateUserController,
} from './factories/controllers/user.js';

import {
    makeCreateCarController,
    makeDeleteCarController,
    makeGetCarByIdController,
    makeGetCarsByUserIdController,
    makeUpdateCarController,
} from './factories/controllers/car.js';
import {
    makeCreateSellController,
    makeDeleteSellController,
    makeGetSellByIdController,
    makeGetSellsByUserIdController,
    makeUpdateSellController,
} from './factories/controllers/sell.js';

dotenv.config({ path: '.env' });

const app = express();

app.use(express.json());

app.get('/api/get-user/:userId', async (req, res) => {
    const getUserById = makeGetUserByIdController();

    const { statusCode, body } = await getUserById.execute(req);

    res.status(statusCode).send(body);
});

app.post('/api/create-user', async (req, res) => {
    const createUserController = makeCreateUserController();

    const { statusCode, body } = await createUserController.execute(req);

    res.status(statusCode).send(body);
});

app.patch('/api/update-user/:userId', async (req, res) => {
    const updateUserController = makeUpdateUserController();

    const { statusCode, body } = await updateUserController.execute(req);

    res.status(statusCode).send(body);
});

app.delete('/api/delete-user/:userId', async (req, res) => {
    const deleteUserController = makeDeleteUserController();

    const { statusCode, body } = await deleteUserController.execute(req);

    res.status(statusCode).send(body);
});

app.get('/api/get-car/:carId', async (req, res) => {
    const getCarByIdController = makeGetCarByIdController();

    const { statusCode, body } = await getCarByIdController.execute(req);

    res.status(statusCode).send(body);
});

app.get('/api/get-cars', async (req, res) => {
    const getCarsByUserIdController = makeGetCarsByUserIdController();

    const { statusCode, body } = await getCarsByUserIdController.execute(req);

    res.status(statusCode).send(body);
});

app.post('/api/create-car', async (req, res) => {
    const createCarController = makeCreateCarController();

    const { statusCode, body } = await createCarController.execute(req);

    res.status(statusCode).send(body);
});

app.patch('/api/update-car/:carId', async (req, res) => {
    const updateCarController = makeUpdateCarController();

    const { statusCode, body } = await updateCarController.execute(req);

    res.status(statusCode).send(body);
});

app.delete('/api/delete-car/:carId', async (req, res) => {
    const deleteCarController = makeDeleteCarController();

    const { statusCode, body } = await deleteCarController.execute(req);

    res.status(statusCode).send(body);
});

app.get('/api/get-sell/:sellId', async (req, res) => {
    const getSellByIdController = makeGetSellByIdController();

    const { statusCode, body } = await getSellByIdController.execute(req);

    res.status(statusCode).send(body);
});

app.get('/api/get-sells', async (req, res) => {
    const getSellsByUserIdController = makeGetSellsByUserIdController();

    const { statusCode, body } = await getSellsByUserIdController.execute(req);

    res.status(statusCode).send(body);
});

app.post('/api/create-sell', async (req, res) => {
    const createSellController = makeCreateSellController();

    const { statusCode, body } = await createSellController.execute(req);

    res.status(statusCode).send(body);
});

app.patch('/api/update-sell/:sellId', async (req, res) => {
    const updateSellController = makeUpdateSellController();

    const { statusCode, body } = await updateSellController.execute(req);

    res.status(statusCode).send(body);
});

app.delete('/api/delete-sell/:sellId', async (req, res) => {
    const deleteSellController = makeDeleteSellController();

    const { statusCode, body } = await deleteSellController.execute(req);

    res.status(statusCode).send(body);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
