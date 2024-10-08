import Header from '../components/Header';
import Navbar from '../components/Navbar';

const Dashboard = () => {
    return (
        <div className="flex flex-row">
            <Navbar />
            <div className="w-full bg-brand-neutral">
                <Header />
                <div className="p-3"></div>
            </div>
        </div>
    );
};

export default Dashboard;
