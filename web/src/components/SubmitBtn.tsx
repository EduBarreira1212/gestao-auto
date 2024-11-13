type SubmitBtnPropsType = {
    value: string;
    disabled: boolean;
};

const SubmitBtn = ({ value, disabled }: SubmitBtnPropsType) => {
    return (
        <input
            type="submit"
            value={value}
            disabled={disabled}
            className="cursor-pointer border-2 bg-brand-secondary p-2 text-brand-neutral transition-colors duration-200 hover:bg-[#070a1d] hover:text-brand-accent"
        />
    );
};

export default SubmitBtn;
