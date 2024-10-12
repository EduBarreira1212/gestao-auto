const List = ({ children }: { children: React.ReactNode }) => {
    return (
        <ul className="flex list-none flex-row flex-wrap items-center justify-center gap-5">
            {children}
        </ul>
    );
};

export default List;
