import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Sells from './pages/Sells';
import Vehicles from './pages/Vehicles';
import Expenses from './pages/Expenses';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/vendas" element={<Sells />} />
            <Route path="/veiculos" element={<Vehicles />} />
            <Route path="/despesas" element={<Expenses />} />
        </Routes>
    );
};

export default App;
