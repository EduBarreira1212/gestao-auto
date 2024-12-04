import { validate } from 'uuid';

export class GetLeadsByUserIdController {
    constructor(getLeadsByUserIdUseCase) {
        this.getLeadsByUserIdUseCase = getLeadsByUserIdUseCase;
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.query.userId;

            if (!userId) {
                return {
                    statusCode: 400,
                    body: { message: 'User ID not provided' },
                };
            }

            const isIdValid = validate(userId);

            if (!isIdValid) {
                return { statusCode: 400, body: { message: 'ID invalid' } };
            }

            const leads = await this.getLeadsByUserIdUseCase(userId);

            if (!leads) {
                return { statusCode: 404, body: { message: 'Leads not found' } };
            }

            return { statusCode: 200, body: leads };
        } catch (error) {
            console.error(error);
            return { statusCode: 500, body: { error } };
        }
    }
}
