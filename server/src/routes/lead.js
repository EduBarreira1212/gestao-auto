import { Router } from 'express';

import {
    makeCreateLeadController,
    makeDeleteLeadController,
    makeGetLeadByIdController,
    makeGetLeadsByUserIdController,
    makeUpdateLeadController,
} from '../factories/controllers/lead.js';

export const leadsRouter = Router();

leadsRouter.get('/:leadId', async (req, res) => {
    const getLeadByIdController = makeGetLeadByIdController();

    const { statusCode, body } = await getLeadByIdController.execute(req);

    res.status(statusCode).send(body);
});

leadsRouter.get('/', async (req, res) => {
    const getLeadsByUserIdController = makeGetLeadsByUserIdController();

    const { statusCode, body } = await getLeadsByUserIdController.execute(req);

    res.status(statusCode).send(body);
});

leadsRouter.post('/', async (req, res) => {
    const createLeadController = makeCreateLeadController();

    const { statusCode, body } = await createLeadController.execute(req);

    res.status(statusCode).send(body);
});

leadsRouter.patch('/:leadId', async (req, res) => {
    const updateLeadController = makeUpdateLeadController();

    const { statusCode, body } = await updateLeadController.execute(req);

    res.status(statusCode).send(body);
});

leadsRouter.delete('/:leadId', async (req, res) => {
    const deleteLeadController = makeDeleteLeadController();

    const { statusCode, body } = await deleteLeadController.execute(req);

    res.status(statusCode).send(body);
});
