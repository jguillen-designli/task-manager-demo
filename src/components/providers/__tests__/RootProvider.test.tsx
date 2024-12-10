import { render } from '@testing-library/react';
import { RootProvider } from '../RootProvider';

// Mock HTML5Backend
jest.mock('react-dnd-html5-backend', () => ({
  HTML5Backend: {},
}));

// Mock DndProvider
jest.mock('react-dnd', () => ({
  DndProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dnd-provider">{children}</div>
  ),
}));

// Suppress DOM nesting warnings for this test suite
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    if (args[0]?.includes('validateDOMNesting')) return;
    console.error(...args);
  });
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('RootProvider', () => {
  const renderProvider = (fontClasses = '') => {
    return render(
      <RootProvider fontClasses={fontClasses}>
        <div data-testid="test-content">Test Content</div>
      </RootProvider>
    );
  };

  it('renders children with DndProvider', () => {
    const { getByTestId } = renderProvider();

    const dndProvider = getByTestId('dnd-provider');
    const content = getByTestId('test-content');

    expect(dndProvider).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });

  it('applies font classes correctly', () => {
    const { container } = renderProvider('test-font custom-class');
    const body = container.querySelector('body');

    expect(body).toHaveClass('test-font', 'custom-class', 'antialiased');
  });

  it('maintains HTML structure with lang attribute', () => {
    const { container } = renderProvider();
    const html = container.firstChild as HTMLElement;

    expect(html.tagName.toLowerCase()).toBe('html');
    expect(html.getAttribute('lang')).toBe('en');
  });
});
