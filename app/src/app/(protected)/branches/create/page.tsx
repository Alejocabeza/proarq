"use client";

import { SelectLoader } from "@app/components/select-loader";
import { ButtonPrimary } from "@app/components/ui/button-primary";
import { Input } from "@app/components/ui/input";
import { InputError } from "@app/components/ui/input-error";
import { Label } from "@app/components/ui/label";
import { BranchInterface } from "@app/intefaces/branch.interface";
import { branchSchema } from "@app/schemas/branch.schema";
import { useCreateBranchMutation } from "@app/services/branch.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const Page = () => {
  const router = useRouter();
  const t = useTranslations();
  const [createData, { isLoading }] = useCreateBranchMutation();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BranchInterface>({
    resolver: zodResolver(branchSchema),
  });

  const onSubmit: SubmitHandler<BranchInterface> = async (formValues) => {
    const res = await createData(formValues);
    if (res.data.statusCode !== 201) {
      toast.error(res.data.message, {
        description: "Branch Create Failed",
      });
    }
    toast.success(res.data.message, {
      description: "Branch Create Successfully",
    });
    reset();
    router.push("/branches");
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
        <div className="space-y-2">
          <Label htmlFor="address">{t("general.address")}</Label>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <SelectLoader
                {...field}
                optionLabel="name"
                id="address"
                apiPath="/addresses"
                placeholder={t("clients.select_address")}
                onChange={(option) => field.onChange(option ? option.value : null)}
              />
            )}
          />
          <InputError error={errors.address?.message} />
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
