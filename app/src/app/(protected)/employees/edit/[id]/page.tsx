"use client";

import { ButtonPrimary } from "@app/components/ui/button-primary";
import { Input } from "@app/components/ui/input";
import { InputError } from "@app/components/ui/input-error";
import { Label } from "@app/components/ui/label";
import { ClientInterface } from "@app/intefaces/client.interface";
import { EmployeeInterface } from "@app/intefaces/employee.interface";
import { employeeUpdateSchema } from "@app/schemas/employee.schema";
import {
  useDeleteEmployeeMutation,
  useFindOneEmployeeQuery,
  useUpdateEmployeeMutation,
} from "@app/services/employee.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, LoaderCircle, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const Page = () => {
  const router = useRouter();
  const t = useTranslations();
  const { id } = useParams();
  const { isLoading, data } = useFindOneEmployeeQuery(id);
  const [updateData, { isLoading: isUpdating }] = useUpdateEmployeeMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeInterface>({
    resolver: zodResolver(employeeUpdateSchema),
    values: {
      ...data,
      address: data?.address?.id || null,
    },
  });
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

  const onSubmit: SubmitHandler<ClientInterface> = async (formValues) => {
    const res = await updateData({ id, data: formValues });
    if (res.data.statusCode !== 200) {
      toast.error(res.data.message, {
        description: "Employee Update Failed",
      });
      return;
    }
    toast.success(res.data.message, {
      description: "Employee Update Successfully",
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
              <Link href={`/employees/show/${id}`}>
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
            className="grid grid-cols-1 lg:grid-cols-2 space-y-2 gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-2">
              <Label htmlFor="name">{t("general.name")}</Label>
              <Input
                {...register("name")}
                id="name"
                className={errors.name && `border-red-500`}
              />
              <InputError error={errors.name?.message} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t("general.email")}</Label>
              <Input
                {...register("email")}
                id="email"
                className={errors.email && `border-red-500`}
              />
              <InputError error={errors.email?.message} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{t("general.phone")}</Label>
              <Input
                {...register("phone")}
                id="phone"
                className={errors.phone && `border-red-500`}
              />
              <InputError error={errors.phone?.message} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dni">{t("general.dni")}</Label>
              <Input
                {...register("dni")}
                id="dni"
                className={errors.dni && `border-red-500`}
              />
              <InputError error={errors.dni?.message} />
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
