import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, test, vi } from 'vitest';
import AddButton from './AddButton';
import userEvent from '@testing-library/user-event';

describe('Add button', () => {
    test('should render correctly', () => {
        const handleClick = vi.fn();
        const { getByText } = render(
            <AddButton onClick={handleClick}>lorem ipsum</AddButton>
        );

        const button = getByText('lorem ipsum');

        expect(button).toBeInTheDocument();
    });

    test('should call handleClick correctly', async () => {
        const handleClick = vi.fn();
        const { getByText } = render(
            <AddButton onClick={handleClick}>lorem ipsum</AddButton>
        );

        const button = getByText('lorem ipsum');

        await userEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('should render with correct class', () => {
        const handleClick = vi.fn();
        const { getByText } = render(
            <AddButton onClick={handleClick}>lorem ipsum</AddButton>
        );

        const element = getByText('lorem ipsum');

        expect(element).toHaveClass(
            'mt-2 rounded-md border-2 bg-brand-primary p-2 text-brand-neutral transition-colors duration-200 hover:bg-[#009297] hover:text-brand-accent'
        );
    });

    test('should render with correct class when hover', async () => {
        const handleClick = vi.fn();
        const { getByText } = render(
            <AddButton onClick={handleClick}>lorem ipsum</AddButton>
        );

        const element = getByText('lorem ipsum');

        await userEvent.hover(element);

        expect(element).toHaveClass('hover:bg-[#009297] hover:text-brand-accent');
    });
});
