import { useDeleteVehicle } from '../hooks/data/useDeleteVehicle';
import ModalContainer from '../components/ModalContainer';
import CloseModalBtn from '../components/CloseModalBtn';

type DeleteVehicleModalProps = {
    vehicleId: string;
    onClose: () => void;
};

const DeleteVehicleModal = ({ vehicleId, onClose }: DeleteVehicleModalProps) => {
    const { mutate } = useDeleteVehicle(vehicleId);

    return (
        <ModalContainer>
            <CloseModalBtn onClick={onClose} />
            <div className="flex flex-col gap-3">
                <h2>Tem certeza que deseja excluir esse veículo?</h2>
                <div className="flex flex-row justify-evenly">
                    <button
                        className="my-3 self-center rounded-sm border-2 border-solid bg-slate-300 p-2 text-black"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className="my-3 self-center rounded-sm border-2 border-solid bg-red-600 p-2 text-brand-neutral transition-colors duration-200 hover:bg-red-700"
                        onClick={() => {
                            mutate(undefined, {
                                onSuccess: () => {
                                    onClose();
                                },
                            });
                        }}
                    >
                        Excluir
                    </button>
                </div>
            </div>
        </ModalContainer>
    );
};

export default DeleteVehicleModal;
