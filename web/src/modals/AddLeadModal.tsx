import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateLead } from '../types';
import { useUser } from '@clerk/clerk-react';
import { addLeadSchema } from '../schemas/zodSchemas';
import ModalContainer from '../components/ModalContainer';
import SubmitBtn from '../components/SubmitBtn';
import InputErrorMessage from '../components/InputErrorMessage';
import { useAddLead } from '../hooks/data/useAddLead';

const AddLeadModal = ({ onClose }: { onClose: () => void }) => {
    const { user } = useUser();

    const { mutate, isPending } = useAddLead();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateLead>({
        resolver: zodResolver(addLeadSchema),
    });

    const onSubmit: SubmitHandler<CreateLead> = async (createLeadParams) => {
        if (!user || !user.externalId) return;

        const newLead = { ...createLeadParams, user_id: user?.externalId };

        mutate(newLead, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <ModalContainer>
            <button onClick={onClose}>X</button>
            <form
                className="flex flex-col gap-1 p-5"
                onSubmit={handleSubmit(onSubmit)}
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
                <label htmlFor="">Data de nascimento:</label>
                <input
                    className="border-2 p-2"
                    type="date"
                    {...register('birthday')}
                />
                {errors.birthday && (
                    <InputErrorMessage>{errors.birthday.message}</InputErrorMessage>
                )}
                <SubmitBtn value="Adicionar lead" disabled={isPending} />
            </form>
        </ModalContainer>
    );
};

export default AddLeadModal;
