type ButtonProps = {
    onClick: () => void;
    children: React.ReactNode;
};

const Button = ({ onClick, children }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="my-3 self-center rounded-sm border-2 border-solid bg-brand-secondary p-2 text-brand-neutral hover:text-brand-accent"
        >
            {children}
        </button>
    );
};

export default Button;
