import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Screen from './Screen';

describe('Screen', () => {
    test('should render correctly', () => {
        const { getByText } = render(<Screen>lorem ipsum</Screen>);

        const button = getByText('lorem ipsum');

        expect(button).toBeInTheDocument();
    });

    test('should render with correct class', () => {
        const { getByText } = render(<Screen>lorem ipsum</Screen>);

        const element = getByText('lorem ipsum');

        expect(element).toHaveClass('flex h-screen w-full flex-row');
    });
});
