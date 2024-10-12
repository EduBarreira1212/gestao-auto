type AddButtonProps = {
    children: string;
    onClick: () => void;
};

const AddButton = ({ children, onClick }: AddButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="mt-2 rounded-md border-2 bg-brand-primary p-2 text-brand-neutral hover:text-brand-accent"
        >
            {children}
        </button>
    );
};

export default AddButton;
