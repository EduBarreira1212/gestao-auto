import { Link } from 'react-router-dom';

import logo from '../assets/logo.png';
import moneyIcon from '../assets/saco-de-dolar.png';
import carIcon from '../assets/carro-alt.png';
import graphicIcon from '../assets/graphicicon.png';
import leadsIcon from '../assets/leads.png';
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
        </nav>
    );
};

export default Navbar;
