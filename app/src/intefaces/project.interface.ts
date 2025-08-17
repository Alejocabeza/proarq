import { TypeClientEnum } from "@app/enum/type-client.enum";
import { ClientInterface } from "./client.interface";
import { BranchInterface } from "./branch.interface";
import { addressInterface } from "./address.interface";

export interface ProjectInterface {
  id?: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  typeClient: TypeClientEnum;
  client?: ClientInterface | null;
  branch?: BranchInterface | null;
  address?: addressInterface | null;
}
