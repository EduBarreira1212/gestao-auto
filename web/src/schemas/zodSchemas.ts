import { z } from 'zod';

export const signUpSchema = z
    .object({
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
        confirmPassword: z.string(),
    })
    .superRefine((data, ctx) => {
        if (data.confirmPassword !== data.password) {
            ctx.addIssue({
                code: 'custom',
                path: ['confirmPassword'],
                message: 'As senhas não correspondem',
            });
        }
    });

export const addVehicleschema = z.object({
    name: z.string().trim().min(1, 'O modelo é obrigatório.'),
    brand: z.string().trim().min(1, 'A marca é obrigatória.'),
    year: z
        .number({ invalid_type_error: 'Ano deve ser um número.' })
        .min(1900, 'Ano deve ser maior que 1900.')
        .max(
            new Date().getFullYear() + 1,
            `Ano deve ser até ${new Date().getFullYear() + 1}.`
        ),
    plate: z
        .string()
        .regex(
            /^([A-Z]{3}-\d{4}|[A-Z]{3}\d[A-Z]\d{2})$/,
            'Placa deve estar no formato ABC-1234 ou ABC1D23.'
        ),
    km: z
        .number({ invalid_type_error: 'KM deve ser um número.' })
        .min(0, 'A KM não deve ser negativa.'),
    entry_price: z
        .number({ invalid_type_error: 'Preço de entrada deve ser um número.' })
        .positive('O preço de entrada deve ser positivo.'),
});

export const updateVehicleSchema = z.object({
    name: z.string().trim().optional(),
    brand: z.string().trim().optional(),
    year: z
        .number({ invalid_type_error: 'Ano deve ser um número.' })
        .min(1900, 'Ano deve ser maior que 1900.')
        .max(
            new Date().getFullYear() + 1,
            `Ano deve ser até ${new Date().getFullYear() + 1}.`
        )
        .nullable()
        .optional(),
    plate: z
        .string()
        .regex(
            /^([A-Z]{3}-\d{4}|[A-Z]{3}\d[A-Z]\d{2})$/,
            'Placa deve estar no formato ABC-1234 ou ABC1D23.'
        )
        .nullable()
        .optional(),
    km: z
        .number({ invalid_type_error: 'KM deve ser um número.' })
        .min(0, 'A KM não deve ser negativa.')
        .nullable()
        .optional(),
    entry_price: z
        .number({ invalid_type_error: 'Preço de entrada deve ser um número.' })
        .positive('O preço de entrada deve ser positivo.')
        .nullable()
        .optional(),
});

export const createSellSchema = z.object({
    amount: z
        .number({ invalid_type_error: 'O valor deve ser um número.' })
        .positive('O valor deve ser positivo.'),
    lead_id: z
        .string()
        .min(1, 'Por favor, selecione um lead válido.')
        .refine((val) => val !== '', {
            message: 'A seleção de um lead é obrigatória.',
        }),
});

export const updateSellSchema = z.object({
    amount: z
        .number({ invalid_type_error: 'O valor deve ser um número.' })
        .positive('O valor deve ser positivo.')
        .optional(),
    profit: z
        .number({ invalid_type_error: 'O lucro deve ser um número.' })
        .optional(),
});

export const createExpenseSchema = z.object({
    amount: z
        .number({ invalid_type_error: 'O valor deve ser um número.' })
        .positive('O valor deve ser positivo.'),
    description: z.string().trim().min(1, 'A descrição é obrigatória.'),
});

export const updateExpenseSchema = z.object({
    amount: z
        .number({ invalid_type_error: 'O valor deve ser um número.' })
        .positive('O valor deve ser positivo.')
        .optional(),
    description: z.string().trim().min(1, 'A descrição é obrigatória.').optional(),
});

export const addLeadSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, 'O nome deve ter no mínimo 2 caracteres')
        .max(50, 'O nome não pode exceder 50 caracteres'),

    email: z.string().trim().email('Formato de e-mail inválido'),
    phone: z
        .string()
        .regex(
            /^\(\d{2}\) \d{5}-\d{4}$/,
            "Telefone deve seguir o formato: '(xx) xxxxx-xxxx'"
        ),
    birthday: z.string({ required_error: 'A data de nascimento é obrigatória' }),
});

export const updateLeadSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, 'O nome deve ter no mínimo 2 caracteres')
        .max(50, 'O nome não pode exceder 50 caracteres')
        .optional(),

    email: z.string().trim().email('Formato de e-mail inválido').optional(),
    phone: z
        .string()
        .regex(
            /^\(\d{2}\) \d{5}-\d{4}$/,
            "Telefone deve seguir o formato: '(xx) xxxxx-xxxx'"
        )
        .optional(),
    birthday: z.string().optional(),
});
