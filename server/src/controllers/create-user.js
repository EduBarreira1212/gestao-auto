export class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            const requiredFields = ['name', 'email', 'password'];

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return {
                        statusCode: 404,
                        body: { message: `Missing ${field}` },
                    };
                }
            }

            const isPasswordValid = params.password.length >= 5;

            if (!isPasswordValid) {
                return { statusCode: 404, body: { message: 'Password invalid' } };
            }

            const user = await this.createUserUseCase.execute(params);

            return { statusCode: 201, body: user };
        } catch (error) {
            console.log(error);
            return { statusCode: 404, body: error };
        }
    }
}
