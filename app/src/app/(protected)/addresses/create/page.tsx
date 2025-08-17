"use client";

import { ButtonPrimary } from "@app/components/ui/button-primary";
import { Input } from "@app/components/ui/input";
import { InputError } from "@app/components/ui/input-error";
import { Label } from "@app/components/ui/label";
import { addressInterface } from "@app/intefaces/address.interface";
import { addressSchema } from "@app/schemas/address.schema";
import { useCreateAddressMutation } from "@app/services/address.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const Page = () => {
  const router = useRouter();
  const t = useTranslations();
  const [createAddress, { isLoading }] = useCreateAddressMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<addressInterface>({
    resolver: zodResolver(addressSchema),
  });

  const onSubmit: SubmitHandler<addressInterface> = async (formValues) => {
    const res = await createAddress(formValues);
    if (res.data.statusCode !== 201) {
      toast.error(res.data.message, {
        description: "Address Create Failed",
      });
    }
    toast.success(res.data.message, {
      description: "Address Create Successfully",
    });
    reset();
    router.push("/addresses");
  };
  return (
    <>
      <h1 className="text-3xl font-bold">{t("general.create")}</h1>
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
          <Label htmlFor="country">{t("general.country")}</Label>
          <Input
            {...register("country")}
            id="country"
            className={errors.country && `border-red-500`}
          />
          <InputError error={errors.country?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">{t("general.state")}</Label>
          <Input
            {...register("state")}
            id="state"
            className={errors.state && `border-red-500`}
          />
          <InputError error={errors.state?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">{t("general.city")}</Label>
          <Input
            {...register("city")}
            id="city"
            className={errors.city && `border-red-500`}
          />
          <InputError error={errors.city?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="postalCode">{t("general.postalCode")}</Label>
          <Input
            {...register("postalCode")}
            id="postalCode"
            className={errors.postalCode && `border-red-500`}
          />
          <InputError error={errors.postalCode?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mainAddress">{t("general.mainAddress")}</Label>
          <Input
            {...register("mainAddress")}
            id="mainAddress"
            className={errors.mainAddress && `border-red-500`}
          />
          <InputError error={errors.mainAddress?.message} />
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
