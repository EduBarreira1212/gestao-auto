import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Sell from '../components/Sell';
import ContentSection from '../components/ContentSection';
import List from '../components/List';
import { useUser } from '@clerk/clerk-react';
import { SellType } from '../types';
import { useGetSells } from '../hooks/data/getSells';

const Sells = () => {
    const { user } = useUser();

    const { data, isLoading } = useGetSells(user?.externalId ?? '');

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="flex flex-row">
            <Navbar />
            <div className="flex w-full flex-col bg-brand-neutral">
                <Header />
                <ContentSection>
                    {data?.length > 0 ? (
                        <List>
                            {data.map((sell: SellType) => (
                                <li key={sell.id}>
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
