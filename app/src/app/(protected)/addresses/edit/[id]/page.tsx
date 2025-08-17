"use client";

import { ButtonPrimary } from "@app/components/ui/button-primary";
import { Input } from "@app/components/ui/input";
import { InputError } from "@app/components/ui/input-error";
import { Label } from "@app/components/ui/label";
import { addressInterface } from "@app/intefaces/address.interface";
import { addressUpdateSchema } from "@app/schemas/address.schema";
import {
  useDeleteAddressMutation,
  useFindOneAddressQuery,
  useUpdateAddressMutation,
} from "@app/services/address.service";
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
  const { isLoading, data } = useFindOneAddressQuery(id);
  const [updateData, { isLoading: isUpdating }] = useUpdateAddressMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<addressInterface>({
    resolver: zodResolver(addressUpdateSchema),
    values: {
      ...data,
    },
  });
  const [deleteData] = useDeleteAddressMutation();

  const handleDelete = async (id: string) => {
    const res = await deleteData(id);
    if (res.data.statusCode !== 200) {
      toast.error(res.data.message, {
        description: "Address Delete Failed",
      });
      return;
    }
    toast.success(res.data.message, {
      description: "Address Delete Successfully",
    });
    router.push("/addresses");
  };

  const onSubmit: SubmitHandler<addressInterface> = async (formValues) => {
    const res = await updateData({ id, data: formValues });
    if (res.data.statusCode !== 200) {
      toast.error(res.data.message, {
        description: "Address Update Failed",
      });
      return;
    }
    toast.success(res.data.message, {
      description: "Address Update Successfully",
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
              <Link href={`/addresses/show/${id}`}>
                <ButtonPrimary value={t("general.show")} icon={Eye} />
              </Link>
              <ButtonPrimary
                value={t("general.delete")}
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
              <Label htmlFor="country">{t("general.country")}</Label>
              <Input
                {...register("country")}
                id="country"
                className={errors.country && `border-red-500`}
              />
              <InputError error={errors.country?.message} />
            </div>{" "}
            <div className="space-y-2">
              <Label htmlFor="state">{t("general.state")}</Label>
              <Input
                {...register("state")}
                id="state"
                className={errors.state && `border-red-500`}
              />
              <InputError error={errors.state?.message} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">{t("general.city")}</Label>
              <Input
                {...register("city")}
                id="city"
                className={errors.city && `border-red-500`}
              />
              <InputError error={errors.city?.message} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">{t("general.postalCode")}</Label>
              <Input
                {...register("postalCode")}
                id="postalCode"
                className={errors.postalCode && `border-red-500`}
              />
              <InputError error={errors.postalCode?.message} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mainAddress">{t("general.mainAddress")}</Label>
              <Input
                {...register("mainAddress")}
                id="mainAddress"
                className={errors.mainAddress && `border-red-500`}
              />
              <InputError error={errors.mainAddress?.message} />
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
