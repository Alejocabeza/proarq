"use client";

import { ButtonPrimary } from "@app/components/ui/button-primary";
import { Input } from "@app/components/ui/input";
import { InputError } from "@app/components/ui/input-error";
import { Label } from "@app/components/ui/label";
import { PriceInterface } from "@app/intefaces/price.interface";
import { priceSchema } from "@app/schemas/price.schema";
import { useCreatePriceMutation } from "@app/services/price.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const Page = () => {
  const router = useRouter();
  const t = useTranslations();
  const [createData, { isLoading }] = useCreatePriceMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PriceInterface>({
    resolver: zodResolver(priceSchema),
  });

  const onSubmit: SubmitHandler<PriceInterface> = async (formValues) => {
    const res = await createData(formValues);
    if (res.data.statusCode !== 201) {
      toast.error(res.data.message, {
        description: "Price Create Failed",
      });
    }
    toast.success(res.data.message, {
      description: "Price Create Successfully",
    });
    reset();
    router.push("/prices");
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
          <Label htmlFor="amount">{t("general.amount")}</Label>
          <Input
            {...register("amount")}
            id="amount"
            type="number"
            className={errors.amount && `border-red-500`}
          />
          <InputError error={errors.amount?.message} />
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
