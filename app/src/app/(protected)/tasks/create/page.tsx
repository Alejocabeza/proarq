"use client";

import { DatePicker } from "@app/components/date-picker";
import { SelectLoader } from "@app/components/select-loader";
import { ButtonPrimary } from "@app/components/ui/button-primary";
import { Input } from "@app/components/ui/input";
import { InputError } from "@app/components/ui/input-error";
import { Label } from "@app/components/ui/label";
import { Textarea } from "@app/components/ui/textarea";
import { StatusEnum } from "@app/enum/status.enum";
import { TaskInterface } from "@app/intefaces/task.interface";
import { taskSchema } from "@app/schemas/task.schema";
import { useCreateTaskMutation } from "@app/services/task.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const Page = () => {
  const router = useRouter();
  const t = useTranslations();
  const [createData, { isLoading }] = useCreateTaskMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<TaskInterface>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      status: StatusEnum.PENDING,
    },
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onSubmit: SubmitHandler<TaskInterface> = async (formValues) => {
    const res = await createData(formValues);
    if (res.data.statusCode !== 201) {
      toast.error(res.data.message, {
        description: "Task Create Failed",
      });
      return;
    }
    toast.success(res.data.message, {
      description: "Task Create Successfully",
    });
    reset();
    router.push("/tasks");
  };

  const handleResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
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
        <div className="space-y-2">
          <Label htmlFor="startDate">{t("general.startDate")}</Label>
          <Controller
            control={control}
            name="startDate"
            render={({ field }) => (
              <DatePicker
                {...field}
                onChange={(date) => field.onChange(date)}
              />
            )}
          />
          <InputError error={errors.startDate?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">{t("general.endDate")}</Label>
          <Controller
            control={control}
            name="endDate"
            render={({ field }) => (
              <DatePicker
                {...field}
                onChange={(date) => field.onChange(date)}
              />
            )}
          />
          <InputError error={errors.endDate?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">{t("general.status")}</Label>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <SelectLoader
                {...field}
                id="status"
                initialValue={{
                  value: StatusEnum.PENDING,
                  label: t("general.pending"),
                }}
                options={[
                  { value: StatusEnum.PENDING, label: t("general.pending") },
                  {
                    value: StatusEnum.IN_PROGRESS,
                    label: t("general.in_progress"),
                  },
                  { value: StatusEnum.DONE, label: t("general.done") },
                ]}
                onChange={(option) => field.onChange(option?.value)}
              />
            )}
          />
          <InputError error={errors.status?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="branch">{t("general.project")}</Label>
          <Controller
            name="project"
            control={control}
            render={({ field }) => (
              <SelectLoader
                {...field}
                initialValue={null}
                optionLabel="name"
                id="project"
                apiPath="/projects"
                placeholder={t("tasks.select_project")}
                onChange={(option) => field.onChange(option.value || null)}
              />
            )}
          />
          <InputError error={errors.project?.message} />
        </div>
        <div className="col-span-full space-y-2">
          <Label htmlFor="description">{t("general.description")}</Label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Textarea
                id="description"
                {...field}
                className="overflow-hidden resize-none"
                placeholder={t("general.description")}
                ref={textareaRef}
                onInput={(e) => {
                  field.onChange(e);
                  handleResize();
                }}
              />
            )}
          />
          <InputError error={errors.description?.message} />
        </div>
        <div className="space-y-2 col-span-full"></div>
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
