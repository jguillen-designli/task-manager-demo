import { render, screen } from '@testing-library/react';
import { TaskCard } from '../TaskCard';

// Mock react-dnd hook
jest.mock('react-dnd', () => ({
  useDrag: jest.fn((options) => {
    // Store the options for testing
    (jest.requireMock('react-dnd') as any).__lastDragOptions = options;
    return [{ isDragging: false }, jest.fn()];
  }),
}));

describe('TaskCard Component', () => {
  const mockTask = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: 'todo' as const,
    createdAt: new Date('2024-03-10T00:00:00.000Z'),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders task information correctly', () => {
    render(<TaskCard task={mockTask} />);

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText(/3\/10\/2024/)).toBeInTheDocument();
  });

  it('configures drag options correctly', () => {
    render(<TaskCard task={mockTask} />);

    const { useDrag } = require('react-dnd');
    const dragFn = useDrag.mock.calls[0][0];
    const config = dragFn();

    expect(config.type).toBe('TASK');
    expect(config.item).toEqual({
      id: mockTask.id,
      status: mockTask.status,
    });
  });

  it('handles monitor state collection', () => {
    render(<TaskCard task={mockTask} />);

    const { useDrag } = require('react-dnd');
    const dragFn = useDrag.mock.calls[0][0];
    const config = dragFn();
    const monitor = { isDragging: jest.fn().mockReturnValue(true) };

    const result = config.collect(monitor);

    expect(result).toEqual({ isDragging: true });
    expect(monitor.isDragging).toHaveBeenCalled();
  });

  it('applies dragging styles when being dragged', () => {
    const { useDrag } = require('react-dnd');
    useDrag.mockImplementation(() => [{ isDragging: true }, jest.fn()]);

    const { container } = render(<TaskCard task={mockTask} />);
    expect(container.firstChild).toHaveClass('opacity-50');
  });

  it('applies normal opacity when not being dragged', () => {
    const { useDrag } = require('react-dnd');
    useDrag.mockImplementation(() => [{ isDragging: false }, jest.fn()]);

    const { container } = render(<TaskCard task={mockTask} />);
    expect(container.firstChild).toHaveClass('opacity-100');
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
