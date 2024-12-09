import { Task } from '@/types/task';
import { Column } from './Column';

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Design User Interface',
    description: 'Create wireframes and mockups for the new dashboard',
    status: 'todo',
    createdAt: new Date('2024-03-10'),
  },
  {
    id: '2',
    title: 'Implement Authentication',
    description: 'Set up JWT authentication and user sessions',
    status: 'in-progress',
    createdAt: new Date('2024-03-11'),
  },
  {
    id: '3',
    title: 'Write API Documentation',
    description: 'Document all API endpoints using Swagger',
    status: 'done',
    createdAt: new Date('2024-03-12'),
  },
  {
    id: '4',
    title: 'Database Optimization',
    description: 'Optimize database queries and add indexes',
    status: 'todo',
    createdAt: new Date('2024-03-13'),
  },
  {
    id: '5',
    title: 'Unit Testing',
    description: 'Write unit tests for core functionality',
    status: 'in-progress',
    createdAt: new Date('2024-03-14'),
  },
];

export function Board() {
  const todoTasks = MOCK_TASKS.filter((task) => task.status === 'todo');
  const inProgressTasks = MOCK_TASKS.filter((task) => task.status === 'in-progress');
  const doneTasks = MOCK_TASKS.filter((task) => task.status === 'done');

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">
        Task Board
      </h1>
      <div className="flex gap-8 overflow-x-auto pb-8">
        <Column title="To Do" tasks={todoTasks} />
        <Column title="In Progress" tasks={inProgressTasks} />
        <Column title="Done" tasks={doneTasks} />
      </div>
    </div>
  );
} 