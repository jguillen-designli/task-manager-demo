import { render } from '@testing-library/react';
import { TestWrapper } from '../utils';

// Mock RootProvider
jest.mock('@/components/providers/RootProvider', () => ({
  RootProvider: ({
    children,
    fontClasses,
  }: {
    children: React.ReactNode;
    fontClasses: string;
  }) => (
    <div data-testid="root-provider" data-font-classes={fontClasses}>
      {children}
    </div>
  ),
}));

describe('TestWrapper', () => {
  it('renders children wrapped in RootProvider with empty fontClasses', () => {
    const { getByTestId, getByText } = render(
      <TestWrapper>
        <div>Test Content</div>
      </TestWrapper>
    );

    const rootProvider = getByTestId('root-provider');
    expect(rootProvider).toBeInTheDocument();
    expect(rootProvider).toHaveAttribute('data-font-classes', '');
    expect(getByText('Test Content')).toBeInTheDocument();
  });
});
