export const sellMutationsKeys = {
    addSell: (carId: string) => ['addSell', carId],
    deleteSell: (sellId: string) => ['deleteSell', sellId],
    updateSell: (sellId: string) => ['updateSell', sellId],
};

export const vehicleMutationsKeys = {
    addVehicle: () => ['addVehicle'],
};
