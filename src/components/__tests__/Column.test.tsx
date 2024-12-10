import { render, screen } from '@testing-library/react';
import { Column } from '../Column';

// Mock react-dnd
jest.mock('react-dnd', () => ({
  useDrop: () => [{ isOver: false }, jest.fn()],
}));

describe('Column Component', () => {
  const mockTasks = [
    {
      id: '1',
      title: 'Test Task',
      description: 'Test Description',
      status: 'todo' as const,
      createdAt: new Date('2024-03-10'),
    },
  ];

  const mockProps = {
    title: 'Test Column',
    tasks: mockTasks,
    status: 'todo' as const,
    onTaskMove: jest.fn(),
  };

  it('renders column title with correct task count', () => {
    render(<Column {...mockProps} />);
    expect(screen.getByText('Test Column (1)')).toBeInTheDocument();
  });

  it('renders tasks with correct information', () => {
    render(<Column {...mockProps} />);

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('3/10/2024')).toBeInTheDocument();
  });

  it('applies hover styles when dragging over', () => {
    // Mock useDrop to simulate hover state
    jest.spyOn(require('react-dnd'), 'useDrop').mockImplementation(() => [
      {
        isOver: true,
      },
      jest.fn(),
    ]);

    const { container } = render(<Column {...mockProps} />);
    expect(container.firstChild).toHaveClass('ring-2 ring-blue-500');
  });

  it('renders empty column state correctly', () => {
    render(<Column {...mockProps} tasks={[]} />);
    expect(screen.getByText('Test Column (0)')).toBeInTheDocument();
  });
});
