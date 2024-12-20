import { useState } from 'react';
import Button from '../components/Button';
import createCheckoutSession from '../services/stripe/createCheckoutSession';

const PricingTable = () => {
    const [isAnnual, setIsAnnual] = useState(true);

    const plans = [
        {
            name: 'Acesso total',
            monthlyPrice: 97,
            annualPrice: 804,
            features: [
                'Controle de estoque',
                'Financeiro',
                'Armazenamento de leads',
            ],
        },
    ];

    const handleClick = async () => {
        const priceId = isAnnual
            ? import.meta.env.VITE_ANNUAL_STRIPE_PRICE_ID
            : import.meta.env.VITE_MONTH_STRIPE_PRICE_ID;

        const checkoutSession = await createCheckoutSession(priceId);

        if (checkoutSession) {
            window.location.href = checkoutSession.data.url;
        }
    };

    return (
        <div className="h-screen bg-brand-neutral py-10">
            <div className="mb-6 text-center">
                <h2 className="text-3xl font-bold">Nossos planos</h2>
                <div className="mt-4">
                    <button
                        className={`rounded-l-lg px-4 py-2 ${
                            isAnnual ? 'bg-brand-primary text-white' : 'bg-gray-200'
                        }`}
                        onClick={() => setIsAnnual(true)}
                    >
                        Anual
                    </button>
                    <button
                        className={`rounded-r-lg px-4 py-2 ${
                            !isAnnual ? 'bg-brand-primary text-white' : 'bg-gray-200'
                        }`}
                        onClick={() => setIsAnnual(false)}
                    >
                        Mensal
                    </button>
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className="w-80 rounded-lg bg-white p-6 text-center shadow-md"
                    >
                        <h3 className="mb-4 text-2xl font-semibold">{plan.name}</h3>
                        <p className="mb-4 text-4xl font-bold text-brand-primary">
                            R$ {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                            <span className="text-lg text-brand-secondary">
                                /{isAnnual ? 'anual' : 'mensal'}
                            </span>
                        </p>
                        <ul className="mb-6 text-gray-700">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="mb-2">
                                    ✅ {feature}
                                </li>
                            ))}
                        </ul>
                        <Button onClick={handleClick}>Escolher plano</Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PricingTable;
