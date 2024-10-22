const ModalContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="fixed top-0 flex h-screen w-screen flex-col items-center justify-center backdrop-blur-sm">
            <div className="w-80 bg-white p-5">{children}</div>
        </div>
    );
};

export default ModalContainer;
