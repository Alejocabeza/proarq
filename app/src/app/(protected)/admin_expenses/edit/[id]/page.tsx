"use client";

import { ButtonPrimary } from "@app/components/ui/button-primary";
import { Input } from "@app/components/ui/input";
import { InputError } from "@app/components/ui/input-error";
import { Label } from "@app/components/ui/label";
import { AdminExpenseInterface } from "@app/intefaces/admin-expenses.interface";
import { adminExpensesSchema } from "@app/schemas/admin-expenses.schema";
import {
  useDeleteAdminExpensesMutation,
  useFindOneAdminExpensesQuery,
  useUpdateAdminExpensesMutation,
} from "@app/services/admin-expenses.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, LoaderCircle, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const Page = () => {
  const router = useRouter();
  const t = useTranslations();
  const { id } = useParams();
  const { isLoading, data } = useFindOneAdminExpensesQuery(id);
  const [updateData, { isLoading: isUpdating }] =
    useUpdateAdminExpensesMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AdminExpenseInterface>({
    resolver: zodResolver(adminExpensesSchema),
    values: {
      ...data,
    },
  });
  const [deleteData] = useDeleteAdminExpensesMutation();

  const handleDelete = async (id: string) => {
    const res = await deleteData(id);
    if (res.data.statusCode !== 200) {
      toast.error(res.data.message, {
        description: "Admin Expense Delete Failed",
      });
      return;
    }
    toast.success(res.data.message, {
      description: "Admin Expense Delete Successfully",
    });
    router.push("/admin_expenses");
  };

  useEffect(() => {
    if (!isLoading) {
      setValue("name", data.name);
      setValue("value", data.value);
    }
  }, [isLoading, data.name, data.value, setValue]);

  const onSubmit: SubmitHandler<AdminExpenseInterface> = async (formValues) => {
    const res = await updateData({ id, data: formValues });
    if (res.data.statusCode !== 200) {
      toast.error(res.data.message, {
        description: "Admin expenses Update Failed",
      });
      return;
    }
    toast.success(res.data.message, {
      description: "Admin expenses Update Successfully",
    });
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
            <h1 className="text-3xl font-bold">{t("general.edit")}</h1>
            <div className="flex justify-center items-center gap-2">
              <Link href={`/admin_expenses/show/${id}`}>
                <ButtonPrimary value={t("general.show")} icon={Eye} />
              </Link>
              <ButtonPrimary
                value="Delete"
                onClick={() => handleDelete(id as string)}
                icon={Trash}
              />
            </div>
          </div>
          <form
            className="grid grid-cols-1 lg:grid-cols-2 gap-x-2 gap-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-2">
              <Label htmlFor="name">{t("general.name")}</Label>
              <Input
                {...register("name")}
                id="name"
                disabled
                className={errors.name && `border-red-500`}
              />
              <InputError error={errors.name?.message} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="value">{t("general.value")}</Label>
              <Input
                {...register("value", {
                  onChange: (e) => {
                    if (e.target.value === "") {
                      setValue("name", "");
                      return;
                    }
                    setValue("name", `${e.target.value}%`);
                  },
                })}
                type="number"
                id="value"
                className={errors.value && `border-red-500`}
              />
              <InputError error={errors.value?.message} />
            </div>
            <ButtonPrimary
              type="submit"
              value={t("general.update")}
              className="col-span-full"
              isLoading={isUpdating}
            />
          </form>
        </>
      )}
    </>
  );
};

export default Page;
