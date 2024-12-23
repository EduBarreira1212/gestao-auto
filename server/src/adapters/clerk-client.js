import clerkClient from '../../clerk/clerk.js';

export class ClerkClientAdapter {
    async getUser(userId) {
        return await clerkClient.users.getUser(userId);
    }

    async createUser(createClerkUserParams) {
        return await clerkClient.users.createUser(createClerkUserParams);
    }

    async deleteUser(userId) {
        return await clerkClient.users.deleteUser(userId);
    }

    async updateUser(userId, updateUserParams) {
        return await clerkClient.users.updateUser(userId, updateUserParams);
    }

    async createEmail(createEmailParams) {
        return await clerkClient.emailAddresses.createEmailAddress(
            createEmailParams
        );
    }

    async deleteEmail(emailId) {
        return await clerkClient.emailAddresses.deleteEmailAddress(emailId);
    }
}
