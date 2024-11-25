import Header from '../components/Header';
import loading from '../assets/loading.png';
import Navbar from '../components/Navbar';
import Sell from '../components/Sell';
import ContentSection from '../components/ContentSection';
import List from '../components/List';
import { useUser } from '@clerk/clerk-react';
import { SellType } from '../types';
import { useGetSells } from '../hooks/data/useGetSells';
import Screen from '../components/Screen';

const Sells = () => {
    const { user } = useUser();

    const { data, isLoading } = useGetSells(user?.externalId ?? '');

    return (
        <Screen>
            <Navbar />
            <div className="flex w-full flex-col bg-brand-neutral">
                <Header />
                <ContentSection>
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
        </Screen>
    );
};

export default Sells;
