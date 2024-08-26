import { CreateUserUseCase } from '../use-cases/create-user';

export class CreateUserController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;
            const createUserUseCase = new CreateUserUseCase();
            const user = await createUserUseCase.execute(params);
            return { statusCode: 201, body: user };
        } catch (error) {
            console.log(error);
        }
    }
}
