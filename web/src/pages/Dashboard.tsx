import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Overview from '../components/Overview';
import Screen from '../components/Screen';

const Dashboard = () => {
    return (
        <Screen>
            <Navbar />
            <div className="flex w-full flex-col bg-brand-neutral">
                <Header />
                <div className="flex h-full flex-row items-center justify-center p-3">
                    <Overview />
                </div>
            </div>
        </Screen>
    );
};

export default Dashboard;
