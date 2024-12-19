import dotenv from 'dotenv';
import Stripe from 'stripe';
import { Router } from 'express';

dotenv.config({ path: '.env' });

export const stripeRouter = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

stripeRouter.post('/create-checkout-session', async (req, res) => {
    try {
        const prices = await stripe.prices.list({
            lookup_keys: [req.body.lookup_key],
            expand: ['data.product'],
        });
        const session = await stripe.checkout.sessions.create({
            billing_address_collection: 'auto',
            line_items: [
                {
                    price: prices.data[0].id,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.FRONTEND_URL}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}?canceled=true`,
        });

        res.redirect(303, session.url);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
