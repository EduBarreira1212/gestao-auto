import { Link } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';

const Header = () => {
    const { user } = useUser();

    return (
        <header className="flex w-full flex-row justify-between bg-brand-secondary px-8 py-3 text-brand-primary shadow-sm shadow-black">
            <h2>Dashboard</h2>
            <div className="hidden gap-4 md:flex">
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
                <UserButton />
                <span>{user?.fullName}</span>
            </div>
        </header>
    );
};

export default Header;
