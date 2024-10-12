const AddButton = ({ children }: { children: string }) => {
    return (
        <button className="mt-2 rounded-md border-2 bg-brand-primary p-2 text-brand-neutral hover:text-brand-accent">
            {children}
        </button>
    );
};

export default AddButton;
