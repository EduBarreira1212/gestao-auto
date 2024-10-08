import { Link } from 'react-router-dom';
import arrowIcon from '../assets/setaBaixo.png';

const Header = () => {
    return (
        <header className="flex flex-row justify-between bg-brand-secondary px-8 py-3 text-brand-primary shadow-sm shadow-black">
            <h2>Dashboard</h2>
            <div className="flex gap-4">
                <Link className="hover:text-brand-accent" to="/vendas">
                    Vendas
                </Link>
                <Link className="hover:text-brand-accent" to="/veiculos">
                    Veículos
                </Link>
                <Link className="hover:text-brand-accent" to="/despesas">
                    Despesas
                </Link>
                <Link className="hover:text-brand-accent" to="#">
                    Leads
                </Link>
            </div>
            <div className="flex items-center gap-2">
                username
                <button className="hover:text-brand-accent">
                    <img src={arrowIcon} className="h-4" />
                </button>
            </div>
        </header>
    );
};

export default Header;
