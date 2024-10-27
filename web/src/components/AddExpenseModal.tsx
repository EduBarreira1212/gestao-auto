import { SubmitHandler, useForm } from 'react-hook-form';
import ModalContainer from './ModalContainer';
import { CreateExpense } from '../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { createExpenseSchema } from '../schemas/zodSchemas';
import { useAddExpenses } from '../hooks/data/useAddExpenses';

type ExpenseModalProps = {
    carId: string;
    onClose: () => void;
};

const AddExpenseModal = ({ carId, onClose }: ExpenseModalProps) => {
    const { mutate } = useAddExpenses();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateExpense>({
        resolver: zodResolver(createExpenseSchema),
    });

    const onSubmit: SubmitHandler<CreateExpense> = async (createSellParams) => {
        const newExpense = {
            ...createSellParams,
            car_id: carId,
        };

        mutate(newExpense, {
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
                    value="Adicionar despesa"
                />
            </form>
        </ModalContainer>
    );
};

export default AddExpenseModal;
