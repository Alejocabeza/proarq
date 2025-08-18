"use client";
import { TextData } from "@app/components/text-data";
import { ButtonPrimary } from "@app/components/ui/button-primary";

import {
  useDeleteEmployeeMutation,
  useFindOneEmployeeQuery,
} from "@app/services/employee.service";
import { LoaderCircle, Pencil, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const Page = () => {
  const router = useRouter();
  const t = useTranslations();
  const { id } = useParams();
  const { isLoading, data } = useFindOneEmployeeQuery(id);
  const [deleteData] = useDeleteEmployeeMutation();

  const handleDelete = async (id: string) => {
    const res = await deleteData(id);
    if (res.data.statusCode !== 200) {
      toast.error(res.data.message, {
        description: "Employee Delete Failed",
      });
      return;
    }
    toast.success(res.data.message, {
      description: "Employee Delete Successfully",
    });
    router.push("/employees");
  };

  return (
    <>
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <span className="loading loading-spinner loading-lg">
            <LoaderCircle className="animate-spin h-12 w-12" />
          </span>
        </div>
      ) : (
        <>
          <div className="w-full h-12 flex justify-between items-center">
            <h1 className="text-3xl font-bold">{t("general.show")}</h1>
            <div className="flex justify-center items-center gap-2">
              <Link href={`/employees/edit/${id}`}>
                <ButtonPrimary value={t("general.edit")} icon={Pencil} />
              </Link>
              <ButtonPrimary
                value={t("general.delete")}
                onClick={() => handleDelete(id as string)}
                icon={Trash}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 space-y-2">
            {Object.entries(data).map(([key, value]) => {
              let text = value as string;
              if (key === "isActive")
                text = value === true ? t("tasks.active") : t("tasks.inactive");
              return <TextData key={key} title={key} text={text} />;
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Page;
