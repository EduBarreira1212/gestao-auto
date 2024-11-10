import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UpdateSell } from '../types';
import { updateSellSchema } from '../schemas/zodSchemas';
import { useUpdateSell } from '../hooks/data/useUpdateSell';
import ModalContainer from '../components/ModalContainer';

type SellDetailsModalProps = {
    onClose: () => void;
    sellId: string;
};

const SellDetailsModal = ({ onClose, sellId }: SellDetailsModalProps) => {
    const { mutate } = useUpdateSell(sellId);

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
            <button onClick={onClose}>X</button>
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
                {errors.amount && <p>{errors.amount.message}</p>}
                <label>Lucro:</label>
                <input
                    className="border-2 p-2"
                    type="number"
                    {...register('profit', { valueAsNumber: true })}
                />
                {errors.profit && <p>{errors.profit.message}</p>}
                <input
                    className="cursor-pointer border-2 bg-brand-secondary p-2 text-brand-neutral transition-colors duration-200 hover:bg-[#070a1d] hover:text-brand-accent"
                    type="submit"
                    value="Atualizar venda"
                />
            </form>
        </ModalContainer>
    );
};

export default SellDetailsModal;
