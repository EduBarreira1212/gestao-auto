import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, test, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
    test('should render correctly', () => {
        const handleClick = vi.fn();
        const { getByText } = render(
            <Button onClick={handleClick}>lorem ipsum</Button>
        );

        const button = getByText('lorem ipsum');

        expect(button).toBeInTheDocument();
    });

    test('should call handleClick correctly', async () => {
        const handleClick = vi.fn();
        const { getByText } = render(
            <Button onClick={handleClick}>lorem ipsum</Button>
        );

        const button = getByText('lorem ipsum');

        await userEvent.click(button);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('should render with correct class', () => {
        const handleClick = vi.fn();
        const { getByText } = render(
            <Button onClick={handleClick}>lorem ipsum</Button>
        );

        const element = getByText('lorem ipsum');

        expect(element).toHaveClass(
            'my-3 self-center rounded-sm border-2 border-solid bg-brand-secondary p-2 font-montserrat text-brand-neutral transition-colors duration-200 hover:bg-[#070a1d] hover:text-brand-accent'
        );
    });

    test('should render with correct class when hover', async () => {
        const handleClick = vi.fn();
        const { getByText } = render(
            <Button onClick={handleClick}>lorem ipsum</Button>
        );

        const element = getByText('lorem ipsum');

        await userEvent.hover(element);

        expect(element).toHaveClass('hover:bg-[#070a1d] hover:text-brand-accent');
    });
});
