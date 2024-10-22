import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateVehicle } from '../types';
import { useUser } from '@clerk/clerk-react';
import { addVehicleschema } from '../schemas/zodSchemas';
import { useAddVehicle } from '../hooks/data/addVehicle';
import ModalContainer from './ModalContainer';

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
                {errors.name && <p>{errors.name.message}</p>}
                <label htmlFor="">Marca:</label>
                <input className="border-2 p-2" type="text" {...register('brand')} />
                {errors.brand && <p>{errors.brand.message}</p>}
                <label htmlFor="">Ano:</label>
                <input
                    className="border-2 p-2"
                    type="number"
                    {...register('year', { valueAsNumber: true })}
                />
                {errors.year && <p>{errors.year.message}</p>}
                <label htmlFor="">Placa:</label>
                <input
                    className="border-2 p-2"
                    type="string"
                    {...register('plate')}
                />
                {errors.plate && <p>{errors.plate.message}</p>}
                <label htmlFor="">Preço de entrada:</label>
                <input
                    className="border-2 p-2"
                    type="number"
                    {...register('entry_price', { valueAsNumber: true })}
                />
                {errors.entry_price && <p>{errors.entry_price.message}</p>}
                <input
                    type="submit"
                    value="Adicionar"
                    className="cursor-pointer border-2 bg-brand-secondary p-2 text-brand-primary hover:text-brand-accent"
                    disabled={isPending}
                />
            </form>
        </ModalContainer>
    );
};

export default AddVehicleModal;
