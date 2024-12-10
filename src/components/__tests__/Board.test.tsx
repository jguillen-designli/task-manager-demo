import { render, screen, act } from '@testing-library/react';
import { Board } from '../Board';

// Mock TaskCard component
jest.mock('../TaskCard', () => ({
  TaskCard: ({ task }: { task: any }) => (
    <div data-testid={`task-${task.id}`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
    </div>
  ),
}));

// Mock Column component to capture onTaskMove
jest.mock('../Column', () => {
  const mockOnTaskMove = jest.fn();
  return {
    Column: ({ title, tasks, status, onTaskMove }: any) => {
      // Store the onTaskMove callback for testing
      mockOnTaskMove.mockImplementation(onTaskMove);
      return (
        <div data-testid={`column-${status}`}>
          <h2>
            {title} ({tasks.length})
          </h2>
          <div>
            {tasks.map((task: any) => (
              <div key={task.id} data-testid={`task-${task.id}`}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    },
    __mockOnTaskMove: mockOnTaskMove,
  };
});

// Mock react-dnd
jest.mock('react-dnd', () => ({
  useDrag: () => [{ isDragging: false }, jest.fn()],
  useDrop: () => [{ isOver: false }, jest.fn()],
}));

describe('Board Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Previous tests remain the same...

  it('updates task counts when tasks are moved', async () => {
    render(<Board />);

    // Get the mocked onTaskMove function and call it
    await act(async () => {
      const { __mockOnTaskMove } = jest.requireMock('../Column');
      __mockOnTaskMove('1', 'in-progress');
    });

    // Check updated counts
    const todoColumn = screen.getByTestId('column-todo');
    const inProgressColumn = screen.getByTestId('column-in-progress');

    expect(todoColumn).toHaveTextContent('To Do (1)');
    expect(inProgressColumn).toHaveTextContent('In Progress (3)');
  });
});
