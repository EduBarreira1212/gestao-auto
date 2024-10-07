import arrowIcon from '../assets/setaBaixo.png';

const Header = () => {
    return (
        <header className="bg-brand-secondary text-brand-primary flex flex-row justify-between px-8 py-3 shadow-sm shadow-black">
            <h2>Dashboard</h2>
            <div className="flex gap-4">
                <a className="hover:text-brand-accent" href="#">
                    Vendas
                </a>
                <a className="hover:text-brand-accent" href="#">
                    Veículos
                </a>
                <a className="hover:text-brand-accent" href="#">
                    Despesas
                </a>
                <a className="hover:text-brand-accent" href="#">
                    Leads
                </a>
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
