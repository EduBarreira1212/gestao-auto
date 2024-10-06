import arrowIcon from '../assets/setaBaixo.png';

const Header = () => {
    return (
        <header className="flex flex-row justify-between bg-gray-200 px-8 py-3">
            <h2>Page name</h2>
            <div className="flex gap-4">
                <a href="#">Vendas</a>
                <a href="#">Veículos</a>
                <a href="#">Despesas</a>
                <a href="#">Leads</a>
            </div>
            <div className="flex items-center gap-2">
                username
                <button>
                    <img src={arrowIcon} className="h-4" />
                </button>
            </div>
        </header>
    );
};

export default Header;
