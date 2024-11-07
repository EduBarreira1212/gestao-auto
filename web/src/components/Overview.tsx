import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { useGetSells } from '../hooks/data/useGetSells';
import { useUser } from '@clerk/clerk-react';
import { useGetVehicles } from '../hooks/data/useGetVehicles';
import { useEffect, useMemo, useState } from 'react';
import { ExpenseType, SellType, VehicleType } from '../types';

const Overview = () => {
    const [sellsInThisMonth, setSellsInThisMonth] = useState<number>(0);
    const [profitInThisMonth, setProfitInThisMonth] = useState<number>(0);
    const [profitAverage, setProfitAverage] = useState<number>(0);
    const [totalAmountInThisMonth, setTotalAmounInThisMonth] = useState<number>(0);

    const [averagePrice, setAveragePrice] = useState<number>(0);
    const [expensesInThisMonth, setExpensesInThisMonth] = useState<number>(0);
    const [amountExpensesInThisMonth, setAmountExpensesInThisMonth] =
        useState<number>(0);
    const [averageDaysInHouse, setAverageDaysInHouse] = useState<number>(0);

    const navigate = useNavigate();

    const { user } = useUser();

    const currentMonth = new Date().getMonth();

    const { data: sells } = useGetSells(user?.externalId ?? '');

    const sellsThisMonth = useMemo(() => {
        return sells?.filter((sell: SellType) => {
            return new Date(sell.createdAt).getMonth() === currentMonth;
        });
    }, [sells, currentMonth]);

    const profitThisMonth = useMemo(() => {
        return sellsThisMonth?.reduce((acc: number, sell: SellType) => {
            return (acc += sell.profit);
        }, 0);
    }, [sellsThisMonth]);

    const totalProfitAverage = useMemo(() => {
        const totalProfit = sells?.reduce((acc: number, sell: SellType) => {
            return (acc += sell.profit);
        }, 0);

        return sells?.length > 0 ? totalProfit / sells.length : 0;
    }, [sells]);

    const totalAmountThisMonth = useMemo(() => {
        return sellsThisMonth?.reduce((acc: number, sell: SellType) => {
            return (acc += sell.amount);
        }, 0);
    }, [sellsThisMonth]);

    useEffect(() => {
        setSellsInThisMonth(sellsThisMonth?.length);
        setProfitInThisMonth(profitThisMonth);
        setProfitAverage(totalProfitAverage);
        setTotalAmounInThisMonth(totalAmountThisMonth);
    }, [sells]);

    const { data: vehicles } = useGetVehicles(user?.externalId ?? '');

    const expenses = vehicles?.flatMap((vehicle: VehicleType) => vehicle.expenses);

    const averageVehiclesPrice = useMemo(() => {
        const totalVehiclesPrice = vehicles?.reduce(
            (acc: number, vehicle: VehicleType) => {
                return (acc += vehicle.entry_price);
            },
            0
        );
        return totalVehiclesPrice / vehicles?.length || 0;
    }, [vehicles]);

    const expensesThisMonth = useMemo(() => {
        return expenses?.filter((expense: ExpenseType) => {
            return new Date(expense.createdAt).getMonth() === currentMonth;
        });
    }, [expenses]);

    const totalAmountExpensesThisMonth = useMemo(() => {
        return expensesThisMonth?.reduce((acc: number, expense: ExpenseType) => {
            return (acc += expense.amount);
        }, 0);
    }, [expensesThisMonth]);

    const averageTotalDaysInHouse = useMemo(() => {
        const totalDaysInMs = vehicles?.reduce(
            (acc: number, vehicle: VehicleType) => {
                return (acc +=
                    new Date().getTime() - new Date(vehicle.createdAt).getTime());
            },
            0
        );

        const totalDaysInDays = Math.ceil(totalDaysInMs / (1000 * 60 * 60 * 24));

        return totalDaysInDays / vehicles?.length || 0;
    }, [vehicles]);

    useEffect(() => {
        setAveragePrice(averageVehiclesPrice);
        setExpensesInThisMonth(expensesThisMonth?.length);
        setAmountExpensesInThisMonth(totalAmountExpensesThisMonth);
        setAverageDaysInHouse(averageTotalDaysInHouse);
    }, [vehicles]);

    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    return (
        <div className="flex w-full flex-col gap-5 p-5 md:flex-row">
            <div className="flex flex-1 flex-col gap-3 rounded-md border-2 border-solid bg-slate-50 text-brand-secondary shadow-md shadow-brand-primary">
                <div className="flex justify-between gap-5 border-b-2 border-solid p-3">
                    <span>Vendas mês atual:</span>
                    <span>{sellsInThisMonth}</span>
                </div>
                <div className="flex flex-col justify-around gap-5 border-b-2 border-solid p-3">
                    <span>Vendas totais: {sells?.length}</span>
                    <span>
                        Faturamento mês atual:{' '}
                        {formatter.format(totalAmountInThisMonth)}
                    </span>
                    <span>
                        Lucro mês atual: {formatter.format(profitInThisMonth)}
                    </span>
                    <span>Lucro médio: {formatter.format(profitAverage)}</span>
                </div>
                <Button onClick={() => navigate('/vendas')}>Ver vendas</Button>
            </div>
            <div className="flex flex-1 flex-col gap-3 rounded-md border-2 border-solid bg-slate-50 text-brand-secondary shadow-md shadow-brand-primary">
                <div className="flex justify-between border-b-2 border-solid p-3">
                    <span>Veículos em estoque:</span>
                    <span>{vehicles?.length}</span>
                </div>
                <div className="flex flex-col gap-5 border-b-2 border-solid p-3">
                    <span>Preço médio: {formatter.format(averagePrice)}</span>
                    <span>Despesas esse mês: {expensesInThisMonth}</span>
                    <span>
                        Valor total das despesas:{' '}
                        {formatter.format(amountExpensesInThisMonth)}
                    </span>
                    <span>Tempo em estoque(Média): {averageDaysInHouse} dias</span>
                </div>
                <Button onClick={() => navigate('/veiculos')}>Ver veículos</Button>
            </div>
        </div>
    );
};

export default Overview;
