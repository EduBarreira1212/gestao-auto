import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Overview from '../components/Overview';

const Dashboard = () => {
    return (
        <div className="flex h-screen w-full flex-row">
            <Navbar />
            <div className="flex w-full flex-col bg-brand-neutral">
                <Header />
                <div className="flex h-full flex-row items-center justify-center p-3">
                    <Overview />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
