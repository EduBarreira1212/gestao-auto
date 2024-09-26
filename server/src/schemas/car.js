import { z } from 'zod';

export const createCarSchema = z.object({
    user_id: z
        .string({ required_error: 'User ID is required.' })
        .uuid({ message: 'User ID must be a valid UUID.' }),
    brand: z
        .string({ required_error: 'Car brand is required.' })
        .trim()
        .min(1, { message: 'Car brand cannot be empty or just spaces.' }),
    name: z
        .string({ required_error: 'Car name is required.' })
        .trim()
        .min(1, { message: 'Car name cannot be empty or just spaces.' }),
    year: z
        .number({ required_error: 'Car manufacturing year is required.' })
        .positive({ message: 'Car year must be a positive number.' }),
    plate: z
        .string({ required_error: 'License plate is required.' })
        .trim()
        .min(7, { message: 'License plate must be exactly 7 characters.' })
        .max(7, { message: 'License plate must be exactly 7 characters.' }),
    entry_price: z
        .number({ required_error: 'Entry price is required.' })
        .positive({ message: 'Entry price must be a positive number.' }),
});

export const updateCarSchema = createCarSchema
    .omit({ user_id: true })
    .partial()
    .strict({
        message: 'Some provided field is not allowed',
    });
