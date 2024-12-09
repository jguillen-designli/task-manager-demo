'use client';

import { Task } from '@/types/task';
import { TaskCard } from './TaskCard';
import { useDrop } from 'react-dnd';

interface ColumnProps {
  title: string;
  tasks: Task[];
  status: 'todo' | 'in-progress' | 'done';
  onTaskMove: (taskId: string, newStatus: string) => void;
}

export function Column({ title, tasks, status, onTaskMove }: ColumnProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item: { id: string }) => {
      onTaskMove(item.id, status);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`flex-shrink-0 w-80 bg-gray-200 dark:bg-gray-800 rounded-lg p-4
        ${isOver ? 'ring-2 ring-blue-500' : ''}`}
    >
      <h2 className="font-bold text-lg mb-4 text-gray-700 dark:text-gray-300">
        {title} ({tasks.length})
      </h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
} 