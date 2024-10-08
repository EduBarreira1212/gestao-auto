import { Link } from 'react-router-dom';

type ANavbarprops = {
    to: string;
    iconURL: string;
    children: React.ReactNode;
};

const ANavbar = ({ to, iconURL, children }: ANavbarprops) => {
    return (
        <Link to={to} className="flex items-center gap-1 hover:text-brand-accent">
            <img src={iconURL} className="h-4" />
            {children}
        </Link>
    );
};

export default ANavbar;
