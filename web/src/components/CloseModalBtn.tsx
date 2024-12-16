const CloseModalBtn = ({ onClick }: { onClick: () => void }) => {
    return (
        <button className="border-2" onClick={onClick}>
            X
        </button>
    );
};

export default CloseModalBtn;
