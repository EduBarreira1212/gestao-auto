import { useState } from 'react';
import loading from '../assets/loading.png';
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
    const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);

    const { user } = useUser();

    const { data, isLoading } = useGetVehicles(user?.externalId ?? '');

    return (
        <Screen>
            <Navbar />
            <div className="flex w-full flex-col bg-brand-neutral">
                <Header />
                <ContentSection>
                    <AddButton onClick={() => setShowAddVehicleModal(true)}>
                        Adicionar novo veículo
                    </AddButton>
                    {isLoading ? (
                        <div className="flex h-full w-full items-center justify-center">
                            <img
                                src={loading}
                                alt="loading"
                                className="size-12 animate-spin md:size-14"
                            />
                        </div>
                    ) : Array.isArray(data) && data?.length > 0 ? (
                        <List>
                            {data.map((vehicle: VehicleType) => (
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
