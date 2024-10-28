import Button from './Button';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import CreateSellModal from './CreateSellModal';
import { ExpenseType } from '../types';
import AddExpenseModal from './AddExpenseModal';
import VehicleDetailsModal from './VehicleDetailsModal';

type ICar = {
    car: {
        id: string;
        user_id: string;
        name: string;
        brand: string;
        year: number;
        plate: string;
        entry_price: number;
        expenses: ExpenseType[];
        createdAt: Date;
    };
};

const Vehicle = ({ car }: ICar) => {
    const [showCreateSellModal, setShowCreateSellModal] = useState(false);
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
    const [showVehicleDetailsModal, setShowVehicleDetailsModal] = useState(false);

    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    return (
        <div className="flex w-fit flex-col gap-3 rounded-md border-2 border-solid bg-slate-50 p-5 text-center text-brand-secondary shadow-md shadow-brand-primary">
            <span>{car.name}</span>
            <span>{car.brand}</span>
            <span>{car.year}</span>
            <span>{car.plate}</span>
            <span>Preço de entrada: {formatter.format(car.entry_price)}</span>
            <div className="flex flex-row justify-between gap-2">
                <span>Despesas: {car.expenses.length}</span>
                <button
                    className="rounded-sm border-2 bg-brand-neutral shadow-sm"
                    onClick={() => setShowAddExpenseModal(true)}
                >
                    Adicionar
                </button>
            </div>
            <span>
                Data de entrada:{' '}
                {new Date(car.createdAt).toLocaleDateString('pt-BR')}
            </span>
            <div className="flex flex-row justify-between">
                <Button onClick={() => setShowVehicleDetailsModal(true)}>
                    Ver detalhes
                </Button>
                <Button onClick={() => setShowCreateSellModal(true)}>Vender</Button>
            </div>
            {showAddExpenseModal &&
                createPortal(
                    <AddExpenseModal
                        carId={car.id}
                        onClose={() => setShowAddExpenseModal(false)}
                    />,
                    document.body
                )}
            {showVehicleDetailsModal &&
                createPortal(
                    <VehicleDetailsModal
                        vehicleId={car.id}
                        onClose={() => setShowVehicleDetailsModal(false)}
                    />,
                    document.body
                )}
            {showCreateSellModal &&
                createPortal(
                    <CreateSellModal
                        carId={car.id}
                        onClose={() => setShowCreateSellModal(false)}
                    />,
                    document.body
                )}
        </div>
    );
};

export default Vehicle;
