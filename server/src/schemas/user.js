import { z } from 'zod';

export const createUserSchema = z.object({
    name: z
        .string({ required_error: 'Name is a required field.' })
        .trim()
        .min(1, { message: 'Name cannot be empty or just spaces.' }),
    email: z
        .string({ required_error: 'Email is a required field.' })
        .email({ message: 'Please provide a valid email address.' }),
    password: z
        .string({ required_error: 'Password is a required field.' })
        .trim()
        .min(5, { message: 'Password must be at least 5 characters long.' }),
});

export const updateUserSchema = createUserSchema.partial().strict({
    message: 'Some provided field is not allowed',
});
