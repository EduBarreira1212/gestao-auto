import Button from './Button';
import { useGetVehicleById } from '../hooks/data/useGetVehicleById';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import ExpenseDetailsModal from '../modals/ExpenseDetailsModal';
import DeleteExpenseModal from '../modals/DeleteExpenseModal';
import currencyFormatter from '../helpers/currency';

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
    const [showExpenseDetailsModal, setShowExpenseDetailsModal] = useState(false);
    const [showDeleteExpenseModal, setShowDeleteExpenseModal] = useState(false);

    const { data: vehicle } = useGetVehicleById(expense.car_id ?? '');

    return (
        <div className="flex w-fit flex-col gap-3 rounded-md border-2 border-solid bg-slate-50 p-5 text-center text-brand-secondary shadow-md shadow-brand-primary">
            <span>
                Veículo: {vehicle?.name} {vehicle?.plate} {vehicle?.year}
            </span>
            <span>{currencyFormatter(expense.amount)}</span>
            <span>{expense.description}</span>
            <span>
                Data da despesa:{' '}
                {new Date(expense.createdAt).toLocaleDateString('pt-BR')}
            </span>
            <div className="flex flex-row justify-evenly">
                <Button onClick={() => setShowExpenseDetailsModal(true)}>
                    Ver detalhes
                </Button>
                <button
                    className="my-3 self-center rounded-sm border-2 border-solid bg-red-600 p-2 font-montserrat text-brand-neutral transition-colors duration-200 hover:bg-red-700"
                    onClick={() => setShowDeleteExpenseModal(true)}
                >
                    Excluir
                </button>
            </div>
            {showExpenseDetailsModal &&
                createPortal(
                    <ExpenseDetailsModal
                        expense={expense}
                        onClose={() => setShowExpenseDetailsModal(false)}
                    />,
                    document.body
                )}
            {showDeleteExpenseModal &&
                createPortal(
                    <DeleteExpenseModal
                        expenseId={expense.id}
                        onClose={() => setShowDeleteExpenseModal(false)}
                    />,
                    document.body
                )}
        </div>
    );
};

export default Expense;
