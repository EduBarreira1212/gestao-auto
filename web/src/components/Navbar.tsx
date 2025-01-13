import { Link } from 'react-router-dom';

import logo from '../assets/icons/logo.png';
import moneyIcon from '../assets/icons/saco-de-dolar.png';
import carIcon from '../assets/icons/carro-alt.png';
import graphicIcon from '../assets/icons/graphicicon.png';
import leadsIcon from '../assets/icons/leads.png';
import subscriptionIcon from '../assets/icons/subscription.png';
import ANavbar from './ANavbar';

const Navbar = () => {
    return (
        <nav className="hidden h-screen flex-col items-center gap-8 bg-brand-primary p-5 md:flex">
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
    );
};

export default Navbar;
