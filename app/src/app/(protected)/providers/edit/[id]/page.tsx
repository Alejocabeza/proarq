"use client";

import { SelectLoader } from "@app/components/select-loader";
import { ButtonPrimary } from "@app/components/ui/button-primary";
import { Input } from "@app/components/ui/input";
import { InputError } from "@app/components/ui/input-error";
import { Label } from "@app/components/ui/label";
import {
  useDeleteProviderMutation,
  useFindOneProviderQuery,
  useUpdateProviderMutation,
} from "@app/services/provider.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, LoaderCircle, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { providerUpdateSchema } from "@app/schemas/provider.schema";
import { ProviderInterface } from "@app/intefaces/provider.interface";
import { ProviderItemsForm } from "../../components/provider-items-form";

const Page = () => {
  const router = useRouter();
  const t = useTranslations();
  const { id } = useParams();
  const { isLoading, data } = useFindOneProviderQuery(id);
  const [updateData, { isLoading: isUpdating }] = useUpdateProviderMutation();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProviderInterface>({
    resolver: zodResolver(providerUpdateSchema),
    values: {
      ...data,
      address: data?.address?.id || null,
    },
  });
  const [deleteData] = useDeleteProviderMutation();

  const handleDelete = async (id: string) => {
    const res = await deleteData(id);
    if (res.data.statusCode !== 200) {
      toast.error(res.data.message, {
        description: "Provider Delete Failed",
      });
      return;
    }
    toast.success(res.data.message, {
      description: "Provider Delete Successfully",
    });
    router.push("/providers");
  };

  const onSubmit: SubmitHandler<ProviderInterface> = async (formValues) => {
    const res = await updateData({ id, data: formValues });
    if (res.data.statusCode !== 200) {
      toast.error(res.data.message, {
        description: "Provider Update Failed",
      });
      return;
    }
    toast.success(res.data.message, {
      description: "Provider Update Successfully",
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
              <Link href={`/providers/show/${id}`}>
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
                    initialValue={
                      data?.address
                        ? {
                            value: data?.address?.id,
                            label: data?.address?.name,
                          }
                        : { value: null, label: t("general.none") }
                    }
                    placeholder={t("clients.select_address")}
                    onChange={(option) => field.onChange(option ? option.value : null)}
                  />
                )}
              />
              <InputError error={errors.address?.message} />
            </div>
            <div className="col-span-full">
              <ProviderItemsForm
                control={control}
                register={register}
                errors={errors}
                action="update"
              />
            </div>
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
