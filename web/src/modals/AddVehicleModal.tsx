import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateVehicle } from '../types';
import { useUser } from '@clerk/clerk-react';
import { addVehicleschema } from '../schemas/zodSchemas';
import { useAddVehicle } from '../hooks/data/useAddVehicle';
import ModalContainer from '../components/ModalContainer';
import SubmitBtn from '../components/SubmitBtn';
import InputErrorMessage from '../components/InputErrorMessage';

const AddVehicleModal = ({ onClose }: { onClose: () => void }) => {
    const { user } = useUser();

    const { mutate, isPending } = useAddVehicle();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateVehicle>({
        resolver: zodResolver(addVehicleschema),
    });

    const onSubmit: SubmitHandler<CreateVehicle> = async (createVehicleParams) => {
        if (!user || !user.externalId) return;

        const newVehicle = { ...createVehicleParams, user_id: user?.externalId };

        mutate(newVehicle, {
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
                <label htmlFor="">Modelo:</label>
                <input className="border-2 p-2" type="text" {...register('name')} />
                {errors.name && (
                    <InputErrorMessage>{errors.name.message}</InputErrorMessage>
                )}
                <label htmlFor="">Marca:</label>
                <input className="border-2 p-2" type="text" {...register('brand')} />
                {errors.brand && (
                    <InputErrorMessage>{errors.brand.message}</InputErrorMessage>
                )}
                <label htmlFor="">Ano:</label>
                <input
                    className="border-2 p-2"
                    type="number"
                    {...register('year', { valueAsNumber: true })}
                />
                {errors.year && (
                    <InputErrorMessage>{errors.year.message}</InputErrorMessage>
                )}
                <label htmlFor="">Placa:</label>
                <input
                    className="border-2 p-2"
                    type="string"
                    {...register('plate')}
                />
                {errors.plate && (
                    <InputErrorMessage>{errors.plate.message}</InputErrorMessage>
                )}
                <label htmlFor="">Quilometragem:</label>
                <input
                    className="border-2 p-2"
                    type="string"
                    {...register('km', { valueAsNumber: true })}
                />
                {errors.km && (
                    <InputErrorMessage>{errors.km.message}</InputErrorMessage>
                )}
                <label htmlFor="">Preço de entrada:</label>
                <input
                    className="border-2 p-2"
                    type="number"
                    {...register('entry_price', { valueAsNumber: true })}
                />
                {errors.entry_price && (
                    <InputErrorMessage>
                        {errors.entry_price.message}
                    </InputErrorMessage>
                )}
                <SubmitBtn value="Adicionar veículo" disabled={isPending} />
            </form>
        </ModalContainer>
    );
};

export default AddVehicleModal;
