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
import { subscriptionMiddleware } from './middlewares/subscription.js';

export const app = express();

dotenv.config({ path: '.env' });

app.use('/api/webhooks', webhooksRouter);

app.use(express.json());
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
    })
);

app.use('/api/users', usersRouter);
app.use('/api/stripe', stripeRouter);

const clerkAuthMiddleware =
    process.env.NODE_ENV === 'test' ? (req, res, next) => next() : requireAuth();

const subMiddleware =
    process.env.NODE_ENV === 'test'
        ? (req, res, next) => next()
        : subscriptionMiddleware;

app.use(clerkAuthMiddleware);
app.use(subMiddleware);
app.use('/api/cars', carsRouter);
app.use('/api/expenses', expensesRouter);
app.use('/api/sells', sellsRouter);
app.use('/api/leads', leadsRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocument = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../docs/swagger.json'), 'utf8')
);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
