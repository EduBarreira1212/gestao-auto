import { ClerkClientAdapter } from '../adapters/clerk-client.js';
import { makeGetUserByIdController } from '../factories/controllers/user.js';

export const subscriptionMiddleware = async (req, res, next) => {
    const clerkClientAdapter = new ClerkClientAdapter();

    const user = await clerkClientAdapter.getUser(req.auth.userId);

    const getUserById = makeGetUserByIdController();

    const modifiedRequest = {
        params: {
            userId: user.externalId,
        },
    };

    const { body } = await getUserById.execute(modifiedRequest);

    if (!body) {
        return res
            .status(401)
            .json({ error: 'Unauthorized. User not authenticated.' });
    }

    if (!body.paid) {
        return res
            .status(403)
            .json({ error: 'Access denied. Subscription required.' });
    }

    next();
};
