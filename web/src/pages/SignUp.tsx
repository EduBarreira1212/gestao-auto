import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import logo from '../assets/logo.png';
import { CreateUser } from '../types';
import createUser from '../services/user/createUser';

const schema = z.object({
    name: z
        .string()
        .trim()
        .min(2, 'O nome deve ter no mínimo 2 caracteres')
        .max(50, 'O nome não pode exceder 50 caracteres'),

    email: z.string().trim().email('Formato de e-mail inválido'),

    password: z
        .string()
        .trim()
        .min(8, 'A senha deve ter no mínimo 8 caracteres')
        .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
        .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
        .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
        .regex(
            /[@$!%*?&]/,
            'A senha deve conter pelo menos um caractere especial (@, $, !, %, *, ?, &)'
        )
        .max(100, 'A senha não pode exceder 100 caracteres'),
});

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateUser>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<CreateUser> = async (data) => {
        const response = await createUser(data);

        console.log(response);
    };

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-1 bg-brand-neutral">
            <img className="h-24" src={logo} alt="logo icon" />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex w-80 flex-col gap-1 rounded-md border-2 p-5 shadow-md"
            >
                <label htmlFor="">Name:</label>
                <input className="border-2 p-2" type="text" {...register('name')} />
                {errors.name && <p>{errors.name.message}</p>}
                <label htmlFor="">E-mail:</label>
                <input
                    className="border-2 p-2"
                    type="email"
                    {...register('email')}
                />
                {errors.email && <p>{errors.email.message}</p>}
                <label htmlFor="">Password:</label>
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
