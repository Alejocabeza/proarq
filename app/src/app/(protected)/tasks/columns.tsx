"use client";

import { Button } from "@app/components/ui/button";
import { Checkbox } from "@app/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@app/components/ui/dropdown-menu";
import { TaskInterface } from "@app/intefaces/task.interface";
import { useDeleteTaskMutation } from "@app/services/task.service";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { toast } from "sonner";

export const Columns = (): ColumnDef<TaskInterface>[] => {
  const [deleteData] = useDeleteTaskMutation();

  const handleDelete = async (id: string) => {
    const res = await deleteData(id);
    if (res.data.statusCode !== 200) {
      toast.error(res.data.message, {
        description: "Task Delete Failed",
      });
      return;
    }
    toast.success(res.data.message, {
      description: "Task Delete Successfully",
    });
  };
  const t = useTranslations();
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: t("general.name"),
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("name") || t("general.no_available")}
        </div>
      ),
    },
    {
      accessorKey: "startDate",
      header: t("general.startDate"),
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("startDate") || t("general.no_available")}
        </div>
      ),
    },
    {
      accessorKey: "endDate",
      header: t("general.endDate"),
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("endDate") || t("general.no_available")}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: t("general.status"),
      cell: ({ row }) => (
        <div>
          {t(`general.${(row.getValue("status") as string).toLowerCase()}`) ||
            t("general.no_available")}
        </div>
      ),
    },
    {
      accessorKey: "project",
      header: t("general.project"),
      cell: ({ row }) => (
        <div className="capitalize">
          {((row.getValue("project") as { name: string })?.name) ||
            t("general.no_available")}
        </div>
      ),
    },
    {
      id: "actions",
      header: t("general.actions"),
      cell: ({ row }) => {
        const data = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-7 w-8 p-0">
                <span className="sr-only">{t("general.open_menu")}</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t("general.actions")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/tasks/edit/${data.id}`}>
                  <Pencil className="mr-1 h-4 w-4" />
                  {t("general.edit")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`tasks/show/${data.id}`}>
                  <Eye className="mr-1 h-4 w-4" />
                  {t("general.show")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(data.id as string)}>
                <Trash className="mr-1 h-4 w-4" />
                {t("general.delete")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};