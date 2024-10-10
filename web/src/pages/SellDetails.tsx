import { useParams } from 'react-router-dom';

const SellDetails = () => {
    const { sellId } = useParams();

    return <div>{sellId}</div>;
};

export default SellDetails;
