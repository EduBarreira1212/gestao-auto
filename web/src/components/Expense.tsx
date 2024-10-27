import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { useGetVehicleById } from '../hooks/data/useGetVehicleById';

type ExpenseProps = {
    expense: {
        id: string;
        car_id: string;
        amount: number;
        description: string;
        createdAt: Date;
    };
};

const Expense = ({ expense }: ExpenseProps) => {
    const navigate = useNavigate();

    const { data: vehicle } = useGetVehicleById(expense.car_id ?? '');

    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    return (
        <div className="flex w-fit flex-col gap-3 rounded-md border-2 border-solid bg-slate-50 p-5 text-center text-brand-secondary shadow-md shadow-brand-primary">
            <span>
                Veículo: {vehicle?.name} {vehicle?.plate} {vehicle?.year}
            </span>
            <span>{formatter.format(expense.amount)}</span>
            <span>{expense.description}</span>
            <span>
                Data da despesa:{' '}
                {new Date(expense.createdAt).toLocaleDateString('pt-BR')}
            </span>
            <Button onClick={() => navigate('/')}>Ver detalhes</Button>
        </div>
    );
};

export default Expense;
