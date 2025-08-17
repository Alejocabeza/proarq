"use client";

import { DataTable } from "@app/components/data-table";
import { ButtonPrimary } from "@app/components/ui/button-primary";
import Link from "next/link";
import { Columns } from "./columns";
import { useTranslations } from "next-intl";
import { CirclePlus, LoaderCircle } from "lucide-react";
import { useFindAllTaskQuery } from "@app/services/task.service";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";

export default function Page() {
  const t = useTranslations();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: 20,
  });
  const { isLoading, data: query } = useFindAllTaskQuery({
    limit: pagination.pageSize,
    offset: pagination.pageIndex,
  });
  const columns = Columns();

  return (
    <>
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <span className="loading loading-spinner loading-lg">
            <LoaderCircle className="animate-spin h-12 w-12" />
          </span>
        </div>
      ) : (
        <DataTable
          metadata={query?.meta}
          columns={columns}
          data={query.data}
          title={t("general.tasks")}
          pagination={pagination}
          setPagination={setPagination}
          actions={
            <>
              <Link href="/tasks/create">
                <ButtonPrimary value={t("general.create")} icon={CirclePlus} />
              </Link>
            </>
          }
        />
      )}
    </>
  );
}
