import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Sell from '../components/Sell';

const Sells = () => {
    return (
        <div className="flex flex-row">
            <Navbar />
            <div className="flex w-full flex-col bg-brand-neutral">
                <Header />
                <div className="flex h-full flex-1 flex-row flex-wrap items-center justify-center gap-5 overflow-auto p-3">
                    <Sell />
                    <Sell />
                    <Sell />
                    <Sell />
                    <Sell />
                    <Sell />
                    <Sell />
                    <Sell />
                </div>
            </div>
        </div>
    );
};

export default Sells;
