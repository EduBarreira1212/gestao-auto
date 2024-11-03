import { Link } from 'react-router-dom';

import logo from '../assets/logo.png';
import moneyIcon from '../assets/saco-de-dolar.png';
import carIcon from '../assets/carro-alt.png';
import graphicIcon from '../assets/graphicicon.png';
import leadsIcon from '../assets/leads.png';
import ANavbar from '../components/ANavbar';

const NavbarModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="fixed top-0 flex h-screen w-screen flex-col justify-center backdrop-blur-sm">
            <nav className="fixed top-0 flex h-1/2 w-1/2 flex-col items-center gap-8 bg-brand-primary p-5">
                <button
                    className="self-end rounded-lg border-2 border-black px-1 pb-0.5 text-2xl shadow-sm shadow-black"
                    onClick={onClose}
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
                    <ANavbar to="#" iconURL={leadsIcon}>
                        Leads
                    </ANavbar>
                </div>
            </nav>
        </div>
    );
};

export default NavbarModal;
