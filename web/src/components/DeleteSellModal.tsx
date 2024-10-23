import { useDeleteSell } from '../hooks/data/useDeleteSell';
import ModalContainer from './ModalContainer';

type DeleteSellModalProps = {
    sellId: string;
    onClose: () => void;
};

const DeleteSellModal = ({ sellId, onClose }: DeleteSellModalProps) => {
    const { mutate } = useDeleteSell(sellId);

    return (
        <ModalContainer>
            <button onClick={onClose}>X</button>
            <div className="flex flex-col gap-3">
                <h2>Tem certeza que deseja excluir essa venda?</h2>
                <div className="flex flex-row justify-evenly">
                    <button
                        className="my-3 self-center rounded-sm border-2 border-solid bg-slate-300 p-2 text-black"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className="my-3 self-center rounded-sm border-2 border-solid bg-red-600 p-2 text-brand-neutral"
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

export default DeleteSellModal;
