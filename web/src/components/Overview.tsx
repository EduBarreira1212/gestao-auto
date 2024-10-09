import { useNavigate } from 'react-router-dom';
import Button from './Button';

const Overview = () => {
    const navigate = useNavigate();

    return (
        <div className="flex w-full gap-5 p-5">
            <div className="flex flex-1 flex-col gap-3 rounded-md border-2 border-solid bg-slate-50 text-brand-secondary shadow-md shadow-brand-primary">
                <div className="flex justify-between gap-5 border-b-2 border-solid p-3">
                    <span>Vendas mês atual:</span>
                    <span>0</span>
                </div>
                <div className="flex flex-col justify-around gap-5 border-b-2 border-solid p-3">
                    <span>Vendas totais: 0</span>
                    <span>Lucro mês atual: 0</span>
                    <span>Lucro médio: 0</span>
                    <span>Faturamento mês atual: 0</span>
                </div>
                <Button onClick={() => navigate('/vendas')}>Ver vendas</Button>
            </div>
            <div className="flex flex-1 flex-col gap-3 rounded-md border-2 border-solid bg-slate-50 text-brand-secondary shadow-md shadow-brand-primary">
                <div className="flex justify-between border-b-2 border-solid p-3">
                    <span>Veículos em estoque:</span>
                    <span>0</span>
                </div>
                <div className="flex flex-col gap-5 border-b-2 border-solid p-3">
                    <span>Preço médio: 0</span>
                    <span>Margem de lucro média: 0</span>
                    <span>Despesas esse mês: 0</span>
                    <span>Tempo em estoque(Média): 0 dias</span>
                </div>
                <Button onClick={() => navigate('/veiculos')}>Ver veículos</Button>
            </div>
        </div>
    );
};

export default Overview;
