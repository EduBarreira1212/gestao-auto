import { SubmitHandler, useForm } from 'react-hook-form';
import ModalContainer from '../components/ModalContainer';
import { CreateExpense } from '../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { createExpenseSchema } from '../schemas/zodSchemas';
import { useAddExpenses } from '../hooks/data/useAddExpenses';
import SubmitBtn from '../components/SubmitBtn';

type ExpenseModalProps = {
    carId: string;
    onClose: () => void;
};

const AddExpenseModal = ({ carId, onClose }: ExpenseModalProps) => {
    const { mutate, isPending } = useAddExpenses();

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
                <SubmitBtn value="Adicionar despesa" disabled={isPending} />
            </form>
        </ModalContainer>
    );
};

export default AddExpenseModal;
