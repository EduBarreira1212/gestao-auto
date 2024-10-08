import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Sell from '../components/Sell';

const Sells = () => {
    return (
        <div className="flex flex-row">
            <Navbar />
            <div className="w-full bg-brand-neutral">
                <Header />
                <div className="p-3">
                    <Sell />
                </div>
            </div>
        </div>
    );
};

export default Sells;
