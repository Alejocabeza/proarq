"use client";

import { ButtonPrimary } from "@app/components/ui/button-primary";
import { Input } from "@app/components/ui/input";
import { InputError } from "@app/components/ui/input-error";
import { Label } from "@app/components/ui/label";
import { EmployeeInterface } from "@app/intefaces/employee.interface";
import { employeeSchema } from "@app/schemas/employee.schema";
import { useCreateEmployeeMutation } from "@app/services/employee.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const Page = () => {
  const router = useRouter();
  const t = useTranslations();
  const [createData, { isLoading }] = useCreateEmployeeMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeeInterface>({
    resolver: zodResolver(employeeSchema),
  });

  const onSubmit: SubmitHandler<EmployeeInterface> = async (formValues) => {
    const res = await createData(formValues);
    if (res.data.statusCode !== 201) {
      toast.error(res.data.message, {
        description: "Employee Create Failed",
      });
      return;
    }
    toast.success(res.data.message, {
      description: "Employee Create Successfully",
    });
    reset();
    router.push("/employees");
  };
  return (
    <>
      <h1 className="text-3xl font-bold">{t("general.create")}</h1>
      <form
        className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-2"
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
          value={t("general.create")}
          className="col-span-full"
          isLoading={isLoading}
        />
      </form>
    </>
  );
};

export default Page;
