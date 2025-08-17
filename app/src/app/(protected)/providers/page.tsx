"use client";

import { DataTable } from "@app/components/data-table";
import { ButtonPrimary } from "@app/components/ui/button-primary";
import Link from "next/link";
import { Columns } from "./columns";
import { useTranslations } from "next-intl";
import { CirclePlus, LoaderCircle } from "lucide-react";
import { useFindAllProviderQuery } from "@app/services/provider.service";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";

export default function Page() {
  const t = useTranslations();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: 20,
  });
  const { isLoading, data: query } = useFindAllProviderQuery({
    offset: pagination.pageIndex,
    limit: pagination.pageSize,
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
          columns={columns}
          data={query.data}
          title={t("general.providers")}
          metadata={query.meta}
          pagination={pagination}
          setPagination={setPagination}
          actions={
            <>
              <Link href="/providers/create">
                <ButtonPrimary value={t("general.create")} icon={CirclePlus} />
              </Link>
            </>
          }
        />
      )}
    </>
  );
}
