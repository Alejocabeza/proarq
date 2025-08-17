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
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  useDeleteActivityMutation,
  useFindOneActivityQuery,
  useUpdateActivityMutation,
} from "@app/services/activity.service";
import {
  ActivityInterface,
  ActivityItemsInterface,
} from "@app/intefaces/activity.interface";
import { activityUpdateSchema } from "@app/schemas/activity.schema";
import { ActivityItemsForm } from "../../components/activity-items-form";

const Page = () => {
  const router = useRouter();
  const t = useTranslations();
  const { id } = useParams();
  const { isLoading, data } = useFindOneActivityQuery(id);
  const [updateData, { isLoading: isUpdating }] = useUpdateActivityMutation();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ActivityInterface>({
    resolver: zodResolver(activityUpdateSchema),
    values: {
      ...data,
    },
  });
  const [deleteData] = useDeleteActivityMutation();

  const handleDelete = async (id: string) => {
    const res = await deleteData(id);
    if (res.data.statusCode !== 200) {
      toast.error(res.data.message, {
        description: "Activity Delete Failed",
      });
      return;
    }
    toast.success(res.data.message, {
      description: "Activity Delete Successfully",
    });
    router.push("/activity");
  };

  const onSubmit: SubmitHandler<ActivityInterface> = async (formValues) => {
    const res = await updateData({ id, data: formValues });
    if (res.data.statusCode !== 200) {
      toast.error(res.data.message, {
        description: "Activity Update Failed",
      });
      return;
    }
    toast.success(res.data.message, {
      description: "Activity Update Successfully",
    });
  };

  useEffect(() => {
    if (data) {
      setValue(
        "items",
        data.items.map((item: ActivityItemsInterface) => ({
          ...item,
          provider: item?.provider?.id,
          providerItem: item?.providerItem?.id,
          price: item.price?.id,
        })),
      );
    }
  }, [data, setValue]);

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
              <Link href={`/activities/show/${id}`}>
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
            <div className="col-span-full">
              <ActivityItemsForm
                control={control}
                register={register}
                errors={errors}
                data={data.items}
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
