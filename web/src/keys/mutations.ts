export const sellMutationsKeys = {
    addSell: (carId: string) => ['addSell', carId],
    deleteSell: (sellId: string) => ['deleteSell', sellId],
    updateSell: (sellId: string) => ['updateSell', sellId],
};

export const vehicleMutationsKeys = {
    addVehicle: () => ['addVehicle'],
    deleteVehicle: (vehicleId: string) => ['deleteSell', vehicleId],
    updateVehicle: (vehicleId: string) => ['updateVehicle', vehicleId],
};
