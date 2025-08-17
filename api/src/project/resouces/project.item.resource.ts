import { taskCollectionResource } from '@api/task/resources/task-collection.resouces';
import { Project } from '../entities/project.entity';

export const projectItemResource = (project: Project | null) => {
  if (!project) return null;
  return {
    id: project.id,
    name: project.name,
    description: project.description,
    startDate: project.startDate,
    endDate: project.endDate,
    typeClient: project.typeClient,
    code: project.code,
    address: project.address
      ? {
          id: project.address.id,
          name: project.address.name,
        }
      : null,
    client: project.client
      ? {
          id: project.client.id,
          name: project.client.name,
        }
      : null,
    branch: project.branch
      ? {
          id: project.branch.id,
          name: project.branch.name,
        }
      : null,
    tasks: project.tasks ? taskCollectionResource(project.tasks) : [],
  };
};
