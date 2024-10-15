import { Routes, Route } from 'react-router-dom';
import { SignIn } from '@clerk/clerk-react';

import Dashboard from './pages/Dashboard';
import Sells from './pages/Sells';
import Vehicles from './pages/Vehicles';
import Expenses from './pages/Expenses';
import RootLayout from './layouts/RootLayout';
import DashboardLayout from './layouts/DashboardLayout';

const App = () => {
    return (
        <Routes>
            <Route element={<RootLayout />}>
                <Route path="/" element={<DashboardLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/vendas" element={<Sells />} />
                    <Route path="/veiculos" element={<Vehicles />} />
                    <Route path="/despesas" element={<Expenses />} />
                    <Route path="/sign-in" element={<SignIn />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default App;
