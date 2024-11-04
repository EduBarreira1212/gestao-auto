import { Router } from 'express';

import {
    makeCreateUserController,
    makeDeleteUserController,
    makeGetUserByIdController,
    makeUpdateUserController,
} from '../factories/controllers/user.js';
import { requireAuth } from '@clerk/express';

export const usersRouter = Router();

usersRouter.get('/:userId', requireAuth(), async (req, res) => {
    const getUserById = makeGetUserByIdController();

    const { statusCode, body } = await getUserById.execute(req);

    res.status(statusCode).send(body);
});

usersRouter.post('/', async (req, res) => {
    const createUserController = makeCreateUserController();

    const { statusCode, body } = await createUserController.execute(req);

    res.status(statusCode).send(body);
});

usersRouter.patch('/:userId', requireAuth(), async (req, res) => {
    const updateUserController = makeUpdateUserController();

    const { statusCode, body } = await updateUserController.execute(req);

    res.status(statusCode).send(body);
});

usersRouter.delete('/:userId', requireAuth(), async (req, res) => {
    const deleteUserController = makeDeleteUserController();

    const { statusCode, body } = await deleteUserController.execute(req);

    res.status(statusCode).send(body);
});
