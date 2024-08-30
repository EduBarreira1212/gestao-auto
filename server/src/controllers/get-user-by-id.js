import { validate } from 'uuid';

export class GetUserByIdCrontroller {
    constructor(getUserByIdUseCase) {
        this.getUserByIdUseCase = getUserByIdUseCase;
    }
    async execute(httpRequest) {
        try {
            const isIdValid = validate(httpRequest.params.userId);

            if (!isIdValid) {
                return { statusCode: 404, body: { message: 'ID invalid' } };
            }

            const user = await this.getUserByIdUseCase.execute(
                httpRequest.params.userId
            );

            if (!user) {
                return { statusCode: 404, body: { message: 'User not found' } };
            }

            return { statusCode: 200, body: user };
        } catch (error) {
            console.log(error);
            return { statusCode: 500, body: { message: 'Server error' } };
        }
    }
}
