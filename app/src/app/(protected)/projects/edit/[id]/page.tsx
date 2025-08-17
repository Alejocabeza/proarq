"use client";

import { DatePicker } from "@app/components/date-picker";
import { SelectLoader } from "@app/components/select-loader";
import { ButtonPrimary } from "@app/components/ui/button-primary";
import { Input } from "@app/components/ui/input";
import { InputError } from "@app/components/ui/input-error";
import { Label } from "@app/components/ui/label";
import { Textarea } from "@app/components/ui/textarea";
import { TypeClientEnum } from "@app/enum/type-client.enum";
import { ProjectInterface } from "@app/intefaces/project.interface";
import { projectUpdateSchema } from "@app/schemas/project.schema";
import {
  useDeleteProjectMutation,
  useFindOneProjectQuery,
  useUpdateProjectMutation,
} from "@app/services/project.service";
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
  const { isLoading, data } = useFindOneProjectQuery(id);
  const [isClient, setIsClient] = React.useState(true);
  const [isBranch, setIsBranch] = React.useState(false);
  const [updateData, { isLoading: isUpdating }] = useUpdateProjectMutation();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProjectInterface>({
    resolver: zodResolver(projectUpdateSchema),
    values: {
      ...data,
    },
  });
  const [deleteData] = useDeleteProjectMutation();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleDelete = async (id: string) => {
    const res = await deleteData(id);
    if (res.data.statusCode !== 200) {
      toast.error(res.data.message, {
        description: "Project Delete Failed",
      });
      return;
    }
    toast.success(res.data.message, {
      description: "Project Delete Successfully",
    });
    router.push("/projects");
  };

  const handleResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (data) {
      setValue("client", data.client ? data.client.id : null);
      setValue("branch", data.branch ? data.branch.id : null);
      setValue("address", data.address ? data.address.id : null);
    }
  }, [data, setValue]);

  const onSubmit: SubmitHandler<ProjectInterface> = async (formValues) => {
    const res = await updateData({ id, data: formValues });
    if (res.data.statusCode !== 200) {
      toast.error(res.data.message, {
        description: "Project Update Failed",
      });
      return;
    }
    toast.success(res.data.message, {
      description: "Project Update Successfully",
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
              <Link href={`/projects/show/${id}`}>
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
              <Label htmlFor="typeClient">{t("projects.type_client")}</Label>
              <Controller
                control={control}
                name="typeClient"
                render={({ field }) => (
                  <SelectLoader
                    {...field}
                    id="typeClient"
                    initialValue={{
                      value: data.typeClient,
                      label: t(`general.${data.typeClient.toLowerCase()}`),
                    }}
                    options={[
                      {
                        value: TypeClientEnum.Branch,
                        label: t("general.branch"),
                      },
                      {
                        value: TypeClientEnum.Client,
                        label: t("general.client"),
                      },
                    ]}
                    onChange={(option) => {
                      field.onChange(option?.value);
                      if (option?.value === TypeClientEnum.Branch) {
                        setValue("client", null);
                        setIsClient(false);
                        setIsBranch(true);
                      } else if (option?.value === TypeClientEnum.Client) {
                        setValue("branch", null);
                        setIsBranch(false);
                        setIsClient(true);
                      } else {
                        setValue("client", null);
                        setValue("branch", null);
                        setIsClient(false);
                        setIsBranch(false);
                      }
                    }}
                  />
                )}
              />
              <InputError error={errors.typeClient?.message} />
            </div>
            <div className={`space-y-2 ${!isBranch && "hidden"}`}>
              <Label htmlFor="branch">{t("general.branch")}</Label>
              <Controller
                name="branch"
                control={control}
                render={({ field }) => (
                  <SelectLoader
                    {...field}
                    initialValue={
                      data.branch
                        ? {
                            value: data.branch.id,
                            label: data.branch.name,
                          }
                        : null
                    }
                    optionLabel="name"
                    id="branch"
                    apiPath="/branches"
                    placeholder={t("projects.select_branch")}
                    onChange={(option) =>
                      field.onChange(option ? option.value : null)
                    }
                  />
                )}
              />
              <InputError error={errors.branch?.message} />
            </div>
            <div className={`space-y-2 ${!isClient && "hidden"}`}>
              <Label htmlFor="client">{t("general.client")}</Label>
              <Controller
                name="client"
                control={control}
                render={({ field }) => (
                  <SelectLoader
                    {...field}
                    initialValue={
                      data.client
                        ? {
                            value: data.client.id,
                            label: data.client.name,
                          }
                        : null
                    }
                    optionLabel="name"
                    id="client"
                    apiPath="/clients"
                    placeholder={t("projects.select_client")}
                    onChange={(option) =>
                      field.onChange(option ? option.value : null)
                    }
                  />
                )}
              />
              <InputError error={errors.client?.message} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">{t("general.address")}</Label>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <SelectLoader
                    {...field}
                    initialValue={
                      data.address
                        ? {
                            value: data.address.id,
                            label: data.address.name,
                          }
                        : null
                    }
                    optionLabel="name"
                    id="address"
                    apiPath="/addresses"
                    placeholder={t("clients.select_address")}
                    onChange={(option) =>
                      field.onChange(option ? option.value : null)
                    }
                  />
                )}
              />
              <InputError error={errors.address?.message} />
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