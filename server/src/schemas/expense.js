import { z } from 'zod';

export const createExpenseSchema = z.object({
    car_id: z
        .string({ required_error: 'Car ID is required.' })
        .uuid({ message: 'Car ID must be a valid UUID.' }),
    amount: z
        .number({ required_error: 'Sell amount is required.' })
        .positive({ message: 'Amount must be a positive number.' }),
    description: z.string({ required_error: 'Description is required.' }),
});

export const updateExpenseSchema = createExpenseSchema
    .omit({ car_id: true })
    .partial()
    .strict();
