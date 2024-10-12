import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Sell from '../components/Sell';
import getSellsByUserId from '../services/sell/getSellsByUserId';
import ContentSection from '../components/ContentSection';
import List from '../components/List';

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
                <ContentSection>
                    {sells.length > 0 ? (
                        <List>
                            {sells.map((sell, index) => (
                                <li key={index}>
                                    <Sell sell={sell}></Sell>
                                </li>
                            ))}
                        </List>
                    ) : (
                        <div>Nenhuma venda encontrada</div>
                    )}
                </ContentSection>
            </div>
        </div>
    );
};

export default Sells;
