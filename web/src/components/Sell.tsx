import { useNavigate } from 'react-router-dom';
import Button from './Button';

type ISell = {
    sell: {
        id: string;
        user_id: string;
        car_id: string;
        amount: number;
        profit: number;
        createdAt: string;
    };
};

const Sell = ({ sell }: ISell) => {
    const navigate = useNavigate();

    return (
        <div className="flex w-fit flex-col gap-3 rounded-md border-2 border-solid bg-slate-50 p-5 text-center text-brand-secondary shadow-md shadow-brand-primary">
            <span>Car: {sell.car_id}</span>
            <span>Total: {sell.amount}</span>
            <span>Profit: {sell.profit}</span>
            <span>Data da venda: {sell.createdAt}</span>
            <Button onClick={() => navigate('/')}>Ver detalhes</Button>
        </div>
    );
};

export default Sell;
