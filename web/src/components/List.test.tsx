import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, test } from 'vitest';
import List from './List';

describe('List', () => {
    test('should render correctly', () => {
        const { getByText } = render(<List>lorem ipsum</List>);

        const button = getByText('lorem ipsum');

        expect(button).toBeInTheDocument();
    });

    test('should render with correct class', () => {
        const { getByText } = render(<List>lorem ipsum</List>);

        const element = getByText('lorem ipsum');

        expect(element).toHaveClass(
            'flex list-none flex-row flex-wrap items-center justify-center gap-5'
        );
    });
});
