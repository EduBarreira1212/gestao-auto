import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UpdateSell } from '../types';
import { updateSellSchema } from '../schemas/zodSchemas';
import { useUpdateSell } from '../hooks/data/useUpdateSell';
import ModalContainer from '../components/ModalContainer';
import SubmitBtn from '../components/SubmitBtn';
import InputErrorMessage from '../components/InputErrorMessage';
import CloseModalBtn from '../components/CloseModalBtn';

type SellDetailsModalProps = {
    onClose: () => void;
    sellId: string;
};

const SellDetailsModal = ({ onClose, sellId }: SellDetailsModalProps) => {
    const { mutate, isPending } = useUpdateSell(sellId);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateSell>({
        resolver: zodResolver(updateSellSchema),
    });

    const onSubmit: SubmitHandler<UpdateSell> = async (updateSellParams) => {
        mutate(updateSellParams, {
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
                <label>Valor da venda:</label>
                <input
                    className="border-2 p-2"
                    type="number"
                    {...register('amount', { valueAsNumber: true })}
                />
                {errors.amount && (
                    <InputErrorMessage>{errors.amount.message}</InputErrorMessage>
                )}
                <label>Lucro:</label>
                <input
                    className="border-2 p-2"
                    type="number"
                    {...register('profit', { valueAsNumber: true })}
                />
                {errors.profit && (
                    <InputErrorMessage>{errors.profit.message}</InputErrorMessage>
                )}
                <label>Descrição:</label>
                <textarea
                    className="border-2 p-2"
                    maxLength={500}
                    rows={4}
                    placeholder="Insira detalhes da venda. Ex: Forma de pagamento"
                    {...register('description')}
                />
                {errors.description && (
                    <InputErrorMessage>
                        {errors.description.message}
                    </InputErrorMessage>
                )}
                <SubmitBtn value="Atualizar venda" disabled={isPending} />
            </form>
        </ModalContainer>
    );
};

export default SellDetailsModal;
