import logo from '../assets/logo.png';
import moneyIcon from '../assets/saco-de-dolar.png';
import carIcon from '../assets/carro-alt.png';
import graphicIcon from '../assets/graphicicon.png';
import leadsIcon from '../assets/leads.png';
import ANavbar from './ANavbar';

const Navbar = () => {
    return (
        <nav className="bg-brand-primary flex h-screen flex-col items-center gap-8 p-5">
            <div>
                <a href="#">
                    <img src={logo} alt="logo" className="h-16" />
                </a>
            </div>
            <div className="flex flex-col items-center gap-5 border-y-2 p-5">
                <ANavbar href="#" iconURL={graphicIcon}>
                    Vendas
                </ANavbar>
                <ANavbar href="#" iconURL={carIcon}>
                    Veículos
                </ANavbar>
                <ANavbar href="#" iconURL={moneyIcon}>
                    Despesas
                </ANavbar>
                <ANavbar href="#" iconURL={leadsIcon}>
                    Leads
                </ANavbar>
            </div>
        </nav>
    );
};

export default Navbar;
