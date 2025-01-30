import { useNavigate } from 'react-router-dom';
import loading from '../assets/icons/loading.png';
import Button from './Button';
import { useGetSells } from '../hooks/data/useGetSells';
import { useUser } from '@clerk/clerk-react';
import { useGetVehicles } from '../hooks/data/useGetVehicles';
import { useMemo } from 'react';
import { ExpenseType, SellType, VehicleType } from '../types';
import currencyFormatter from '../helpers/currency';

const Overview = () => {
    const navigate = useNavigate();

    const { user } = useUser();

    const currentMonth = new Date().getMonth();

    const { data: sells, isLoading: isLoadingSells } = useGetSells(
        user?.externalId ?? ''
    );

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

    const { data: vehicles, isLoading: isLoadingVehicles } = useGetVehicles(
        user?.externalId ?? ''
    );

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

    return (
        <div className="flex w-full flex-col gap-5 p-5 md:flex-row">
            {isLoadingSells || isLoadingVehicles ? (
                <div className="flex h-full w-full items-center justify-center">
                    <img
                        src={loading}
                        alt="loading"
                        className="size-12 animate-spin md:size-14"
                    />
                </div>
            ) : (
                <>
                    <div className="flex flex-1 flex-col gap-3 rounded-md border-2 border-solid bg-slate-50 text-brand-secondary shadow-md shadow-brand-primary">
                        <div className="flex justify-between gap-5 border-b-2 border-solid p-3">
                            <span>Vendas mês atual:</span>
                            <span>{sellsThisMonth?.length}</span>
                        </div>
                        <div className="flex flex-col justify-around gap-5 border-b-2 border-solid p-3">
                            <span>Vendas totais: {sells?.length}</span>
                            <span>
                                Faturamento mês atual:{' '}
                                {currencyFormatter(totalAmountThisMonth)}
                            </span>
                            <span>
                                Lucro mês atual: {currencyFormatter(profitThisMonth)}
                            </span>
                            <span>
                                Lucro médio: {currencyFormatter(totalProfitAverage)}
                            </span>
                        </div>
                        <Button onClick={() => navigate('/vendas')}>
                            Ver vendas
                        </Button>
                    </div>
                    <div className="flex flex-1 flex-col gap-3 rounded-md border-2 border-solid bg-slate-50 text-brand-secondary shadow-md shadow-brand-primary">
                        <div className="flex justify-between border-b-2 border-solid p-3">
                            <span>Veículos em estoque:</span>
                            <span>{vehicles?.length}</span>
                        </div>
                        <div className="flex flex-col gap-5 border-b-2 border-solid p-3">
                            <span>
                                Preço médio:{' '}
                                {currencyFormatter(averageVehiclesPrice)}
                            </span>
                            <span>
                                Despesas esse mês: {expensesThisMonth?.length}
                            </span>
                            <span>
                                Valor total das despesas:{' '}
                                {currencyFormatter(totalAmountExpensesThisMonth)}
                            </span>
                            <span>
                                Tempo em estoque(Média):{' '}
                                {averageTotalDaysInHouse.toFixed()} dias
                            </span>
                        </div>
                        <Button onClick={() => navigate('/veiculos')}>
                            Ver veículos
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Overview;
