"use client";

import { ButtonPrimary } from "@app/components/ui/button-primary";
import { Input } from "@app/components/ui/input";
import { InputError } from "@app/components/ui/input-error";
import { Label } from "@app/components/ui/label";
import { ActivityInterface } from "@app/intefaces/activity.interface";
import { activitySchema } from "@app/schemas/activity.schema";
import { useCreateActivityMutation } from "@app/services/activity.service";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ActivityItemsForm } from "../components/activity-items-form";

const PageContent = () => {
  const router = { push: (path: string) => console.log(path) };
  const t = (key: string) => key;
  const [createActivity, { isLoading }] = useCreateActivityMutation();

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
    try {
      await createActivity(formValues).unwrap();
      toast.success("Activity created successfully", {
        description: "Activity Create Successfully",
      });
      reset();
      router.push("/activities");
    } catch {
      toast.error("Failed to create activity", {
        description: "Activity Create Failed",
      });
    }
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

export default PageContent;
