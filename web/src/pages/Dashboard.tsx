import Header from '../components/Header';
import Navbar from '../components/Navbar';

const Dashboard = () => {
    return (
        <div className="flex h-screen w-full flex-row">
            <Navbar />
            <div className="flex w-full flex-col bg-brand-neutral">
                <Header />
                <div className="flex h-full flex-row items-center justify-center p-3">
                    <div className="flex flex-col items-center gap-3 rounded-md border-2 border-solid bg-slate-50 p-8 text-brand-secondary shadow-md shadow-brand-primary">
                        <span>Carros em estoque: 0</span>
                        <span>Vendas esse mês: 0</span>
                        <span>Vendas totais: 0</span>
                        <span>Faturamento: 0</span>
                        <span>Despesas esse mês: 0</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
