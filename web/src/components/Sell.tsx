import Button from './Button';
import { SellType } from '../types';
import { useGetVehicleById } from '../hooks/data/getVehicleById';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import SellDetailsModal from './SellDetailsModal';

const Sell = ({ sell }: { sell: SellType }) => {
    const [showSellDetailsModal, setShowSelldetailsModal] = useState(false);

    const { data: vehicle } = useGetVehicleById(sell.car_id);

    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    return (
        <div className="flex h-fit w-72 flex-col gap-3 rounded-md border-2 border-solid bg-slate-50 p-5 text-center text-brand-secondary shadow-md shadow-brand-primary">
            <span>
                Vehicle: {vehicle?.name} {vehicle?.year} {vehicle?.plate}
            </span>
            <span>Total: {formatter.format(sell.amount)}</span>
            <span>Lucro: {formatter.format(sell.profit)}</span>
            <span>
                Data da venda: {new Date(sell.createdAt).toLocaleDateString('pt-BR')}
            </span>
            <Button onClick={() => setShowSelldetailsModal(true)}>
                Ver detalhes
            </Button>
            {showSellDetailsModal &&
                createPortal(
                    <SellDetailsModal
                        onClose={() => setShowSelldetailsModal(false)}
                        sellId={sell.id}
                    />,
                    document.body
                )}
        </div>
    );
};

export default Sell;
