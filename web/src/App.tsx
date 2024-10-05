import Header from './components/Header';
import Navbar from './components/Navbar';

const App = () => {
    return (
        <div className="flex flex-row">
            <Navbar />
            <div className="w-full">
                <Header />
            </div>
        </div>
    );
};

export default App;
