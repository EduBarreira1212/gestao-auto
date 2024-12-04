import { ZodError } from 'zod';
import { updateLeadSchema } from '../../schemas/lead.js';
import { validate } from 'uuid';

export class UpdateLeadController {
    constructor(updateLeadUseCase) {
        this.updateLeadUseCase = updateLeadUseCase;
    }

    async execute(httpRequest) {
        try {
            const leadId = httpRequest.params.leadId;

            const isIdValid = validate(leadId);

            if (!isIdValid) {
                return { statusCode: 400, body: 'Lead ID invalid' };
            }

            const params = httpRequest.body;

            if (params.birthday) {
                params.birthday = new Date(params.birthday);
            }

            await updateLeadSchema.parseAsync(params);

            const updatedLead = await this.updateLeadUseCase.execute(params);

            return { statusCode: 200, body: updatedLead };
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
