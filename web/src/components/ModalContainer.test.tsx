import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import ModalContainer from './ModalContainer';

describe('Modal container', () => {
    test('should render correctly', () => {
        const { getByText } = render(<ModalContainer>lorem ipsum</ModalContainer>);

        const element = getByText('lorem ipsum');

        expect(element).toBeInTheDocument();
    });

    test('should render with correct class', () => {
        const { getByText } = render(<ModalContainer>lorem ipsum</ModalContainer>);

        const element = getByText('lorem ipsum');

        expect(element).toHaveClass('w-80 bg-white p-5');
    });
});
