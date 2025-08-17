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
import { projectSchema } from "@app/schemas/project.schema";
import { useCreateProjectMutation } from "@app/services/project.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const Page = () => {
  const router = useRouter();
  const t = useTranslations();
  const [isClient, setIsClient] = React.useState(true);
  const [isBranch, setIsBranch] = React.useState(false);
  const [createData, { isLoading }] = useCreateProjectMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProjectInterface>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      client: null,
      branch: null,
      address: null,
      typeClient: TypeClientEnum.Client,
    },
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onSubmit: SubmitHandler<ProjectInterface> = async (formValues) => {
    const res = await createData(formValues);
    if (res.data.statusCode !== 201) {
      toast.error(res.data.message, {
        description: "Project Create Failed",
      });
      return;
    }
    toast.success(res.data.message, {
      description: "Project Create Successfully",
    });
    reset();
    router.push("/projects");
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
          <Label htmlFor="typeClient">{t("projects.type_client")}</Label>
          <Controller
            control={control}
            name="typeClient"
            render={({ field }) => (
              <SelectLoader
                {...field}
                id="typeClient"
                initialValue={{
                  value: TypeClientEnum.Client,
                  label: t("general.client"),
                }}
                options={[
                  { value: TypeClientEnum.Branch, label: t("general.branch") },
                  { value: TypeClientEnum.Client, label: t("general.client") },
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
                initialValue={null}
                optionLabel="name"
                id="branch"
                apiPath="/branches"
                placeholder={t("projects.select_branch")}
                onChange={(option) => field.onChange(option.value || null)}
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
                initialValue={null}
                optionLabel="name"
                id="client"
                apiPath="/clients"
                placeholder={t("projects.select_client")}
                onChange={(option) => field.onChange(option.value || null)}
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
                initialValue={null}
                optionLabel="name"
                id="address"
                apiPath="/addresses"
                placeholder={t("clients.select_address")}
                onChange={(option) => field.onChange(option.value || null)}
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
          value={t("general.create")}
          className="col-span-full"
          isLoading={isLoading}
        />
      </form>
    </>
  );
};

export default Page;
