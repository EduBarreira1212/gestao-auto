import { Router } from 'express';
import { Webhook } from 'svix';
import Stripe from 'stripe';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { makeUpdateUserController } from '../factories/controllers/user.js';
import { PostgresChangePaidStatusRepository } from '../repositories/postgres/user/change-paid-status.js';

dotenv.config({ path: '.env' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const webhooksRouter = Router();

webhooksRouter.post(
    '/clerk',
    bodyParser.raw({ type: 'application/json' }),
    async function (req, res) {
        const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

        if (!WEBHOOK_SECRET) {
            throw new Error('You need a WEBHOOK_SECRET in your .env');
        }

        const headers = req.headers;
        const payload = req.body;

        const svix_id = headers['svix-id'];
        const svix_timestamp = headers['svix-timestamp'];
        const svix_signature = headers['svix-signature'];

        if (!svix_id || !svix_timestamp || !svix_signature) {
            return new Response('Error occured -- no svix headers', {
                status: 400,
            });
        }

        const wh = new Webhook(WEBHOOK_SECRET);

        let evt;

        try {
            evt = wh.verify(payload, {
                'svix-id': svix_id,
                'svix-timestamp': svix_timestamp,
                'svix-signature': svix_signature,
            });
        } catch (err) {
            console.log('Error verifying webhook:', err.message);
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }

        const eventType = evt.type;

        if (eventType === 'user.updated') {
            const updateUserObject = {
                params: { userId: evt.data.external_id },
                body: {
                    email: evt.data.email_addresses[0].email_address,
                    name: evt.data.first_name,
                },
            };

            const updateUserController = makeUpdateUserController();

            const { statusCode, body } =
                await updateUserController.execute(updateUserObject);

            if (statusCode !== 200) {
                return res.status(statusCode).send(body);
            }

            return res.status(statusCode).json({
                success: true,
                message: 'Webhook received',
            });
        }
    }
);

webhooksRouter.post(
    '/stripe',
    bodyParser.raw({ type: 'application/json' }),
    async (request, response) => {
        let event = request.body;

        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

        if (endpointSecret) {
            const signature = request.headers['stripe-signature'];
            try {
                event = stripe.webhooks.constructEvent(
                    request.body,
                    signature,
                    endpointSecret
                );
            } catch (err) {
                console.log(
                    `⚠️  Webhook signature verification failed.`,
                    err.message
                );
                return response.sendStatus(400);
            }
        }
        let subscription;
        let status;
        const changePaidStatusRepository = new PostgresChangePaidStatusRepository();

        switch (event.type) {
            case 'customer.subscription.deleted': {
                subscription = event.data.object;
                status = subscription.status;

                console.log(`Subscription status is ${status}.`);

                const customer = await stripe.customers.retrieve(
                    subscription.customer
                );

                const userEmail = customer.email;

                await changePaidStatusRepository.execute(userEmail, false);

                break;
            }
            case 'customer.subscription.created': {
                subscription = event.data.object;
                status = subscription.status;

                console.log(`Subscription status is ${status}.`);

                const customer = await stripe.customers.retrieve(
                    subscription.customer
                );

                const userEmail = customer.email;

                await changePaidStatusRepository.execute(userEmail, true);

                break;
            }
            default:
                console.log(`Unhandled event type ${event.type}.`);
        }

        response.send();
    }
);
