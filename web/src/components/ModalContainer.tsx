const ModalContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="fixed top-0 flex h-screen w-screen flex-col items-center justify-center backdrop-blur-sm">
            <div className="max-h-[95%] w-80 overflow-auto bg-white p-5">
                {children}
            </div>
        </div>
    );
};

export default ModalContainer;
