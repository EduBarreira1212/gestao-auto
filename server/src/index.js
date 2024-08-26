import express from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

import { CreateUserController } from './controllers/create-user.js';

const app = express();

app.use(express.json());

app.post('/api/create-user', async (req, res) => {
    const createUserController = new CreateUserController();

    const { statusCode, body } = createUserController.execute(req);

    res.status(statusCode).send(body);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
