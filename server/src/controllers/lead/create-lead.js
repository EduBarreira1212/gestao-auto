import { ZodError } from 'zod';
import { createLeadSchema } from '../../schemas/lead.js';

export class CreateLeadController {
    constructor(createLeadUseCase) {
        this.createLeadUseCase = createLeadUseCase;
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            const createLeadParams = {
                ...params,
                birthday: new Date(params.birthday),
            };

            await createLeadSchema.parseAsync(createLeadParams);

            const createdLead =
                await this.createLeadUseCase.execute(createLeadParams);

            return { statusCode: 201, body: createdLead };
        } catch (error) {
            console.error(error);
            if (error instanceof ZodError) {
                return {
                    statusCode: 400,
                    body: { message: error.errors[0].message },
                };
            }
            return { statusCode: 500, body: { error } };
        }
    }
}
