import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Expense from '../components/Expense';

const Expenses = () => {
    return (
        <div className="flex flex-row">
            <Navbar />
            <div className="w-full bg-brand-neutral">
                <Header />
                <div className="p-3">
                    <Expense />
                </div>
            </div>
        </div>
    );
};

export default Expenses;
