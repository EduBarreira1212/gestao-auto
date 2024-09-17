import express from 'express';

import { usersRouter } from './routes/user.js';
import { carsRouter } from './routes/car.js';
import { sellsRouter } from './routes/sell.js';

export const app = express();

app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/cars', carsRouter);
app.use('/api/sells', sellsRouter);
