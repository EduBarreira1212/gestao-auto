import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import Expense from './Expense';
import { useGetVehicleById } from '../hooks/data/useGetVehicleById';

vi.mock('../hooks/data/useGetVehicleById', () => ({
    useGetVehicleById: vi.fn(),
}));

describe('Expense', () => {
    const mockExpense = {
        id: 'id_test',
        car_id: 'carId_test',
        amount: 1000,
        description: 'lorem ipsum',
        createdAt: new Date('2025-01-02'),
    };

    const mockVehicle = {
        name: 'test vehicle',
        plate: 'ABC-1234',
        year: 2024,
    };

    beforeEach(() => {
        vi.resetAllMocks();

        // Mock vehicle data returned by the hook
        (useGetVehicleById as vi.Mock).mockReturnValue({
            data: mockVehicle,
        });
    });

    test('should render correctly', () => {
        const { getByText } = render(<Expense expense={mockExpense} />);

        expect(getByText(/veículo: test vehicle/i)).toBeInTheDocument();
        expect(getByText(/ABC-1234/i)).toBeInTheDocument();
        expect(getByText(/2024/i)).toBeInTheDocument();
        expect(getByText(/R\$ 1.000,00/i)).toBeInTheDocument();
        expect(getByText(/lorem ipsum/i)).toBeInTheDocument();
        expect(getByText(/01\/01\/2025/i)).toBeInTheDocument();
    });
});
