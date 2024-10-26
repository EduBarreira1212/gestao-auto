import ModalContainer from './ModalContainer';

type ExpenseModalProps = {
    carId: string;
    onClose: () => void;
};

const AddExpenseModal = ({ carId, onClose }: ExpenseModalProps) => {
    return (
        <ModalContainer>
            <button onClick={onClose}>X</button>
        </ModalContainer>
    );
};

export default AddExpenseModal;
