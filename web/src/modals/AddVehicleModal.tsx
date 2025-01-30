import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateVehicle } from '../types';
import { useUser } from '@clerk/clerk-react';
import { addVehicleschema } from '../schemas/zodSchemas';
import { useAddVehicle } from '../hooks/data/useAddVehicle';
import ModalContainer from '../components/ModalContainer';
import SubmitBtn from '../components/SubmitBtn';
import InputErrorMessage from '../components/InputErrorMessage';
import CloseModalBtn from '../components/CloseModalBtn';
import { useState } from 'react';

const AddVehicleModal = ({ onClose }: { onClose: () => void }) => {
    const { user } = useUser();

    const [photos, setPhotos] = useState<File[]>([]);

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

        const formData = new FormData();

        formData.append('user_id', user?.externalId);
        formData.append('name', createVehicleParams.name);
        formData.append('brand', createVehicleParams.brand);
        formData.append('year', createVehicleParams.year.toString());
        formData.append('plate', createVehicleParams.plate);
        formData.append('km', createVehicleParams.km.toString());
        formData.append('entry_price', createVehicleParams.entry_price.toString());

        photos.forEach((file: File) => {
            formData.append('photos', file);
        });

        mutate(formData, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;

        if (selectedFiles) {
            setPhotos((prevPhotos) => [...prevPhotos, ...Array.from(selectedFiles)]);
        }
    };

    return (
        <ModalContainer>
            <CloseModalBtn onClick={onClose} />
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
                <label>Fotos do veículo:</label>
                <input
                    className="border-2 p-2"
                    type="file"
                    {...register('photos')}
                    onChange={handleFileChange}
                    multiple
                />
                {errors.photos && (
                    <InputErrorMessage>{errors.photos.message}</InputErrorMessage>
                )}
                <div>
                    <h4>Fotos selecionadas:</h4>
                    {photos.map((file, index) => (
                        <p key={index}>{file.name}</p>
                    ))}
                </div>
                <SubmitBtn value="Adicionar veículo" disabled={isPending} />
            </form>
        </ModalContainer>
    );
};

export default AddVehicleModal;
