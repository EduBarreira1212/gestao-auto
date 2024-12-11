import { SellType } from '../types';
import Button from './Button';

type LeadType = {
    lead: {
        id: string;
        user_id: string;
        name: string;
        email: string;
        phone: string;
        birthday: Date;
        purchases: SellType[];
        createdAt: Date;
    };
};

const Lead = ({ lead }: LeadType) => {
    return (
        <div className="flex w-fit flex-col gap-3 rounded-md border-2 border-solid bg-slate-50 p-5 text-center text-brand-secondary shadow-md shadow-brand-primary">
            <span>{lead.name}</span>
            <span>{lead.email}</span>
            <span>{lead.phone}</span>
            <span>{new Date(lead.birthday).toLocaleDateString('pt-BR')}</span>
            <span>{lead.purchases.toString()}</span>
            <span>
                Criado em: {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
            </span>
            <div className="flex flex-row justify-evenly">
                <Button onClick={() => console.log('Details')}>Ver detalhes</Button>
                <button className="my-3 self-center rounded-sm border-2 border-solid bg-red-600 p-2 font-montserrat text-brand-neutral transition-colors duration-200 hover:bg-red-700">
                    Excluir
                </button>
            </div>
        </div>
    );
};

export default Lead;
