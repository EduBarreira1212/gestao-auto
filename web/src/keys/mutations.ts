export const sellMutationsKeys = {
    addSell: (carId: string) => ['addSell', carId],
    deleteSell: (sellId: string) => ['deleteSell', sellId],
    updateSell: (sellId: string) => ['updateSell', sellId],
};

export const vehicleMutationsKeys = {
    addVehicle: () => ['addVehicle'],
    deleteVehicle: (vehicleId: string) => ['deleteVehicle', vehicleId],
    updateVehicle: (vehicleId: string) => ['updateVehicle', vehicleId],
};

export const expenseMutationsKeys = {
    addExpense: () => ['addExpense'],
    deleteExpense: (expenseId: string) => ['deleteExpense', expenseId],
    updateExpense: (expenseId: string) => ['updateExpense', expenseId],
};

export const leadMutationsKeys = {
    addLead: () => ['addLead'],
    deleteLead: (leadId: string) => ['deleteLead', leadId],
    updateLead: (leadId: string) => ['updateLead', leadId],
};
