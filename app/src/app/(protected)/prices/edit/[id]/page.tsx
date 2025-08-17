"use client";

import { ButtonPrimary } from "@app/components/ui/button-primary";
import { Input } from "@app/components/ui/input";
import { InputError } from "@app/components/ui/input-error";
import { Label } from "@app/components/ui/label";
import { PriceInterface } from "@app/intefaces/price.interface";
import { priceUpdateSchema } from "@app/schemas/price.schema";
import {
  useDeletePriceMutation,
  useFindOnePriceQuery,
  useUpdatePriceMutation,
} from "@app/services/price.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, LoaderCircle, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const Page = () => {
  const router = useRouter();
  const t = useTranslations();
  const { id } = useParams();
  const { isLoading, data } = useFindOnePriceQuery(id);
  const [updateData, { isLoading: isUpdating }] = useUpdatePriceMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PriceInterface>({
    resolver: zodResolver(priceUpdateSchema),
    values: {
      ...data,
      address: data?.address?.id || null,
    },
  });
  const [deleteData] = useDeletePriceMutation();

  const handleDelete = async (id: string) => {
    const res = await deleteData(id);
    if (res.data.statusCode !== 200) {
      toast.error(res.data.message, {
        description: "Price Delete Failed",
      });
      return;
    }
    toast.success(res.data.message, {
      description: "Price Delete Successfully",
    });
    router.push("/prices");
  };

  const onSubmit: SubmitHandler<PriceInterface> = async (formValues) => {
    const res = await updateData({ id, data: formValues });
    if (res.data.statusCode !== 200) {
      toast.error(res.data.message, {
        description: "Price Update Failed",
      });
      return;
    }
    toast.success(res.data.message, {
      description: "Price Update Successfully",
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
              <Link href={`/prices/show/${id}`}>
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
              <Label htmlFor="amount">{t("general.amount")}</Label>
              <Input
                {...register("amount")}
                id="amount"
                type="number"
                className={errors.amount && `border-red-500`}
              />
              <InputError error={errors.amount?.message} />
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
