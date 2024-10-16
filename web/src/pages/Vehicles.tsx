import { useEffect, useState } from 'react';
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

const Vehicles = () => {
    const [cars, setCars] = useState([]);
    const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);

    const { user } = useUser();

    useEffect(() => {
        if (!user || !user.externalId) return;

        const getCars = async () => {
            const carList = await getCarsByUserId(user.externalId ?? '');

            setCars(carList);
        };

        getCars();
    }, [user]);

    return (
        <div className="flex h-screen w-full">
            <Navbar />
            <div className="flex w-full flex-col bg-brand-neutral">
                <Header />
                <ContentSection>
                    <AddButton onClick={() => setShowAddVehicleModal(true)}>
                        Adicionar novo veículo
                    </AddButton>
                    {cars.length > 0 ? (
                        <List>
                            {cars.map((car, index) => (
                                <li key={index}>
                                    <Vehicle car={car} />
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
