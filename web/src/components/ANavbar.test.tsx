import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, test } from 'vitest';
import userEvent from '@testing-library/user-event';
import ANavbar from './ANavbar';
import { BrowserRouter } from 'react-router-dom';

describe('A navbar', () => {
    test('should render correctly', () => {
        const { getByText } = render(
            <BrowserRouter>
                <ANavbar to="test" iconURL="test">
                    lorem ipsum
                </ANavbar>
            </BrowserRouter>
        );

        const element = getByText('lorem ipsum');

        expect(element).toBeInTheDocument();
    });

    test('should render with correct class', () => {
        const { getByText } = render(
            <BrowserRouter>
                <ANavbar to="test" iconURL="test">
                    lorem ipsum
                </ANavbar>
            </BrowserRouter>
        );

        const element = getByText('lorem ipsum');

        expect(element).toHaveClass(
            'flex items-center gap-1 font-poppins text-brand-secondary transition-all duration-200 hover:scale-110 hover:text-brand-accent'
        );
    });

    test('should render with correct class when hover', async () => {
        const { getByText } = render(
            <BrowserRouter>
                <ANavbar to="test" iconURL="test">
                    lorem ipsum
                </ANavbar>
            </BrowserRouter>
        );

        const element = getByText('lorem ipsum');

        await userEvent.hover(element);

        expect(element).toHaveClass('hover:scale-110 hover:text-brand-accent');
    });

    test('should render img correctly', async () => {
        const { getByRole } = render(
            <BrowserRouter>
                <ANavbar to="test" iconURL="test">
                    lorem ipsum
                </ANavbar>
            </BrowserRouter>
        );

        const element = getByRole('img');

        expect(element).toBeInTheDocument();
    });
});
