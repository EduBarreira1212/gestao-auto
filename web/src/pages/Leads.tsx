import { useUser } from '@clerk/clerk-react';
import loading from '../assets/icons/loading.png';
import AddButton from '../components/AddButton';
import ContentSection from '../components/ContentSection';
import Header from '../components/Header';
import Lead from '../components/Lead';
import Navbar from '../components/Navbar';
import Screen from '../components/Screen';
import { useGetLeads } from '../hooks/data/useGetLeads';
import List from '../components/List';
import { LeadType } from '../types';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import AddLeadModal from '../modals/AddLeadModal';

const Leads = () => {
    const [showAddLeadModal, setShowAddLeadModal] = useState(false);

    const { user } = useUser();

    const { data: leads, isLoading } = useGetLeads(user?.externalId ?? '');

    return (
        <Screen>
            <Navbar />
            <div className="flex w-full flex-col bg-brand-neutral">
                <Header />
                <ContentSection>
                    <div className="relative mt-4 flex w-full items-center">
                        <AddButton onClick={() => setShowAddLeadModal(true)}>
                            Adicionar novo lead
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
                    ) : Array.isArray(leads) && leads?.length > 0 ? (
                        <List>
                            {leads.map((lead: LeadType) => (
                                <li key={lead.id}>
                                    <Lead lead={lead} />
                                </li>
                            ))}
                        </List>
                    ) : (
                        <div>Nenhum lead encontrado</div>
                    )}
                </ContentSection>
            </div>
            {showAddLeadModal &&
                createPortal(
                    <AddLeadModal onClose={() => setShowAddLeadModal(false)} />,
                    document.body
                )}
        </Screen>
    );
};

export default Leads;
