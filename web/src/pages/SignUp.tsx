import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSignIn } from '@clerk/clerk-react';

import logo from '../assets/logo.png';
import createUser from '../services/user/createUser';
import { signUpSchema } from '../schemas/zodSchemas';
import InputErrorMessage from '../components/InputErrorMessage';

const SignUp = () => {
    const { signIn, setActive } = useSignIn();

    type CreateUserForm = z.infer<typeof signUpSchema>;

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<CreateUserForm>({
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit: SubmitHandler<CreateUserForm> = async (createUserParams) => {
        const { email, name, password } = createUserParams;
        const response = await createUser({ email, name, password });

        if (!response) {
            setError('email', {
                type: 'manual',
                message: 'E-mail já está em uso.',
            });
        }

        if (response?.status === 201 && response.data) {
            await signIn?.create({
                identifier: response.data.email,
                strategy: 'password',
                password: createUserParams.password,
            });

            if (signIn?.createdSessionId) {
                await setActive({
                    session: signIn.createdSessionId,
                });
            }
        }
    };

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-3 bg-brand-neutral">
            <img className="h-24" src={logo} alt="logo icon" />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex w-80 flex-col gap-1 rounded-md border-2 p-5 shadow-md"
            >
                <label htmlFor="">Nome:</label>
                <input className="border-2 p-2" type="text" {...register('name')} />
                {errors.name && (
                    <InputErrorMessage>{errors.name.message}</InputErrorMessage>
                )}
                <label htmlFor="">E-mail:</label>
                <input
                    className="border-2 p-2"
                    type="email"
                    {...register('email')}
                />
                {errors.email && (
                    <InputErrorMessage>{errors.email.message}</InputErrorMessage>
                )}
                <label htmlFor="">Senha:</label>
                <input
                    className="border-2 p-2"
                    type="password"
                    {...register('password')}
                />
                {errors.password && (
                    <InputErrorMessage>{errors.password.message}</InputErrorMessage>
                )}
                <label htmlFor="">Confirme sua senha:</label>
                <input
                    className="border-2 p-2"
                    type="password"
                    {...register('confirmPassword')}
                />
                {errors.confirmPassword && (
                    <InputErrorMessage>
                        {errors.confirmPassword.message}
                    </InputErrorMessage>
                )}
                <input
                    className="mt-3 cursor-pointer border-2 bg-brand-secondary p-2 text-brand-neutral transition-colors duration-200 hover:bg-[#070a1d] hover:text-brand-accent"
                    type="submit"
                    value="Criar conta"
                />
            </form>
        </div>
    );
};

export default SignUp;
