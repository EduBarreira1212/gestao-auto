import { validate } from 'uuid';

export class DeleteLeadController {
    constructor(deleteLeadUseCase) {
        this.deleteLeadUseCase = deleteLeadUseCase;
    }

    async execute(httpRequest) {
        try {
            const leadId = httpRequest.params.leadId;

            const isIdValid = validate(leadId);

            if (!isIdValid) {
                return { statusCode: 400, body: { message: 'ID invalid' } };
            }

            const deletedLead = await this.deleteLeadUseCase.execute(leadId);

            return { statusCode: 200, body: deletedLead };
        } catch (error) {
            console.error(error);
            return { statusCode: 500, body: { error } };
        }
    }
}
