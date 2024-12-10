'use client';

import { Task } from '@/types/task';
import { useDrag } from 'react-dnd';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`bg-white dark:bg-gray-700 rounded-lg shadow p-4 hover:shadow-md transition-shadow cursor-move
        ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
        {task.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
        {task.description}
      </p>
      <div className="text-xs text-gray-500 dark:text-gray-400">
        {new Date(task.createdAt).toLocaleDateString('en-US', {
          timeZone: 'UTC',
        })}
      </div>
    </div>
  );
}
