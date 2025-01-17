import { useMemo, useState } from 'react';
import loading from '../assets/icons/loading.png';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Vehicle from '../components/Vehicle';
import ContentSection from '../components/ContentSection';
import AddButton from '../components/AddButton';
import List from '../components/List';
import { createPortal } from 'react-dom';
import AddVehicleModal from '../modals/AddVehicleModal';
import { useUser } from '@clerk/clerk-react';
import { VehicleType } from '../types';
import { useGetVehicles } from '../hooks/data/useGetVehicles';
import Screen from '../components/Screen';

const Vehicles = () => {
    const [filter, setFilter] = useState('all');
    const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);

    const { user } = useUser();

    const { data, isLoading } = useGetVehicles(user?.externalId ?? '');

    const filteredData = useMemo(() => {
        if (filter === 'all') return data;
        if (filter === 'stock') {
            return data.filter((vehicle: VehicleType) => vehicle.sell === null);
        }
        if (filter === 'sold') {
            return data.filter((vehicle: VehicleType) => vehicle.sell !== null);
        }
        return [];
    }, [filter, data]);

    return (
        <Screen>
            <Navbar />
            <div className="flex w-full flex-col bg-brand-neutral">
                <Header />
                <ContentSection>
                    <div className="relative flex w-full items-center">
                        <div className="flex gap-1">
                            <button
                                className={`rounded-md border-2 bg-brand-secondary p-1 text-brand-neutral ${filter === 'all' ? 'border-brand-primary text-brand-accent' : ''}`}
                                onClick={() => setFilter('all')}
                            >
                                Todos
                            </button>
                            <button
                                className={`rounded-md border-2 bg-brand-secondary p-1 text-brand-neutral ${filter === 'stock' ? 'border-brand-primary text-brand-accent' : ''}`}
                                onClick={() => setFilter('stock')}
                            >
                                Estoque
                            </button>
                            <button
                                className={`rounded-md border-2 bg-brand-secondary p-1 text-brand-neutral ${filter === 'sold' ? 'border-brand-primary text-brand-accent' : ''}`}
                                onClick={() => setFilter('sold')}
                            >
                                Vendidos
                            </button>
                        </div>
                        <AddButton onClick={() => setShowAddVehicleModal(true)}>
                            Adicionar novo veículo
                        </AddButton>
                    </div>
                    {isLoading ? (
                        <div className="flex h-full w-full items-center justify-center">
                            <img
                                src={loading}
                                alt="loading"
                                className="size-12 animate-spin md:size-14"
                            />
                        </div>
                    ) : Array.isArray(filteredData) && filteredData?.length > 0 ? (
                        <List>
                            {filteredData.map((vehicle: VehicleType) => (
                                <li key={vehicle.id}>
                                    <Vehicle car={vehicle} />
                                </li>
                            ))}
                        </List>
                    ) : (
                        <div>Nenhum veículo encontrado</div>
                    )}
                </ContentSection>
            </div>
            {showAddVehicleModal &&
                createPortal(
                    <AddVehicleModal
                        onClose={() => setShowAddVehicleModal(false)}
                    />,
                    document.body
                )}
        </Screen>
    );
};

export default Vehicles;
