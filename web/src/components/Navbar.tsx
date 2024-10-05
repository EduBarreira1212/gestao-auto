import moneyIcon from '../assets/saco-de-dolar.png';
import carIcon from '../assets/carro-alt.png';
import ANavbar from './ANavbar';

const Navbar = () => {
    return (
        <nav className="flex h-screen flex-col items-center gap-8 bg-green-400 p-5">
            <div>
                <a href="#">Logo</a>
            </div>
            <div className="flex flex-col items-center gap-5 border-y-2 p-5">
                <ANavbar href="#" iconURL={moneyIcon}>
                    Vendas
                </ANavbar>
                <ANavbar href="#" iconURL={carIcon}>
                    Veículos
                </ANavbar>
                <a href="#">Anúncios</a>
                <a href="#">Leads</a>
            </div>
            <div className="flex flex-col items-center gap-5 py-5">
                <a href="#">None</a>
                <a href="#">None</a>
                <a href="#">None</a>
            </div>
        </nav>
    );
};

export default Navbar;
