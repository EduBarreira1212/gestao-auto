import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Vehicle from '../components/Vehicle';
import getCarsByUserId from '../services/car/getCarsByUserId';

const Vehicles = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const getCars = async () => {
            const carList = await getCarsByUserId(
                '25ce759d-bf3e-4f25-86ff-814839576bf7'
            );

            setCars(carList);
        };

        getCars();
    }, []);

    return (
        <div className="flex h-screen w-full">
            <Navbar />
            <div className="flex w-full flex-col bg-brand-neutral">
                <Header />
                <div className="flex h-full flex-1 flex-row flex-wrap items-center justify-center gap-5 overflow-auto p-3">
                    {cars.length > 0 ? (
                        cars.map((car, index) => (
                            <li key={index}>
                                <Vehicle car={car} />
                            </li>
                        ))
                    ) : (
                        <div>Nenhum veículo encontrado</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Vehicles;
