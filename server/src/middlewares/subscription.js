export const subscriptionMiddleware = (req, res, next) => {
    console.log(req);

    const user = req.user;

    if (!user) {
        return res
            .status(401)
            .json({ error: 'Unauthorized. User not authenticated.' });
    }

    if (!user.paid) {
        return res
            .status(403)
            .json({ error: 'Access denied. Subscription required.' });
    }

    next();
};
