"use client";

import { ButtonPrimary } from "@app/components/ui/button-primary";
import { Input } from "@app/components/ui/input";
import { InputError } from "@app/components/ui/input-error";
import { Label } from "@app/components/ui/label";
import { ServiceInterface } from "@app/intefaces/service.interface";
import { serviceSchema } from "@app/schemas/service.schema";
import { useCreateServiceMutation } from "@app/services/service.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { UnitEnum } from "@app/enum/unit.enum";
import { SelectLoader } from "@app/components/select-loader";
import { ServiceItemsForm } from "../components/service-items-form";

const Page = () => {
  const router = useRouter();
  const t = useTranslations();
  const [createData, { isLoading }] = useCreateServiceMutation();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ServiceInterface>({
    resolver: zodResolver(serviceSchema),
  });

  const onSubmit: SubmitHandler<ServiceInterface> = async (formValues) => {
    const res = await createData(formValues);
    if (res.data.statusCode !== 201) {
      toast.error(res.data.message, {
        description: "Service Create Failed",
      });
    }
    toast.success(res.data.message, {
      description: "Service Create Successfully",
    });
    reset();
    router.push("/services");
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
          <Label htmlFor="unit">{t("general.unit")}</Label>
          <Controller
            name="unit"
            control={control}
            render={({ field }) => (
              <SelectLoader
                {...field}
                id="unit"
                initialValue={null}
                options={[
                  { value: UnitEnum.ML, label: UnitEnum.ML },
                  { value: UnitEnum.M2, label: UnitEnum.M2 },
                  { value: UnitEnum.M3, label: UnitEnum.M3 },
                  { value: UnitEnum.TL, label: UnitEnum.TL },
                  { value: UnitEnum.GBL, label: UnitEnum.GBL },
                  { value: UnitEnum.UND, label: UnitEnum.UND },
                ]}
                onChange={(option) => field.onChange(option?.value || null)}
              />
            )}
          />
          <InputError error={errors.name?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="quantity">{t("general.quantity")}</Label>
          <Input
            {...register("quantity")}
            id="quantity"
            type="number"
            step="0.01"
            className={errors.quantity && `border-red-500`}
          />
          <InputError error={errors.quantity?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="serviceCategory">
            {t("general.service_categories")}
          </Label>
          <Controller
            name="serviceCategory"
            control={control}
            render={({ field }) => (
              <SelectLoader
                {...field}
                initialValue={null}
                optionLabel="name"
                id="serviceCategory"
                apiPath="/service_categories"
                placeholder={t("clients.select_address")}
                onChange={(option) => field.onChange(option?.value || null)}
              />
            )}
          />
          <InputError error={errors.serviceCategory?.message} />
        </div>
        <div className="col-span-full">
          <ServiceItemsForm
            control={control}
            register={register}
            errors={errors}
            setValue={setValue}
          />
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
