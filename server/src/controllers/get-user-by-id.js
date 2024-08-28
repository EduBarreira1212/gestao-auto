import { validate } from 'uuid';
import { GetUserById } from '../use-cases/get-user-by-id.js';

export class GetUserByIdCrontroller {
    async execute(httpRequest) {
        try {
            const isIdValid = validate(httpRequest.params.userId);

            if (!isIdValid) {
                return { statusCode: 404, body: { message: 'ID invalid' } };
            }

            const getUserById = new GetUserById();

            const user = await getUserById.execute(httpRequest.params.userId);

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
