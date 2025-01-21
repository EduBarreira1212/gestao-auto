import { z } from 'zod';

const fileSchema = z.object({
    originalname: z.string().min(1, 'Nome do arquivo é obrigatório'),
    mimetype: z.enum(['image/jpeg', 'image/png'], {
        message: 'Apenas arquivos JPEG e PNG são permitidos',
    }),
    size: z
        .number()
        .max(5 * 1024 * 1024, 'O tamanho do arquivo deve ser no máximo 5MB'),
});

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
        .min(7, { message: 'License plate must have more than 7 characters.' })
        .max(8, { message: 'License plate must have less than 8 characters.' }),
    km: z
        .number({ required_error: 'KM is required.' })
        .nonnegative({ message: 'KM must not be a negative number.' }),
    entry_price: z
        .number({ required_error: 'Entry price is required.' })
        .positive({ message: 'Entry price must be a positive number.' }),
    photos: z.array(fileSchema).max(5, 'O limite são 5 arquivos').optional(),
});

export const updateCarSchema = createCarSchema
    .omit({ user_id: true })
    .partial()
    .strict({
        message: 'Some provided field is not allowed',
    });
