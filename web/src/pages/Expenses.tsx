import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Expense from '../components/Expense';
import ContentSection from '../components/ContentSection';
import { useEffect, useState } from 'react';
import List from '../components/List';
import getExpensesByCarId from '../services/expense/getExpensesByCarId';
import { useUser } from '@clerk/clerk-react';

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        if (!user || !user.externalId) return;
        const getExpenses = async () => {
            const expenseList = await getExpensesByCarId(user.externalId || '');

            setExpenses(expenseList);
        };

        getExpenses();
    }, []);

    return (
        <div className="flex h-screen w-full flex-row">
            <Navbar />
            <div className="flex w-full flex-col bg-brand-neutral">
                <Header />
                <ContentSection>
                    {expenses.length > 0 ? (
                        <List>
                            {expenses.map((expense, index) => (
                                <li key={index}>
                                    <Expense expense={expense} />
                                </li>
                            ))}
                        </List>
                    ) : (
                        <div>Nenhuma despesa encontrada</div>
                    )}
                </ContentSection>
            </div>
        </div>
    );
};

export default Expenses;
