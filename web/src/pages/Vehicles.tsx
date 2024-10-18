import { useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Vehicle from '../components/Vehicle';
import getCarsByUserId from '../services/car/getCarsByUserId';
import ContentSection from '../components/ContentSection';
import AddButton from '../components/AddButton';
import List from '../components/List';
import { createPortal } from 'react-dom';
import AddVehicleModal from '../components/AddVehicleModal';
import { useUser } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';
import { VehicleType } from '../types';

const Vehicles = () => {
    const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);

    const { user } = useUser();

    const { data, isLoading } = useQuery({
        queryKey: ['vehicles'],
        queryFn: async () => {
            const response = await getCarsByUserId(user?.externalId ?? '');

            if (response?.status !== 200) {
                throw new Error();
            }

            return response?.data;
        },
    });

    if (isLoading) return <div>Loadin...</div>;

    return (
        <div className="flex h-screen w-full">
            <Navbar />
            <div className="flex w-full flex-col bg-brand-neutral">
                <Header />
                <ContentSection>
                    <AddButton onClick={() => setShowAddVehicleModal(true)}>
                        Adicionar novo veículo
                    </AddButton>
                    {data?.length > 0 ? (
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
        </div>
    );
};

export default Vehicles;
