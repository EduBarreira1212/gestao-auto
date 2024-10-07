import Expense from './components/Expense';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Sell from './components/Sell';
import Vehicle from './components/Vehicle';

const App = () => {
    return (
        <div className="flex flex-row">
            <Navbar />
            <div className="bg-brand-neutral w-full">
                <Header />
                <div className="p-3">
                    <Vehicle />
                    <Sell />
                    <Expense />
                </div>
            </div>
        </div>
    );
};

export default App;
