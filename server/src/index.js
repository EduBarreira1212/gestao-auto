import express from 'express';
import dotenv from 'dotenv';

import { usersRouter } from './routes/user.js';
import { carsRouter } from './routes/car.js';
import { sellsRouter } from './routes/sell.js';

dotenv.config({ path: '.env' });

const app = express();

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/cars', carsRouter);
app.use('/api/sells', sellsRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
