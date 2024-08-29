import express from 'express';
import dotenv from 'dotenv';

import { CreateUserController } from './controllers/create-user.js';
import { GetUserByIdCrontroller } from './controllers/get-user-by-id.js';
import { UpdateUserController } from './controllers/update-user.js';
import { DeleteUserController } from './controllers/delete-user.js';

dotenv.config({ path: '.env' });

const app = express();

app.use(express.json());

app.get('/api/get-user/:userId', async (req, res) => {
    const getUserById = new GetUserByIdCrontroller();

    const { statusCode, body } = await getUserById.execute(req);

    res.status(statusCode).send(body);
});

app.post('/api/create-user', async (req, res) => {
    const createUserController = new CreateUserController();

    const { statusCode, body } = await createUserController.execute(req);

    res.status(statusCode).send(body);
});

app.patch('/api/update-user/:userId', async (req, res) => {
    const updateUserController = new UpdateUserController();

    const { statusCode, body } = await updateUserController.execute(req);

    res.status(statusCode).send(body);
});

app.delete('/api/delete-user/:userId', async (req, res) => {
    const deleteUserController = new DeleteUserController();

    const { statusCode, body } = await deleteUserController.execute(req);

    res.status(statusCode).send(body);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
