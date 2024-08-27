import { validate } from 'uuid';
import { GetUserById } from '../use-cases/get-user-by-id';

export class GetUserByIdCrontroller {
    async execute(httpRequest) {
        const isIdValid = validate(httpRequest.params.userId);

        if (!isIdValid) {
            return { status: 404, message: 'ID invalid' };
        }

        const getUserById = new GetUserById();

        const user = getUserById.execute(httpRequest.params.userIds);

        if (!user) {
            return { status: 404, message: 'User not found' };
        }

        return user;
    }
}
