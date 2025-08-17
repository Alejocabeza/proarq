"use client";

import { ButtonPrimary } from "@app/components/ui/button-primary";
import { Input } from "@app/components/ui/input";
import { InputError } from "@app/components/ui/input-error";
import { Label } from "@app/components/ui/label";
import { UtilityExpenseInterface } from "@app/intefaces/utility-expenses.interface";
import { utilityExpensesSchema } from "@app/schemas/utility-expenses.schema";
import { useCreateUtilityExpensesMutation } from "@app/services/utility-expenses.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const Page = () => {
  const router = useRouter();
  const t = useTranslations();
  const [createData, { isLoading }] = useCreateUtilityExpensesMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<UtilityExpenseInterface>({
    resolver: zodResolver(utilityExpensesSchema),
  });

  const onSubmit: SubmitHandler<UtilityExpenseInterface> = async (
    formValues,
  ) => {
    const res = await createData(formValues);
    if (res.data.statusCode !== 201) {
      toast.error(res.data.message, {
        description: "Expenses Create Failed",
      });
      return;
    }
    toast.success(res.data.message, {
      description: "Expenses Create Successfully",
    });
    reset();
    router.push("/utility_expenses");
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
          value={t("general.create")}
          className="col-span-full"
          isLoading={isLoading}
        />
      </form>
    </>
  );
};

export default Page;
