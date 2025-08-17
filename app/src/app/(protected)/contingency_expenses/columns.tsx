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
import { ContingencyExpenseInterface } from "@app/intefaces/contingency-expenses.interface";
import { useDeleteContingencyExpensesMutation } from "@app/services/contingency-expenses.service";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { toast } from "sonner";

export const Columns = (): ColumnDef<ContingencyExpenseInterface>[] => {
  const [deleteData] = useDeleteContingencyExpensesMutation();

  const handleDelete = async (id: string) => {
    const res = await deleteData(id);
    if (res.data.statusCode !== 200) {
      toast.error(res.data.message, {
        description: "Expenses Delete Failed",
      });
      return;
    }
    toast.success(res.data.message, {
      description: "Expenses Delete Successfully",
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
      accessorKey: "value",
      header: t("general.value"),
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("value") || t("general.no_available")}
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
                <Link href={`/contingency_expenses/edit/${data.id}`}>
                  <Pencil className="mr-1 h-4 w-4" />
                  {t("general.edit")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`contingency_expenses/show/${data.id}`}>
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
