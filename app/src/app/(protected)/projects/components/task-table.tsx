import { ButtonPrimary } from "@app/components/ui/button-primary";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@app/components/ui/table";
import { TaskInterface } from "@app/intefaces/task.interface";
import { Eye } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { FC } from "react";

interface TaskTableProps {
  tasks: TaskInterface[];
}

const TaskTable: FC<TaskTableProps> = ({ tasks }) => {
  const t = useTranslations();

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span>{t("general.tasks")}</span>
      </div>
      <div className="rounded-sm bg-gray-100/40 border">
        <Table className="w-full">
          <TableHeader className="border-b rounded-md">
            <TableHead>{t("general.name")}</TableHead>
            <TableHead>{t("general.startDate")}</TableHead>
            <TableHead>{t("general.endDate")}</TableHead>
            <TableHead>{t("general.status")}</TableHead>
            <TableHead>{t("general.actions")}</TableHead>
          </TableHeader>
          <TableBody>
            {tasks.map((task: TaskInterface) => {
              return (
                <TableRow key={task.id}>
                  <TableCell className="space-y-2 h-16">{task.name}</TableCell>
                  <TableCell className="space-y-2 h-16">
                    {task.startDate || t("general.no_available")}
                  </TableCell>
                  <TableCell className="space-y-2 h-16">
                    {task.endDate || t("general.no_available")}
                  </TableCell>
                  <TableCell className="space-y-2 h-16">
                    {(task.status &&
                      t(`general.${task.status.toLowerCase()}`)) ||
                      t("general.no_available")}
                  </TableCell>
                  <TableCell className="flex gap-2">
                    <Link href={`/tasks/show/${task.id}`} className="w-max">
                      <ButtonPrimary
                        icon={Eye}
                        className="w-max"
                        value={t("general.show")}
                      />
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TaskTable;
