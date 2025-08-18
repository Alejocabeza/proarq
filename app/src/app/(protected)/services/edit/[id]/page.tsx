"use client";

import { ButtonPrimary } from "@app/components/ui/button-primary";
import { Input } from "@app/components/ui/input";
import { InputError } from "@app/components/ui/input-error";
import { Label } from "@app/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, LoaderCircle, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  useDeleteServiceMutation,
  useFindOneServiceQuery,
  useUpdateServiceMutation,
} from "@app/services/service.service";
import {
  ServiceInterface,
  ServiceItemsInterface,
} from "@app/intefaces/service.interface";
import { serviceUpdateSchema } from "@app/schemas/service.schema";
import { ServiceItemsForm } from "../../components/service-items-form";
import { SelectLoader } from "@app/components/select-loader";
import { UnitEnum } from "@app/enum/unit.enum";

const Page = () => {
  const router = useRouter();
  const t = useTranslations();
  const { id } = useParams();
  const { isLoading, data } = useFindOneServiceQuery(id);
  const [updateData, { isLoading: isUpdating }] = useUpdateServiceMutation();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ServiceInterface>({
    resolver: zodResolver(serviceUpdateSchema),
    values: {
      ...data,
    },
  });
  const [deleteData] = useDeleteServiceMutation();

  const handleDelete = async (id: string) => {
    const res = await deleteData(id);
    if (res.data.statusCode !== 200) {
      toast.error(res.data.message, {
        description: "Service Delete Failed",
      });
      return;
    }
    toast.success(res.data.message, {
      description: "Service Delete Successfully",
    });
    router.push("/services");
  };

  const onSubmit: SubmitHandler<ServiceInterface> = async (formValues) => {
    const res = await updateData({ id, data: formValues });
    if (res.data.statusCode !== 200) {
      toast.error(res.data.message, {
        description: "Service Update Failed",
      });
      return;
    }
    toast.success(res.data.message, {
      description: "Service Update Successfully",
    });
  };

  useEffect(() => {
    if (!isLoading) {
      setValue("unit", data.unit);
      setValue(
        "serviceCategory",
        data.serviceCategory ? data.serviceCategory.id : null
      );
      setValue(
        "items",
        data.items.map((item: ServiceItemsInterface) => ({
          ...item,
          activity: item?.activity?.id,
          unitedPrice: item?.unitedPrice || 0,
          percentage: item?.percentage || 0,
        }))
      );
    }
  }, [isLoading, data.unit, data.serviceCategory, data.items, setValue]);

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
              <Link href={`/services/show/${id}`}>
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
              <Label htmlFor="unit">{t("general.unit")}</Label>
              <Controller
                name="unit"
                control={control}
                render={({ field }) => (
                  <SelectLoader
                    {...field}
                    id="unit"
                    initialValue={{ value: data.unit, label: data.unit }}
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
                    initialValue={
                      data.serviceCategory
                        ? {
                            value: data.serviceCategory.id,
                            label: data.serviceCategory.name,
                          }
                        : null
                    }
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
                data={data.items}
                setValue={setValue}
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
