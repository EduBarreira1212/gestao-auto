type ANavbarprops = {
    href: string;
    iconURL: string; // wrong type (Correct later)
    children: React.ReactNode;
};

const ANavbar = ({ href, iconURL, children }: ANavbarprops) => {
    return (
        <a href={href} className="flex items-center gap-1">
            <img src={iconURL} className="h-4" />
            {children}
        </a>
    );
};

export default ANavbar;
