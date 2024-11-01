const Screen = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex h-screen w-full flex-row">{children}</div>;
};

export default Screen;
