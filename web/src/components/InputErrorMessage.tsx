const InputErrorMessage = ({ children }: { children: string | undefined }) => {
    return <p className="text-base font-semibold text-red-500">{children}</p>;
};

export default InputErrorMessage;
