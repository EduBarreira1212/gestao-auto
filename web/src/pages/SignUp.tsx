import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignIn } from '@clerk/clerk-react';

import logo from '../assets/logo.png';
import { CreateUser } from '../types';
import createUser from '../services/user/createUser';
import { signUpSchema } from '../schemas/zodSchemas';

const SignUp = () => {
    const { signIn, setActive } = useSignIn();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateUser>({
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit: SubmitHandler<CreateUser> = async (createUserParams) => {
        const response = await createUser(createUserParams);

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
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-1 bg-brand-neutral">
            <img className="h-24" src={logo} alt="logo icon" />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex w-80 flex-col gap-1 rounded-md border-2 p-5 shadow-md"
            >
                <label htmlFor="">Nome:</label>
                <input className="border-2 p-2" type="text" {...register('name')} />
                {errors.name && <p>{errors.name.message}</p>}
                <label htmlFor="">E-mail:</label>
                <input
                    className="border-2 p-2"
                    type="email"
                    {...register('email')}
                />
                {errors.email && <p>{errors.email.message}</p>}
                <label htmlFor="">Senha:</label>
                <input
                    className="border-2 p-2"
                    type="password"
                    {...register('password')}
                />
                {errors.password && <p>{errors.password.message}</p>}
                <input
                    className="cursor-pointer border-2 bg-brand-secondary p-2 text-brand-primary hover:text-brand-accent"
                    type="submit"
                    value="Criar conta"
                />
            </form>
        </div>
    );
};

export default SignUp;
