import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { useGetSells } from '../hooks/data/useGetSells';
import { useUser } from '@clerk/clerk-react';
import { useGetVehicles } from '../hooks/data/useGetVehicles';
import { useEffect, useState } from 'react';
import { SellType } from '../types';

const Overview = () => {
    const [sellsInThisMonth, setSellsInThisMonth] = useState<number>(0);
    const [profitInThisMonth, setProfitInThisMonth] = useState<number>(0);
    const [profitAverage, setProfitAverage] = useState<number>(0);
    const [totalAmountInThisMonth, setTotalAmounInThisMonth] = useState<number>(0);

    const navigate = useNavigate();

    const { user } = useUser();

    const { data: sells } = useGetSells(user?.externalId ?? '');

    useEffect(() => {
        const sellsThisMonth = sells?.filter((sell: SellType) => {
            return new Date(sell.createdAt).getMonth() === new Date().getMonth();
        });

        setSellsInThisMonth(sellsThisMonth?.length);

        const profitThisMonth = sellsThisMonth?.reduce(
            (acc: number, sell: SellType) => {
                return (acc += sell.profit);
            },
            0
        );

        setProfitInThisMonth(profitThisMonth);

        const totalprofit = sells?.reduce((acc: number, sell: SellType) => {
            return (acc += sell.profit);
        }, 0);

        setProfitAverage(totalprofit / sells?.length);

        const totalAmountThisMonth = sellsThisMonth?.reduce(
            (acc: number, sell: SellType) => {
                return (acc += sell.amount);
            },
            0
        );

        setTotalAmounInThisMonth(totalAmountThisMonth);
    }, [sells]);

    const { data: vehicles } = useGetVehicles(user?.externalId ?? '');

    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    return (
        <div className="flex w-full gap-5 p-5">
            <div className="flex flex-1 flex-col gap-3 rounded-md border-2 border-solid bg-slate-50 text-brand-secondary shadow-md shadow-brand-primary">
                <div className="flex justify-between gap-5 border-b-2 border-solid p-3">
                    <span>Vendas mês atual:</span>
                    <span>{sellsInThisMonth}</span>
                </div>
                <div className="flex flex-col justify-around gap-5 border-b-2 border-solid p-3">
                    <span>Vendas totais: {sells?.length}</span>
                    <span>
                        Lucro mês atual: {formatter.format(profitInThisMonth)}
                    </span>
                    <span>Lucro médio: {formatter.format(profitAverage)}</span>
                    <span>
                        Faturamento mês atual:{' '}
                        {formatter.format(totalAmountInThisMonth)}
                    </span>
                </div>
                <Button onClick={() => navigate('/vendas')}>Ver vendas</Button>
            </div>
            <div className="flex flex-1 flex-col gap-3 rounded-md border-2 border-solid bg-slate-50 text-brand-secondary shadow-md shadow-brand-primary">
                <div className="flex justify-between border-b-2 border-solid p-3">
                    <span>Veículos em estoque:</span>
                    <span>{vehicles?.length}</span>
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
