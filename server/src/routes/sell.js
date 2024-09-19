import { Router } from 'express';

import {
    makeCreateSellController,
    makeDeleteSellController,
    makeGetSellByIdController,
    makeGetSellsByUserIdController,
    makeUpdateSellController,
} from '../factories/controllers/sell.js';

export const sellsRouter = Router();

sellsRouter.get('/:sellId', async (req, res) => {
    const getSellByIdController = makeGetSellByIdController();

    const { statusCode, body } = await getSellByIdController.execute(req);

    res.status(statusCode).send(body);
});

sellsRouter.get('/', async (req, res) => {
    const getSellsByUserIdController = makeGetSellsByUserIdController();

    const { statusCode, body } = await getSellsByUserIdController.execute(req);

    res.status(statusCode).send(body);
});

sellsRouter.post('/', async (req, res) => {
    const createSellController = makeCreateSellController();

    const { statusCode, body } = await createSellController.execute(req);

    res.status(statusCode).send(body);
});

sellsRouter.patch('/:sellId', async (req, res) => {
    const updateSellController = makeUpdateSellController();

    const { statusCode, body } = await updateSellController.execute(req);

    res.status(statusCode).send(body);
});

sellsRouter.delete('/:sellId', async (req, res) => {
    const deleteSellController = makeDeleteSellController();

    const { statusCode, body } = await deleteSellController.execute(req);

    res.status(statusCode).send(body);
});
