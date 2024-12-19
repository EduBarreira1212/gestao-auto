import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { requireAuth } from '@clerk/express';

import { usersRouter } from './routes/user.js';
import { carsRouter } from './routes/car.js';
import { expensesRouter } from './routes/expense.js';
import { sellsRouter } from './routes/sell.js';
import { leadsRouter } from './routes/lead.js';
import { stripeRouter } from './routes/stripe.js';
import { webhooksRouter } from './routes/webhooks.js';

export const app = express();

dotenv.config({ path: '.env' });

app.use('/api/webhooks', webhooksRouter);

app.use(express.json());
app.use(cors());

app.use('/api/users', usersRouter);

const clerkAuthMiddleware =
    process.env.NODE_ENV === 'test' ? (req, res, next) => next() : requireAuth();

app.use(clerkAuthMiddleware);
app.use('/api/cars', carsRouter);
app.use('/api/expenses', expensesRouter);
app.use('/api/sells', sellsRouter);
app.use('/api/leads', leadsRouter);
app.use('/api/stripe', stripeRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocument = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../docs/swagger.json'), 'utf8')
);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
