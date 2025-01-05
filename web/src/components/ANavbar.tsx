import { Link } from 'react-router-dom';

type ANavbarprops = {
    to: string;
    iconURL: string;
    children: React.ReactNode;
};

const ANavbar = ({ to, iconURL, children }: ANavbarprops) => {
    return (
        <Link
            to={to}
            className="flex items-center gap-1 font-poppins text-brand-secondary transition-all duration-200 hover:scale-110 hover:text-brand-accent"
        >
            <img src={iconURL} className="h-4" />
            {children}
        </Link>
    );
};

export default ANavbar;
