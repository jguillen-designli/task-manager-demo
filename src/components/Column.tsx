import { Task } from '@/types/task';
import { TaskCard } from './TaskCard';

interface ColumnProps {
  title: string;
  tasks: Task[];
}

export function Column({ title, tasks }: ColumnProps) {
  return (
    <div className="flex-shrink-0 w-80 bg-gray-200 dark:bg-gray-800 rounded-lg p-4">
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