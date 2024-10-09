import { useNavigate } from 'react-router-dom';
import Button from './Button';

const Vehicle = () => {
    const navigate = useNavigate();

    return (
        <div className="flex w-fit flex-col gap-3 rounded-md border-2 border-solid bg-slate-50 p-5 text-center text-brand-secondary shadow-md shadow-brand-primary">
            <span>Model</span>
            <span>Brand</span>
            <span>Year</span>
            <span>Plate</span>
            <span>EntryPrice</span>
            <span>Despesas totais: 0</span>
            <span>Tempo em estoque: 0 Dias</span>
            <div className="flex flex-row justify-between">
                <Button onClick={() => navigate('/')}>Ver detalhes</Button>
                <Button onClick={() => navigate('/')}>Vender</Button>
            </div>
        </div>
    );
};

export default Vehicle;
