import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ExpenseType, UpdateExpense } from '../types';
import { updateExpenseSchema } from '../schemas/zodSchemas';
import ModalContainer from '../components/ModalContainer';
import { useUpdateExpense } from '../hooks/data/useUpdateExpense';

type ExpenseDetailsModalProps = {
    onClose: () => void;
    expense: ExpenseType;
};

const ExpenseDetailsModal = ({ onClose, expense }: ExpenseDetailsModalProps) => {
    const { mutate } = useUpdateExpense(expense.id);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateExpense>({
        resolver: zodResolver(updateExpenseSchema),
        defaultValues: {
            amount: expense.amount,
            description: expense.description,
        },
    });

    const onSubmit: SubmitHandler<UpdateExpense> = async (updateExpenseParams) => {
        mutate(updateExpenseParams, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <ModalContainer>
            <button onClick={onClose}>X</button>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-1 p-5"
            >
                <label>Valor:</label>
                <input
                    className="border-2 p-2"
                    type="number"
                    {...register('amount', { valueAsNumber: true })}
                />
                {errors.amount && <p>{errors.amount.message}</p>}
                <label>Descrição:</label>
                <input
                    className="border-2 p-2"
                    type="text"
                    {...register('description')}
                />
                {errors.description && <p>{errors.description.message}</p>}
                <input
                    className="cursor-pointer border-2 bg-brand-secondary p-2 text-brand-primary hover:text-brand-accent"
                    type="submit"
                    value="Atualizar despesa"
                />
            </form>
        </ModalContainer>
    );
};

export default ExpenseDetailsModal;
