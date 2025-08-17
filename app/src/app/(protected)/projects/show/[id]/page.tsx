"use client";

import { TextData } from "@app/components/text-data";
import { ButtonPrimary } from "@app/components/ui/button-primary";
import {
  useDeleteProjectMutation,
  useFindOneProjectQuery,
} from "@app/services/project.service";
import { Download, LoaderCircle, Pencil, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import TaskTable from "../../components/task-table";
import { useSession } from "next-auth/react";

const Page = () => {
  const router = useRouter();
  const t = useTranslations();
  const { id } = useParams();
  const { isLoading, data } = useFindOneProjectQuery(id);
  const [deleteData] = useDeleteProjectMutation();
  const { data: session } = useSession();

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
    router.push("/projects");
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
      } else {
        toast.error("Failed to download report");
      }
    } catch (error) {
      console.log(error);
    }
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
              <ButtonPrimary
                value={t("general.download")}
                onClick={() => handleDownload(id as string)}
                icon={Download}
              />
              <Link href={`/projects/edit/${id}`}>
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
              if (key === "typeClient" || key === "tasks") return;
              return <TextData key={key} title={key} text={value} />;
            })}
            <div className="space-y-2 col-span-full">
              <TaskTable tasks={data.tasks} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Page;
