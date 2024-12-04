import { validate } from 'uuid';

export class GetLeadByIdController {
    constructor(getLeadByIdUseCase) {
        this.getLeadByIdUseCase = getLeadByIdUseCase;
    }

    async execute(httpRequest) {
        try {
            const leadId = httpRequest.params.leadId;

            const isIdValid = validate(leadId);

            if (!isIdValid) {
                return { statusCode: 400, body: { message: 'ID invalid' } };
            }

            const lead = await this.getLeadByIdUseCase.execute(leadId);

            if (!lead) {
                return { statusCode: 404, body: { message: 'Lead not found' } };
            }

            return { statusCode: 200, body: lead };
        } catch (error) {
            console.error(error);
            return { statusCode: 500, body: { error } };
        }
    }
}
