import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import App from './App.tsx';
import './index.css';

const queryClient = new QueryClient();

const stripePromise = loadStripe(process.env.VITE_STRIPE_PUBLIC_KEY);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Elements stripe={stripePromise}>
                    <App />
                </Elements>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>
);
