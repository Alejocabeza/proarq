import { Project } from '../entities/project.entity';
import { projectItemResource } from './project.item.resource';

export const projectCollectionResource = (projects: Project[]) =>
  projects.map((project) => projectItemResource(project));
