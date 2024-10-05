const Header = () => {
    return (
        <header className="flex flex-row justify-between bg-gray-200 px-8 py-3">
            <h2>Page name</h2>
            <div className="flex gap-4">
                <a href="#">Page</a>
                <a href="#">Page</a>
                <a href="#">Page</a>
                <a href="#">Page</a>
            </div>
            <div>username</div>
        </header>
    );
};

export default Header;
