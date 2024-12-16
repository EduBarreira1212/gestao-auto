type ButtonProps = {
    onClick: () => void;
    children: React.ReactNode;
};

const Button = ({ onClick, children }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="my-3 self-center rounded-sm border-2 border-solid bg-brand-secondary p-2 font-montserrat text-brand-neutral transition-colors duration-200 hover:bg-[#070a1d] hover:text-brand-accent"
        >
            {children}
        </button>
    );
};

export default Button;
