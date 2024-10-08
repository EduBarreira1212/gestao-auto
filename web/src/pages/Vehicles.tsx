import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Vehicle from '../components/Vehicle';

const Vehicles = () => {
    return (
        <div className="flex flex-row">
            <Navbar />
            <div className="w-full bg-brand-neutral">
                <Header />
                <div className="p-3">
                    <Vehicle />
                </div>
            </div>
        </div>
    );
};

export default Vehicles;
