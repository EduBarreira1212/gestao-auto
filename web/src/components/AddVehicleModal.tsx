import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CreateVehicle } from '../types';
import createCar from '../services/car/createCar';
import { useUser } from '@clerk/clerk-react';

const schema = z.object({
    name: z.string().trim().min(1, 'O modelo é obrigatório.'),
    brand: z.string().trim().min(1, 'A marca é obrigatória.'),
    year: z
        .number({ invalid_type_error: 'Ano deve ser um número.' })
        .min(1900, 'Ano deve ser maior que 1900.')
        .max(
            new Date().getFullYear() + 1,
            `Ano deve ser até ${new Date().getFullYear() + 1}.`
        ),
    plate: z
        .string()
        .regex(
            /^([A-Z]{3}-\d{4}|[A-Z]{3}\d[A-Z]\d{2})$/,
            'Placa deve estar no formato ABC-1234 ou ABC1D23.'
        ),
    entry_price: z
        .number({ invalid_type_error: 'Preço de entrada deve ser um número.' })
        .positive('O preço de entrada deve ser positivo.'),
});

const AddVehicleModal = ({ onClose }: { onClose: () => void }) => {
    const { user } = useUser();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateVehicle>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<CreateVehicle> = async (createVehicleParams) => {
        if (!user || !user.externalId) return;

        const response = await createCar({
            ...createVehicleParams,
            user_id: user.externalId,
        });

        console.log(response);

        if (response?.status === 201) {
            onClose();
        }
    };

    return (
        <div className="fixed top-0 flex h-screen w-screen flex-col items-center justify-center backdrop-blur-sm">
            <div className="w-80 bg-white p-5">
                <button onClick={onClose}>X</button>
                <form
                    className="flex flex-col gap-1 p-5"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <label htmlFor="">Modelo:</label>
                    <input
                        className="border-2 p-2"
                        type="text"
                        {...register('name')}
                    />
                    {errors.name && <p>{errors.name.message}</p>}
                    <label htmlFor="">Marca:</label>
                    <input
                        className="border-2 p-2"
                        type="text"
                        {...register('brand')}
                    />
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
                    />
                </form>
            </div>
        </div>
    );
};

export default AddVehicleModal;
