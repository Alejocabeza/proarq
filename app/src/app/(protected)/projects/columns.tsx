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
import { ProjectInterface } from "@app/intefaces/project.interface";
import { useDeleteProjectMutation } from "@app/services/project.service";
import { ColumnDef } from "@tanstack/react-table";
import { Download, Eye, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { toast } from "sonner";

export const Columns = (): ColumnDef<ProjectInterface>[] => {
  const { data: session } = useSession();
  const t = useTranslations();
  const [deleteData] = useDeleteProjectMutation();

  const handleDelete = async (id: string) => {
    const res = await deleteData(id);
    if (res.data.statusCode !== 200) {
      toast.error(res.data.message, {
        description: "Project Delete Failed",
      });
      return;
    }
    toast.success(res.data.message, {
      description: "Project Delete Successfully",
    });
  };

  const handleDownload = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/reports/progress?project=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/pdf",
            Authorization: `Bearer ${session?.user.access_token}`,
          },
        }
      );
      if (res.ok) {
        const data = await res.blob();
        console.log(data);
        const blob = new Blob([data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        window.open(url);
        URL.revokeObjectURL(url);
      }else{
        toast.error("Failed to download report");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      accessorKey: "client",
      header: t("general.client"),
      cell: ({ row }) => (
        <div className="capitalize">
          {(row.getValue("client") && row.getValue("client").name) ||
            t("general.no_available")}
        </div>
      ),
    },
    {
      accessorKey: "branch",
      header: t("general.branch"),
      cell: ({ row }) => (
        <div className="capitalize">
          {(row.getValue("branch") && row.getValue("branch").name) ||
            t("general.no_available")}
        </div>
      ),
    },
    {
      accessorKey: "address",
      header: t("general.address"),
      cell: ({ row }) => (
        <div className="capitalize">
          {(row.getValue("address") && row.getValue("address").name) ||
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
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">{t("general.open_menu")}</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t("general.actions")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/projects/edit/${data.id}`}>
                  <Pencil className="mr-2 h-4 w-4" />
                  {t("general.edit")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`projects/show/${data.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  {t("general.show")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(data.id as string)}>
                <Trash className="mr-2 h-4 w-4" />
                {t("general.delete")}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDownload(data.id as string)}
              >
                <Download className="mr-2 h-4 w-4" />
                {t("general.download")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
