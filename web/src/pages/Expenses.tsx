import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Expense from '../components/Expense';
import ContentSection from '../components/ContentSection';
import List from '../components/List';
import { useUser } from '@clerk/clerk-react';
import { useGetVehicles } from '../hooks/data/useGetVehicles';
import { ExpenseType, VehicleType } from '../types';

const Expenses = () => {
    const { user } = useUser();

    const { data: vehicles } = useGetVehicles(user?.externalId ?? '');

    const expenses = vehicles?.flatMap((vehicle: VehicleType) => vehicle.expenses);

    return (
        <div className="flex h-screen w-full flex-row">
            <Navbar />
            <div className="flex w-full flex-col bg-brand-neutral">
                <Header />
                <ContentSection>
                    {expenses?.length > 0 ? (
                        <List>
                            {expenses.map((expense: ExpenseType) => (
                                <li key={expense.id}>
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
