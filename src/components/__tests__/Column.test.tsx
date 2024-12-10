import { render, screen, cleanup } from '@testing-library/react';
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

// Mock react-dnd
jest.mock('react-dnd', () => ({
  useDrop: () => [{ isOver: false }, jest.fn()],
}));

describe('Column Component', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  const mockTasks = [
    {
      id: '1',
      title: 'Test Task',
      description: 'Test Description',
      status: 'todo' as const,
      createdAt: new Date('2024-03-10T12:00:00.000Z'),
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

    const taskCard = screen.getByTestId('task-card');
    expect(taskCard).toHaveTextContent('Test Task');
    expect(taskCard).toHaveTextContent('Test Description');
    expect(taskCard).toHaveTextContent('3/10/2024');
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
    expect(container.firstChild).toHaveClass('ring-2', 'ring-blue-500');
  });

  it('renders empty column state correctly', () => {
    render(<Column {...mockProps} tasks={[]} />);
    expect(screen.getByText('Test Column (0)')).toBeInTheDocument();
  });
});
