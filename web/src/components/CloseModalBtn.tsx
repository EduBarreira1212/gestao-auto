const CloseModalBtn = ({ onClick }: { onClick: () => void }) => {
    return (
        <button
            className="rounded-sm border-2 px-2 text-brand-secondary transition-colors duration-200 hover:bg-brand-neutral hover:text-brand-accent"
            onClick={onClick}
        >
            X
        </button>
    );
};

export default CloseModalBtn;
