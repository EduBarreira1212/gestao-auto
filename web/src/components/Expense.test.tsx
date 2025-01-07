import '@testing-library/jest-dom';
import ReactDOM from 'react-dom';
import { render, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import Expense from './Expense';
import { useGetVehicleById } from '../hooks/data/useGetVehicleById';
import userEvent from '@testing-library/user-event';
import { useDeleteExpense } from '../hooks/data/useDeleteExpense';
import { useUpdateExpense } from '../hooks/data/useUpdateExpense';

vi.mock('../hooks/data/useGetVehicleById', () => ({
    useGetVehicleById: vi.fn(),
}));

vi.mock('../hooks/data/useUpdateExpense', () => ({
    useUpdateExpense: vi.fn(),
}));

vi.mock('../hooks/data/useDeleteExpense', () => ({
    useDeleteExpense: vi.fn(),
}));

vi.mock('react-dom', async () => {
    const actual = await vi.importActual<typeof ReactDOM>('react-dom');
    return {
        ...actual,
        createPortal: (node: React.ReactNode) => node,
    };
});

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

        (useGetVehicleById as vi.Mock).mockReturnValue({
            data: mockVehicle,
        });

        (useUpdateExpense as vi.Mock).mockReturnValue({
            data: mockExpense,
        });

        (useDeleteExpense as vi.Mock).mockReturnValue({
            data: mockExpense,
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

    test('should opens and closes the expense details modal', async () => {
        const { getByText, queryByText } = render(<Expense expense={mockExpense} />);

        const detailsButton = getByText(/ver detalhes/i);
        await userEvent.click(detailsButton);

        await waitFor(() => {
            expect(getByText(/valor:/i)).toBeInTheDocument();
            expect(getByText(/descrição:/i)).toBeInTheDocument();
            expect(getByText(/atualizar/i)).toBeInTheDocument();
        });

        const closeButton = getByText('X');
        await userEvent.click(closeButton);

        expect(queryByText(/valor:/i)).not.toBeInTheDocument();
        expect(queryByText(/descrição:/i)).not.toBeInTheDocument();
        expect(queryByText(/atualizar/i)).not.toBeInTheDocument();
    });

    test('should opens and closes the delete expense modal', async () => {
        const { getByText, queryByText } = render(<Expense expense={mockExpense} />);

        const deleteButton = getByText(/excluir/i);
        await userEvent.click(deleteButton);

        expect(
            getByText(/tem certeza que deseja excluir essa despesa?/i)
        ).toBeInTheDocument();
        expect(getByText(/cancelar/i)).toBeInTheDocument();

        const closeButton = getByText(/cancelar/i);
        await userEvent.click(closeButton);

        expect(
            queryByText(/tem certeza que deseja excluir essa despesa?/i)
        ).not.toBeInTheDocument();
        expect(queryByText(/cancelar/i)).not.toBeInTheDocument();
    });
});
