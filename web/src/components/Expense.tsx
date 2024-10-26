import { useNavigate } from 'react-router-dom';
import Button from './Button';

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

    return (
        <div className="flex w-fit flex-col gap-3 rounded-md border-2 border-solid bg-slate-50 p-5 text-center text-brand-secondary shadow-md shadow-brand-primary">
            <span>{expense.car_id}</span>
            <span>{expense.amount}</span>
            <span>{expense.description}</span>
            <span>Data da despesa: 0</span>
            <Button onClick={() => navigate('/')}>Ver detalhes</Button>
        </div>
    );
};

export default Expense;
