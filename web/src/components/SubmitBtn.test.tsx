import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import SubmitBtn from './SubmitBtn';
import userEvent from '@testing-library/user-event';

describe('Submit button', () => {
    test('should render correctly', () => {
        const { getByText } = render(<SubmitBtn value="test" disabled={false} />);

        const element = getByText('test');

        expect(element).toBeInTheDocument();
    });

    test('should render with correct class', () => {
        const { getByText } = render(<SubmitBtn value="test" disabled={false} />);

        const element = getByText('test');

        expect(element).toHaveClass(
            'cursor-pointer border-2 bg-brand-secondary p-2 font-montserrat text-brand-neutral transition-colors duration-200 hover:bg-[#070a1d] hover:text-brand-accent'
        );
    });

    test('should render with correct class when hover', async () => {
        const { getByText } = render(<SubmitBtn value="test" disabled={false} />);

        const element = getByText('test');

        await userEvent.hover(element);

        expect(element).toHaveClass('hover:bg-[#070a1d] hover:text-brand-accent');
    });

    test('should be disabled when disabled is passed as true', async () => {
        const { getByText } = render(<SubmitBtn value="test" disabled={true} />);

        const element = getByText('test');

        expect(element).toBeDisabled();
    });
});
