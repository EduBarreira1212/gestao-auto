const ContentSection = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-full w-full flex-1 flex-col items-center gap-10 overflow-auto p-3 md:gap-12">
            {children}
        </div>
    );
};

export default ContentSection;
