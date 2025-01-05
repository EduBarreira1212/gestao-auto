import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import CloseModalBtn from './CloseModalBtn';

describe('Close modal btn', () => {
    test('should render correctly', () => {
        const handleClick = vi.fn();
        const { getByText } = render(<CloseModalBtn onClick={handleClick} />);

        const element = getByText('X');

        expect(element).toBeInTheDocument();
    });

    test('should call handleClick correctly', async () => {
        const handleClick = vi.fn();
        const { getByText } = render(<CloseModalBtn onClick={handleClick} />);

        const element = getByText('X');

        await userEvent.click(element);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('should render with correct class', () => {
        const handleClick = vi.fn();
        const { getByText } = render(<CloseModalBtn onClick={handleClick} />);

        const element = getByText('X');

        expect(element).toHaveClass(
            'rounded-sm border-2 px-2 text-brand-secondary transition-colors duration-200 hover:bg-brand-neutral hover:text-brand-accent'
        );
    });

    test('should render with correct class when hover', async () => {
        const handleClick = vi.fn();
        const { getByText } = render(<CloseModalBtn onClick={handleClick} />);

        const element = getByText('X');

        await userEvent.hover(element);

        expect(element).toHaveClass(
            'hover:bg-brand-neutral hover:text-brand-accent'
        );
    });
});
