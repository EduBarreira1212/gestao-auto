export const userQueriesKeys = {
    getUserById: (userId: string) => ['user', userId],
};

export const sellQueriesKeys = {
    getSells: () => ['sells'],
};

export const vehicleQueriesKeys = {
    getVehicleById: (vehicleId: string) => ['vehicle', vehicleId],
    getVehicles: () => ['vehicles'],
};

export const leadQueriesKeys = {
    getLeadById: (leadId: string) => ['lead', leadId],
    getLeads: () => ['leads'],
};
