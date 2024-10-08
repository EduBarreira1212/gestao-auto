import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Vehicle from '../components/Vehicle';

const Vehicles = () => {
    return (
        <div className="flex h-screen w-full">
            <Navbar />
            <div className="flex w-full flex-col bg-brand-neutral">
                <Header />
                <div className="flex h-full flex-1 flex-row flex-wrap items-center justify-center gap-5 overflow-auto p-3">
                    <Vehicle />
                    <Vehicle />
                    <Vehicle />
                    <Vehicle />
                    <Vehicle />
                    <Vehicle />
                    <Vehicle />
                    <Vehicle />
                    <Vehicle />
                </div>
            </div>
        </div>
    );
};

export default Vehicles;
