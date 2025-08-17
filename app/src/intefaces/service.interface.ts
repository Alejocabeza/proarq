import { UnitEnum } from "@app/enum/unit.enum";
import { ActivityInterface } from "./activity.interface";

export interface ServiceItemsInterface {
  id?: string;
  activity: ActivityInterface|null;
  unitedPrice: number;
  percentage: number;
}

export interface ServiceInterface {
  id?: string;
  name: string;
  unit: UnitEnum;
  quantity: number;
  serviceCategory: string;
  items?: ServiceItemsInterface[];
}
