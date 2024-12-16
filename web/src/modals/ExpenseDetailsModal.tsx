import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ExpenseType, UpdateExpense } from '../types';
import { updateExpenseSchema } from '../schemas/zodSchemas';
import ModalContainer from '../components/ModalContainer';
import { useUpdateExpense } from '../hooks/data/useUpdateExpense';
import SubmitBtn from '../components/SubmitBtn';
import InputErrorMessage from '../components/InputErrorMessage';
import CloseModalBtn from '../components/CloseModalBtn';

type ExpenseDetailsModalProps = {
    onClose: () => void;
    expense: ExpenseType;
};

const ExpenseDetailsModal = ({ onClose, expense }: ExpenseDetailsModalProps) => {
    const { mutate, isPending } = useUpdateExpense(expense.id);

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
            <CloseModalBtn onClick={onClose} />
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
                {errors.amount && (
                    <InputErrorMessage>{errors.amount.message}</InputErrorMessage>
                )}
                <label>Descrição:</label>
                <input
                    className="border-2 p-2"
                    type="text"
                    {...register('description')}
                />
                {errors.description && (
                    <InputErrorMessage>
                        {errors.description.message}
                    </InputErrorMessage>
                )}
                <SubmitBtn value="Atualizar" disabled={isPending} />
            </form>
        </ModalContainer>
    );
};

export default ExpenseDetailsModal;
