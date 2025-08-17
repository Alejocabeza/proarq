import { Task } from '../entities/task.entity';
import { taskItemResources } from './task-item.resouces';

export const taskCollectionResource = (tasks: Task[]) =>
  tasks.map((task) => taskItemResources(task));
