import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Sell from '../components/Sell';
import getSellsByUserId from '../services/sell/getSellsByUserId';

const Sells = () => {
    const [sells, setSells] = useState([]);

    useEffect(() => {
        const getSellList = async () => {
            const sellList = await getSellsByUserId(
                '25ce759d-bf3e-4f25-86ff-814839576bf7'
            );

            setSells(sellList);
        };

        getSellList();
    }, []);

    return (
        <div className="flex flex-row">
            <Navbar />
            <div className="flex w-full flex-col bg-brand-neutral">
                <Header />
                <div className="flex h-full flex-1 flex-row flex-wrap items-center justify-center gap-5 overflow-auto p-3">
                    {sells.length > 0 ? (
                        sells.map((sell, index) => (
                            <li key={index}>
                                <Sell sell={sell}></Sell>
                            </li>
                        ))
                    ) : (
                        <div>Nenhuma venda encontrada</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sells;
