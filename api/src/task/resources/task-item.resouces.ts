import { Task } from '../entities/task.entity';

export const taskItemResources = (task: Task | null) => {
  if (!task) return null;
  return {
    id: task.id,
    name: task.name,
    startDate: task.startDate,
    endDate: task.endDate,
    description: task.description,
    status: task.status,
    project: task.project
      ? {
          id: task.project.id,
          name: task.project.name,
        }
      : null,
  };
};
