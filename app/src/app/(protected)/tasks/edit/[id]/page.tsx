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
import { taskUpdateSchema } from "@app/schemas/task.schema";
import {
  useDeleteTaskMutation,
  useFindOneTaskQuery,
  useUpdateTaskMutation,
} from "@app/services/task.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, LoaderCircle, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const Page = () => {
  const router = useRouter();
  const t = useTranslations();
  const { id } = useParams();
  const { isLoading, data } = useFindOneTaskQuery(id);
  const [updateData, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TaskInterface>({
    resolver: zodResolver(taskUpdateSchema),
    values: {
      ...data,
    },
  });
  const [deleteData] = useDeleteTaskMutation();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleDelete = async (id: string) => {
    const res = await deleteData(id);
    if (res.data.statusCode !== 200) {
      toast.error(res.data.message, {
        description: "Task Delete Failed",
      });
      return;
    }
    toast.success(res.data.message, {
      description: "Task Delete Successfully",
    });
    router.push("/tasks");
  };

  const handleResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (!isLoading) {
      setValue("project", data.project ? data.project.id : null);
      setValue("description", data.description);
    }
  }, [isLoading, data.project, data.description, setValue]);

  const onSubmit: SubmitHandler<TaskInterface> = async (formValues) => {
    const res = await updateData({ id, data: formValues });
    if (res.data.statusCode !== 200) {
      toast.error(res.data.message, {
        description: "Task Update Failed",
      });
      return;
    }
    toast.success(res.data.message, {
      description: "Task Update Successfully",
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
              <Link href={`/tasks/show/${id}`}>
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
            className="grid grid-cols-1 lg:grid-cols-2 gap-x-2 gap-y-4"
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
                    defaultValue={
                      new Date(
                        data.startDate.split("-")[0],
                        data.startDate.split("-")[1] - 1,
                        data.startDate.split("-")[2]
                      )
                    }
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
                    defaultValue={
                      new Date(
                        data.endDate.split("-")[0],
                        data.endDate.split("-")[1] - 1,
                        data.endDate.split("-")[2]
                      )
                    }
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
                      value: data.status,
                      label: t("general." + data.status.toLowerCase()),
                    }}
                    options={[
                      {
                        value: StatusEnum.PENDING,
                        label: t("general.pending"),
                      },
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
                    initialValue={{
                      value: data.project.id,
                      label: data.project.name,
                    }}
                    optionLabel="name"
                    id="project"
                    apiPath="/projects"
                    placeholder={t("tasks.select_project")}
                    onChange={(option) => field.onChange(option?.value || null)}
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
