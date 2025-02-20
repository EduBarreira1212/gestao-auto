import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LeadType, UpdateLead } from '../types';
import { updateLeadSchema } from '../schemas/zodSchemas';
import ModalContainer from '../components/ModalContainer';
import SubmitBtn from '../components/SubmitBtn';
import InputErrorMessage from '../components/InputErrorMessage';
import { useUpdateLead } from '../hooks/data/useUpdateLead';
import CloseModalBtn from '../components/CloseModalBtn';

type LeadDetailsModalProps = {
    onClose: () => void;
    lead: LeadType;
};

const LeadDetailsModal = ({ onClose, lead }: LeadDetailsModalProps) => {
    const { mutate, isPending } = useUpdateLead(lead.id);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateLead>({
        resolver: zodResolver(updateLeadSchema),
        defaultValues: {
            name: lead.name,
            email: lead.email,
            phone: lead.phone,
            cpfCnpj: lead.cpfCnpj,
            birthday: lead.birthday.toString(),
        },
    });

    const onSubmit: SubmitHandler<UpdateLead> = async (updateLeadParams) => {
        mutate(updateLeadParams, {
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
                <label htmlFor="">Nome:</label>
                <input className="border-2 p-2" type="text" {...register('name')} />
                {errors.name && (
                    <InputErrorMessage>{errors.name.message}</InputErrorMessage>
                )}
                <label htmlFor="">E-mail:</label>
                <input className="border-2 p-2" type="text" {...register('email')} />
                {errors.email && (
                    <InputErrorMessage>{errors.email.message}</InputErrorMessage>
                )}
                <label htmlFor="">Telefone:</label>
                <input className="border-2 p-2" type="text" {...register('phone')} />
                {errors.phone && (
                    <InputErrorMessage>{errors.phone.message}</InputErrorMessage>
                )}
                <label htmlFor="">CPF ou CNPJ:</label>
                <input
                    className="border-2 p-2"
                    type="text"
                    {...register('cpfCnpj')}
                />
                {errors.cpfCnpj && (
                    <InputErrorMessage>{errors.cpfCnpj.message}</InputErrorMessage>
                )}
                <label htmlFor="">Data de nascimento:</label>
                <input
                    className="border-2 p-2"
                    type="date"
                    {...register('birthday')}
                />
                {errors.birthday && (
                    <InputErrorMessage>{errors.birthday.message}</InputErrorMessage>
                )}
                <SubmitBtn value="Atualizar" disabled={isPending} />
            </form>
        </ModalContainer>
    );
};

export default LeadDetailsModal;
