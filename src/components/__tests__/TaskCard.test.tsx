import { render, screen } from '@testing-library/react';
import { TaskCard } from '../TaskCard';

// Mock react-dnd
jest.mock('react-dnd', () => ({
  useDrag: () => [{ isDragging: false }, jest.fn()],
}));

describe('TaskCard Component', () => {
  const mockTask = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: 'todo' as const,
    createdAt: new Date('2024-03-10T00:00:00.000Z'),
  };

  it('renders task information correctly', () => {
    render(<TaskCard task={mockTask} />);

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText(/3\/10\/2024/)).toBeInTheDocument();
  });

  it('applies dragging styles when being dragged', () => {
    // Mock useDrag to simulate dragging state
    jest.spyOn(require('react-dnd'), 'useDrag').mockImplementation(() => [
      {
        isDragging: true,
      },
      jest.fn(),
    ]);

    const { container } = render(<TaskCard task={mockTask} />);
    expect(container.firstChild).toHaveClass('opacity-50');
  });

  it('formats date correctly', () => {
    const taskWithDifferentDate = {
      ...mockTask,
      createdAt: new Date('2024-12-25T00:00:00.000Z'),
    };

    render(<TaskCard task={taskWithDifferentDate} />);
    expect(screen.getByText(/12\/25\/2024/)).toBeInTheDocument();
  });

  it('applies correct base styles', () => {
    const { container } = render(<TaskCard task={mockTask} />);
    expect(container.firstChild).toHaveClass(
      'bg-white',
      'dark:bg-gray-700',
      'rounded-lg',
      'shadow',
      'cursor-move'
    );
  });
});
