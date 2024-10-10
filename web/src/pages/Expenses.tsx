import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Expense from '../components/Expense';

const Expenses = () => {
    return (
        <div className="flex h-screen w-full flex-row">
            <Navbar />
            <div className="flex w-full flex-col bg-brand-neutral">
                <Header />
                <div className="flex h-full flex-1 flex-row flex-wrap items-center justify-center gap-5 overflow-auto p-3">
                    <Expense />
                    <Expense />
                    <Expense />
                    <Expense />
                    <Expense />
                    <Expense />
                    <Expense />
                    <Expense />
                </div>
            </div>
        </div>
    );
};

export default Expenses;
