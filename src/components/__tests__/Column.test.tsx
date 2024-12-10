import { render, screen } from '@testing-library/react';
import { Column } from '../Column';
import { Task } from '@/types/task';

// Mock TaskCard component
jest.mock('../TaskCard', () => ({
  TaskCard: ({ task }: { task: Task }) => (
    <div data-testid="task-card">
      <div>{task.title}</div>
      <div>{task.description}</div>
      <div>
        {new Date(task.createdAt).toLocaleDateString('en-US', {
          timeZone: 'UTC',
        })}
      </div>
    </div>
  ),
}));

// Mock react-dnd hook
jest.mock('react-dnd', () => {
  const dropConfig = {
    accept: 'TASK',
    drop: jest.fn(),
    collect: jest.fn(),
  };

  return {
    useDrop: jest.fn(() => {
      // Return the function that creates the configuration
      return [{ isOver: false }, jest.fn(), () => dropConfig];
    }),
    __dropConfig: dropConfig,
  };
});

describe('Column Component', () => {
  const mockTask = {
    id: '1',
    title: 'Test Task',
    description: 'Test Description',
    status: 'todo' as const,
    createdAt: new Date('2024-03-10T12:00:00.000Z'),
  };

  const defaultProps = {
    title: 'Test Column',
    tasks: [mockTask],
    status: 'todo' as const,
    onTaskMove: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders column with correct title and task count', () => {
    render(<Column {...defaultProps} />);
    expect(screen.getByText('Test Column (1)')).toBeInTheDocument();
  });

  it('renders task cards with correct information', () => {
    render(<Column {...defaultProps} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('3/10/2024')).toBeInTheDocument();
  });

  it('handles empty task list', () => {
    render(<Column {...defaultProps} tasks={[]} />);
    expect(screen.getByText('Test Column (0)')).toBeInTheDocument();
    expect(screen.queryByTestId('task-card')).not.toBeInTheDocument();
  });

  it('renders multiple tasks', () => {
    const multipleTasks = [
      mockTask,
      {
        ...mockTask,
        id: '2',
        title: 'Second Task',
      },
    ];

    render(<Column {...defaultProps} tasks={multipleTasks} />);
    expect(screen.getAllByTestId('task-card')).toHaveLength(2);
  });

  it('handles task drop correctly', () => {
    render(<Column {...defaultProps} />);

    const { useDrop, __dropConfig } = require('react-dnd');
    const dropFn = useDrop.mock.calls[0][0];
    const config = dropFn();

    config.drop({ id: '2' });

    expect(defaultProps.onTaskMove).toHaveBeenCalledWith(
      '2',
      defaultProps.status
    );
  });

  it('configures drop zone correctly', () => {
    render(<Column {...defaultProps} />);

    const { useDrop } = require('react-dnd');
    const dropFn = useDrop.mock.calls[0][0];
    const config = dropFn();

    expect(config.accept).toBe('TASK');
    expect(typeof config.drop).toBe('function');
    expect(typeof config.collect).toBe('function');
  });

  it('handles monitor state collection', () => {
    render(<Column {...defaultProps} />);

    const { useDrop } = require('react-dnd');
    const dropFn = useDrop.mock.calls[0][0];
    const config = dropFn();
    const monitor = { isOver: jest.fn().mockReturnValue(true) };

    const result = config.collect(monitor);

    expect(result).toEqual({ isOver: true });
    expect(monitor.isOver).toHaveBeenCalled();
  });

  it('applies hover styles when dragging over', () => {
    const { useDrop } = require('react-dnd');
    (useDrop as jest.Mock).mockImplementation(() => [
      { isOver: true },
      jest.fn(),
    ]);

    const { container } = render(<Column {...defaultProps} />);
    expect(container.firstChild).toHaveClass('ring-2', 'ring-blue-500');
  });

  it('does not apply hover styles when not dragging over', () => {
    const { useDrop } = require('react-dnd');
    (useDrop as jest.Mock).mockImplementation(() => [
      { isOver: false },
      jest.fn(),
    ]);

    const { container } = render(<Column {...defaultProps} />);
    expect(container.firstChild).not.toHaveClass('ring-2', 'ring-blue-500');
  });
});
