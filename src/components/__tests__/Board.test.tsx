import { render, screen, fireEvent } from '@testing-library/react';
import { Board } from '../Board';

// Mock react-dnd
jest.mock('react-dnd', () => ({
  useDrag: () => [{ isDragging: false }, jest.fn()],
  useDrop: () => [{ isOver: false }, jest.fn()],
}));

describe('Board Component', () => {
  it('renders all columns with correct titles', () => {
    render(<Board />);

    expect(screen.getByText('To Do (2)')).toBeInTheDocument();
    expect(screen.getByText('In Progress (2)')).toBeInTheDocument();
    expect(screen.getByText('Done (1)')).toBeInTheDocument();
  });

  it('displays initial tasks in correct columns', () => {
    render(<Board />);

    // Check Todo column tasks
    const todoColumn = screen.getByText('To Do (2)').closest('div');
    expect(todoColumn).toHaveTextContent('Design User Interface');
    expect(todoColumn).toHaveTextContent('Database Optimization');

    // Check In Progress column tasks
    const inProgressColumn = screen.getByText('In Progress (2)').closest('div');
    expect(inProgressColumn).toHaveTextContent('Implement Authentication');
    expect(inProgressColumn).toHaveTextContent('Unit Testing');

    // Check Done column tasks
    const doneColumn = screen.getByText('Done (1)').closest('div');
    expect(doneColumn).toHaveTextContent('Write API Documentation');
  });

  it('updates task counts when tasks are moved', () => {
    render(<Board />);

    // Simulate moving a task from Todo to In Progress
    const task = screen.getByText('Design User Interface');
    const inProgressColumn = screen.getByText('In Progress (2)').closest('div');

    fireEvent.dragStart(task);
    fireEvent.drop(inProgressColumn);

    // Check updated column counts
    expect(screen.getByText('To Do (1)')).toBeInTheDocument();
    expect(screen.getByText('In Progress (3)')).toBeInTheDocument();
  });
});
