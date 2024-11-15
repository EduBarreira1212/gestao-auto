import { Router } from 'express';
import { Webhook } from 'svix';
import dotenv from 'dotenv';

import { makeUpdateUserController } from '../factories/controllers/user.js';

dotenv.config({ path: '.env' });

export const webhooksRouter = Router();

webhooksRouter.post('/clerk', async function (req, res) {
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
            email: evt.data.email_addresses[0].email.address,
            name: evt.data.first_name,
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
});
