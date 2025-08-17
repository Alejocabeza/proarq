"use client";

import { ButtonPrimary } from "@app/components/ui/button-primary";
import { Input } from "@app/components/ui/input";
import { InputError } from "@app/components/ui/input-error";
import { Label } from "@app/components/ui/label";
import { ActivityInterface } from "@app/intefaces/activity.interface";
import { activitySchema } from "@app/schemas/activity.schema";
import { useCreateActivityMutation } from "@app/services/activity.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ActivityItemsForm } from "../components/activity-items-form";

const Page = () => {
  const router = useRouter();
  const t = useTranslations();
  const [createData, { isLoading }] = useCreateActivityMutation();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ActivityInterface>({
    resolver: zodResolver(activitySchema),
  });

  const onSubmit: SubmitHandler<ActivityInterface> = async (formValues) => {
    const res = await createData(formValues);
    if (res.data.statusCode !== 201) {
      toast.error(res.data.message, {
        description: "Activity Create Failed",
      });
    }
    toast.success(res.data.message, {
      description: "Activity Create Successfully",
    });
    reset();
    router.push("/activities");
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
        <div className="col-span-full">
          <ActivityItemsForm
            control={control}
            register={register}
            errors={errors}
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
