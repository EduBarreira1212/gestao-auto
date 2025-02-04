import Button from './Button';
import { SellType } from '../types';
import { useGetVehicleById } from '../hooks/data/useGetVehicleById';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import SellDetailsModal from '../modals/SellDetailsModal';
import DeleteSellModal from '../modals/DeleteSellModal';
import currencyFormatter from '../helpers/currency';
import { PDFViewer } from '@react-pdf/renderer';
import Receipt from './Receipt';

const Sell = ({ sell }: { sell: SellType }) => {
    const [showSellDetailsModal, setShowSelldetailsModal] = useState(false);
    const [showDeleteSellModal, setShowDeleteSellModal] = useState(false);

    const { data: vehicle } = useGetVehicleById(sell.car_id);

    return (
        <div className="flex h-fit w-72 flex-col gap-3 rounded-md border-2 border-solid bg-slate-50 p-5 text-center text-brand-secondary shadow-md shadow-brand-primary">
            <span>
                Veículo: {vehicle?.name} {vehicle?.year} {vehicle?.plate}
            </span>
            <span>Total: {currencyFormatter(sell.amount)}</span>
            <span>Lucro: {currencyFormatter(sell.profit)}</span>
            <span>
                Data da venda: {new Date(sell.createdAt).toLocaleDateString('pt-BR')}
            </span>
            <div className="flex flex-row justify-evenly">
                <Button onClick={() => setShowSelldetailsModal(true)}>
                    Ver detalhes
                </Button>
                <button
                    className="my-3 self-center rounded-sm border-2 border-solid bg-red-600 p-2 font-montserrat text-brand-neutral transition-colors duration-200 hover:bg-red-700"
                    onClick={() => setShowDeleteSellModal(true)}
                >
                    Excluir
                </button>
            </div>
            <PDFViewer>
                <Receipt />
            </PDFViewer>
            {showSellDetailsModal &&
                createPortal(
                    <SellDetailsModal
                        onClose={() => setShowSelldetailsModal(false)}
                        sellId={sell.id}
                    />,
                    document.body
                )}
            {showDeleteSellModal &&
                createPortal(
                    <DeleteSellModal
                        onClose={() => setShowDeleteSellModal(false)}
                        sellId={sell.id}
                    />,
                    document.body
                )}
        </div>
    );
};

export default Sell;
