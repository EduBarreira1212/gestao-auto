export const sellQueriesKeys = {
    getSells: () => ['sells'],
};

export const vehicleQueriesKeys = {
    getVehicleById: (vehicleId: string) => ['vehicle', vehicleId],
    getVehicles: () => ['vehicles'],
};