import { SubmitHandler, useForm } from 'react-hook-form';
import ModalContainer from '../components/ModalContainer';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateVehicle, VehicleType } from '../types';
import { updateVehicleSchema } from '../schemas/zodSchemas';
import { useUpdateVehicle } from '../hooks/data/useUpdateVehicle';
import SubmitBtn from '../components/SubmitBtn';

type VehicleDetailsModalprops = {
    vehicle: VehicleType;
    onClose: () => void;
};

const VehicleDetailsModal = ({ vehicle, onClose }: VehicleDetailsModalprops) => {
    const { mutate, isPending } = useUpdateVehicle(vehicle.id);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateVehicle>({
        resolver: zodResolver(updateVehicleSchema),
        defaultValues: {
            name: vehicle.name,
            brand: vehicle.brand,
            year: vehicle.year,
            plate: vehicle.plate,
            entry_price: vehicle.entry_price,
        },
    });

    const onSubmit: SubmitHandler<UpdateVehicle> = async (updateVehicleParams) => {
        mutate(updateVehicleParams, {
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
                <SubmitBtn value="Atualizar" disabled={isPending} />
            </form>
        </ModalContainer>
    );
};

export default VehicleDetailsModal;
