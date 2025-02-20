import Button from './Button';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import CreateSellModal from '../modals/CreateSellModal';
import { ExpenseType } from '../types';
import AddExpenseModal from '../modals/AddExpenseModal';
import VehicleDetailsModal from '../modals/VehicleDetailsModal';
import DeleteVehicleModal from '../modals/DeleteVehicleModal';
import { SwiperSlide } from 'swiper/react';
import SwiperStyled from './SwiperStyled';
import fallbackImg from '../assets/icons/fallback-image.png';
import currencyFormatter from '../helpers/currency';

type ICar = {
    car: {
        id: string;
        user_id: string;
        name: string;
        brand: string;
        year: number;
        plate: string;
        km: number;
        renavam: string;
        fuel: string;
        chassis: string;
        entry_price: number;
        expenses: ExpenseType[];
        photoUrls: string[];
        sell: boolean;
        createdAt: Date;
    };
};

const Vehicle = ({ car }: ICar) => {
    const [showCreateSellModal, setShowCreateSellModal] = useState(false);
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
    const [showVehicleDetailsModal, setShowVehicleDetailsModal] = useState(false);
    const [showDeleteVehicleModal, setShowDeleteVehicleModal] = useState(false);

    const expensesAmount = car.expenses.reduce((acc, expense) => {
        return (acc += expense.amount);
    }, 0);

    return (
        <div className="relative flex w-80 flex-col gap-3 rounded-md border-2 border-solid bg-slate-50 p-5 text-center text-brand-secondary shadow-md shadow-brand-primary">
            <button
                className="absolute right-1 top-1 rounded-md bg-red-600 px-2 py-1 transition-colors duration-200 hover:bg-red-700"
                onClick={() => setShowDeleteVehicleModal(true)}
            >
                X
            </button>
            <div className="mt-5">
                {car.photoUrls.length > 0 ? (
                    <SwiperStyled>
                        {car.photoUrls.map((url: string, index: number) => (
                            <SwiperSlide key={index}>
                                <img
                                    className="h-64 w-full object-cover"
                                    src={url}
                                    alt={`Photo ${index}`}
                                />
                            </SwiperSlide>
                        ))}
                    </SwiperStyled>
                ) : (
                    <img
                        src={fallbackImg}
                        className="h-64 w-full object-cover"
                        alt="Fallback image"
                    />
                )}
            </div>
            <span className="text-lg">
                {car.brand} {car.name}
            </span>
            <span>{car.year}</span>
            <span>{car.plate}</span>
            <span>Combustível: {car.fuel}</span>
            <span>KM: {car.km.toLocaleString()}</span>
            <span>Renavam: {car.renavam}</span>
            <span>Chassi: {car.chassis}</span>
            <span>Preço de entrada: {currencyFormatter(car.entry_price)}</span>
            <div className="flex flex-row justify-between gap-2">
                <span>Despesas: {currencyFormatter(expensesAmount)}</span>
                <button
                    className="rounded-sm border-2 bg-brand-neutral px-1 font-montserrat shadow-sm"
                    onClick={() => setShowAddExpenseModal(true)}
                >
                    Adicionar
                </button>
            </div>
            <span>
                Data de entrada:{' '}
                {new Date(car.createdAt).toLocaleDateString('pt-BR')}
            </span>
            <div className="flex flex-row justify-center gap-4">
                <Button onClick={() => setShowVehicleDetailsModal(true)}>
                    Ver detalhes
                </Button>
                {!car.sell && (
                    <Button onClick={() => setShowCreateSellModal(true)}>
                        Vender
                    </Button>
                )}
            </div>
            {showDeleteVehicleModal &&
                createPortal(
                    <DeleteVehicleModal
                        vehicleId={car.id}
                        onClose={() => setShowDeleteVehicleModal(false)}
                    />,
                    document.body
                )}
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
                        vehicle={car}
                        onClose={() => setShowVehicleDetailsModal(false)}
                    />,
                    document.body
                )}
            {showCreateSellModal &&
                createPortal(
                    <CreateSellModal
                        carId={car.id}
                        expenses={expensesAmount}
                        entryPrice={car.entry_price}
                        onClose={() => setShowCreateSellModal(false)}
                    />,
                    document.body
                )}
        </div>
    );
};

export default Vehicle;
