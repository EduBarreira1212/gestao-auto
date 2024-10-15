export type CreateUser = {
    name: string;
    email: string;
    password: number;
};

export type UpdateUser = {
    name?: string;
    email?: string;
    password?: number;
};

export type CreateCar = {
    user_id: string;
    name: string;
    brand: string;
    year: number;
    plate: string;
    entry_price: number;
};

export type UpdateCar = {
    name?: string;
    brand?: string;
    year?: number;
    plate?: string;
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
