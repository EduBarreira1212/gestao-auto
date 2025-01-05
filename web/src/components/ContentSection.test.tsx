import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, test } from 'vitest';
import ContentSection from './ContentSection';

describe('Content section', () => {
    test('should render correctly', () => {
        const { getByText } = render(<ContentSection>lorem ipsum</ContentSection>);

        const element = getByText('lorem ipsum');

        expect(element).toBeInTheDocument();
    });

    test('should render with correct class', () => {
        const { getByText } = render(<ContentSection>lorem ipsum</ContentSection>);

        const element = getByText('lorem ipsum');

        expect(element).toHaveClass(
            'flex h-full w-full flex-1 flex-col items-center gap-12 overflow-auto p-3'
        );
    });
});
