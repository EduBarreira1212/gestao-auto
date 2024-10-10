import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { usersRouter } from './routes/user.js';
import { carsRouter } from './routes/car.js';
import { expensesRouter } from './routes/expense.js';
import { sellsRouter } from './routes/sell.js';

export const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', usersRouter);
app.use('/api/cars', carsRouter);
app.use('/api/expenses', expensesRouter);
app.use('/api/sells', sellsRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocument = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../docs/swagger.json'), 'utf8')
);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
