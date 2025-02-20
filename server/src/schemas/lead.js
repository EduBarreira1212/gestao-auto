import { z } from 'zod';

export const createLeadSchema = z.object({
    user_id: z
        .string({ required_error: 'User ID is required.' })
        .uuid({ message: 'User ID must be a valid UUID.' }),
    name: z
        .string({ required_error: 'Lead name is required.' })
        .trim()
        .min(1, { message: 'Lead name cannot be empty or just spaces.' }),
    email: z
        .string({ required_error: 'Email is a required field.' })
        .email({ message: 'Please provide a valid email address.' }),
    phone: z
        .string({ required_error: 'Phone number is required.' })
        .regex(
            /^\(\d{2}\) \d{5}-\d{4}$/,
            "Phone number must follow the format '(xx) xxxxx-xxxx'"
        ),
    cpfCnpj: z
        .string()
        .regex(/^(?:\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$/, {
            message:
                'O campo deve ser um CPF (000.000.000-00) ou um CNPJ (00.000.000/0000-00)',
        }),
    birthday: z.date({ required_error: 'Birthday is required.' }),
});

export const updateLeadSchema = createLeadSchema
    .omit({ user_id: true })
    .partial()
    .strict({
        message: 'Some provided field is not allowed',
    });
