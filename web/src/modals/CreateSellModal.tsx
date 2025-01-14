import { useUser } from '@clerk/clerk-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateSell, LeadType } from '../types';
import { createSellSchema } from '../schemas/zodSchemas';
import { useCreateSell } from '../hooks/data/useCreateSell';
import ModalContainer from '../components/ModalContainer';
import SubmitBtn from '../components/SubmitBtn';
import InputErrorMessage from '../components/InputErrorMessage';
import { useGetLeads } from '../hooks/data/useGetLeads';
import CloseModalBtn from '../components/CloseModalBtn';

type CreateSellModalprops = {
    carId: string;
    expenses: number;
    entryPrice: number;
    onClose: () => void;
};

const CreateSellModal = ({
    carId,
    expenses,
    entryPrice,
    onClose,
}: CreateSellModalprops) => {
    const { user } = useUser();

    const { mutate, isPending } = useCreateSell(user?.externalId ?? '');

    const { data: leads } = useGetLeads(user?.externalId ?? '');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateSell>({
        resolver: zodResolver(createSellSchema),
    });

    const onSubmit: SubmitHandler<CreateSell> = async (createSellParams) => {
        if (!user || !user.externalId) return;

        const profit = createSellParams.amount - (expenses + entryPrice);

        const newSell = {
            ...createSellParams,
            profit,
            user_id: user?.externalId,
            car_id: carId,
        };

        mutate(newSell, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

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
                <p>Despesas: {formatter.format(expenses)}</p>
                <label>Lead:</label>
                <select className="border-2 p-2" {...register('lead_id')}>
                    <option value="" disabled>
                        Selecione um lead
                    </option>
                    {leads?.map((lead: LeadType) => {
                        return (
                            <option key={lead.id} value={lead.id}>
                                Nome: {lead.name} E-mail: {lead.email}
                            </option>
                        );
                    })}
                </select>
                {errors.lead_id && (
                    <InputErrorMessage>{errors.lead_id.message}</InputErrorMessage>
                )}
                <SubmitBtn value="Adicionar venda" disabled={isPending} />
            </form>
        </ModalContainer>
    );
};

export default CreateSellModal;
