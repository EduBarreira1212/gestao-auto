import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import logo from '../assets/icons/logo.png';
import moneyIcon from '../assets/icons/saco-de-dolar.png';
import carIcon from '../assets/icons/carro-alt.png';
import graphicIcon from '../assets/icons/graphicicon.png';
import leadsIcon from '../assets/icons/leads.png';
import subscriptionIcon from '../assets/icons/subscription.png';
import ANavbar from '../components/ANavbar';

const NavbarModal = ({ onClose }: { onClose: () => void }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    return (
        <div
            className={`fixed left-0 top-0 flex h-screen w-screen justify-start backdrop-blur-sm transition-opacity duration-300 ease-out ${
                isVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <nav
                className={`fixed left-0 top-0 flex h-fit w-1/2 flex-col items-center gap-8 bg-brand-primary p-5 transition-transform duration-300 ease-out ${
                    isVisible ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <button
                    className="self-end rounded-lg border-2 border-black px-1 pb-0.5 text-2xl shadow-sm shadow-black"
                    onClick={handleClose}
                >
                    {'<'}
                </button>
                <div>
                    <Link to="/dashboard">
                        <img src={logo} alt="logo" className="h-16" />
                    </Link>
                </div>
                <div className="flex flex-col items-center gap-5 border-y-2 p-5">
                    <ANavbar to="/vendas" iconURL={graphicIcon}>
                        Vendas
                    </ANavbar>
                    <ANavbar to="/veiculos" iconURL={carIcon}>
                        Veículos
                    </ANavbar>
                    <ANavbar to="/despesas" iconURL={moneyIcon}>
                        Despesas
                    </ANavbar>
                    <ANavbar to="/leads" iconURL={leadsIcon}>
                        Leads
                    </ANavbar>
                </div>
                <div className="mt-auto">
                    <ANavbar
                        to="https://billing.stripe.com/p/login/9AQbKv4jp0UU4mI7ss"
                        iconURL={subscriptionIcon}
                    >
                        Assinatura
                    </ANavbar>
                </div>
            </nav>
        </div>
    );
};

export default NavbarModal;
