import dotenv from 'dotenv';
import Stripe from 'stripe';
import { Router } from 'express';

dotenv.config({ path: '.env' });

export const stripeRouter = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

stripeRouter.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            billing_address_collection: 'auto',
            line_items: [
                {
                    price: req.body.priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.FRONTEND_URL}/sign-in`,
            cancel_url: `${process.env.FRONTEND_URL}/cadastro`,
        });

        res.json({ url: session.url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
