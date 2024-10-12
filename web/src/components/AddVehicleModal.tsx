const AddVehicleModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="fixed top-0 flex h-screen w-screen flex-col items-center justify-center backdrop-blur-sm">
            <div className="bg-white p-5">
                <button onClick={onClose}>Fechar</button>
                <form className="flex flex-col gap-2">
                    <input className="border-2" type="text" />
                    <input className="border-2" type="text" />
                    <input className="border-2" type="number" />
                    <input className="border-2" type="string" />
                    <input className="border-2" type="number" />
                    <button>Adicionar</button>
                </form>
            </div>
        </div>
    );
};

export default AddVehicleModal;
