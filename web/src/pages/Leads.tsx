import AddButton from '../components/AddButton';
import ContentSection from '../components/ContentSection';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Screen from '../components/Screen';

const Leads = () => {
    return (
        <Screen>
            <Navbar />
            <div className="flex w-full flex-col bg-brand-neutral">
                <Header />
                <ContentSection>
                    <AddButton onClick={() => console.log('Lead')}>
                        Adicionar novo lead
                    </AddButton>
                    <div>Nenhum lead encontrado</div>
                </ContentSection>
            </div>
        </Screen>
    );
};

export default Leads;
