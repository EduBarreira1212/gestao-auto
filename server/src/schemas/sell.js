import { z } from 'zod';

export const createSellSchema = z.object({
    user_id: z
        .string({ required_error: 'User ID is required.' })
        .uuid({ message: 'User ID must be a valid UUID.' }),
    car_id: z
        .string({ required_error: 'Car ID is required.' })
        .uuid({ message: 'Car ID must be a valid UUID.' }),
    amount: z
        .number({ required_error: 'Sell amount is required.' })
        .positive({ message: 'Amount must be a positive number.' }),
    profit: z.number({ required_error: 'Profit is required.' }),
});

export const updateSellSchema = createSellSchema
    .omit({ user_id: true, car_id: true })
    .partial()
    .strict();
