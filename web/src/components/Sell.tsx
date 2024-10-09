import { useNavigate } from 'react-router-dom';
import Button from './Button';

const Sell = () => {
    const navigate = useNavigate();

    return (
        <div className="flex w-fit flex-col gap-3 rounded-md border-2 border-solid bg-slate-50 p-5 text-center text-brand-secondary shadow-md shadow-brand-primary">
            <span>Car</span>
            <span>Lead</span>
            <span>Total</span>
            <span>Profit</span>
            <span>Data da venda: 01/01/2000</span>
            <Button onClick={() => navigate('/')}>Ver detalhes</Button>
        </div>
    );
};

export default Sell;
