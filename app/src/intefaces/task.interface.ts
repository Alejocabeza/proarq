import { StatusEnum } from "@app/enum/status.enum";
import { ProjectInterface } from "./project.interface";

export interface TaskInterface {
  id?: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  status: StatusEnum;
  project: ProjectInterface
}
