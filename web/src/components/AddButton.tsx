type AddButtonProps = {
    children: string;
    onClick: () => void;
};

const AddButton = ({ children, onClick }: AddButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="absolute left-1/2 mt-2 -translate-x-1/2 transform rounded-md border-2 bg-brand-primary p-2 text-brand-neutral transition-colors duration-200 hover:bg-[#009297] hover:text-brand-accent"
        >
            {children}
        </button>
    );
};

export default AddButton;
