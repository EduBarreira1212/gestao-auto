export type CreateUser = {
    name: string;
    email: string;
    password: string;
};

export type UpdateUser = {
    name?: string;
    email?: string;
    password?: string;
};

export type CreateVehicle = {
    user_id: string;
    name: string;
    brand: string;
    year: number;
    plate: string;
    km: number;
    entry_price: number;
};

export type UpdateVehicle = {
    name?: string;
    brand?: string;
    year?: number;
    plate?: string;
    km?: number;
    entry_price?: number;
};

export type CreateExpense = {
    car_id: string;
    amount: number;
    description: string;
};

export type UpdateExpense = {
    amount?: number;
    description?: string;
};

export type CreateSell = {
    user_id: string;
    car_id: string;
    amount: number;
    profit: number;
};

export type UpdateSell = {
    amount?: number;
    profit?: number;
};

export type VehicleType = {
    id: string;
    user_id: string;
    name: string;
    brand: string;
    year: number;
    plate: string;
    km: number;
    entry_price: number;
    expenses: ExpenseType[];
    createdAt: Date;
};

export type SellType = {
    id: string;
    user_id: string;
    car_id: string;
    amount: number;
    profit: number;
    createdAt: Date;
};

export type ExpenseType = {
    id: string;
    car_id: string;
    amount: number;
    description: string;
    createdAt: Date;
};
