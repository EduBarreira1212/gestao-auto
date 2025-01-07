import '@testing-library/jest-dom';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import Header from './Header';
import { render } from '@testing-library/react';
import { useUser } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

vi.mock('@clerk/clerk-react', () => ({
    useUser: vi.fn(),
    UserButton: () => <div data-testid="user-button">Mock User Button</div>,
}));

describe('Header', () => {
    beforeEach(() => {
        vi.resetAllMocks();

        (useUser as vi.Mock).mockReturnValue({
            user: {
                fullName: 'test user',
            },
        });
    });

    test('should render correctly', () => {
        const { getByText, getByTestId } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        expect(getByText(/vendas/i)).toBeInTheDocument();
        expect(getByText(/veículos/i)).toBeInTheDocument();
        expect(getByText(/despesas/i)).toBeInTheDocument();
        expect(getByText(/leads/i)).toBeInTheDocument();
        expect(getByTestId('user-button')).toBeInTheDocument();
        expect(getByText(/test user/i)).toBeInTheDocument();
    });

    test('should open and close navbar modal correctly', async () => {
        const { getByText } = render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const navbarButton = getByText('>');

        expect(navbarButton).toBeInTheDocument();

        await userEvent.click(navbarButton);

        const closeNavbarButton = getByText('<');

        expect(closeNavbarButton).toBeInTheDocument();

        await userEvent.click(closeNavbarButton);

        setTimeout(() => expect(closeNavbarButton).not.toBeInTheDocument(), 300);
    });
});
