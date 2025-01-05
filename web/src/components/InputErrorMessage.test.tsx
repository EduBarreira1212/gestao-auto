import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, test } from 'vitest';
import InputErrorMessage from './InputErrorMessage';

describe('Input error message', () => {
    test('should render correctly', () => {
        const { getByText } = render(
            <InputErrorMessage>lorem ipsum</InputErrorMessage>
        );

        const element = getByText('lorem ipsum');

        expect(element).toBeInTheDocument();
    });

    test('should render with correct class', () => {
        const { getByText } = render(
            <InputErrorMessage>lorem ipsum</InputErrorMessage>
        );

        const element = getByText('lorem ipsum');

        expect(element).toHaveClass('text-base font-semibold text-red-500');
    });
});
