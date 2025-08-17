"use client";

import { Avatar, AvatarFallback } from "@app/components/ui/avatar";
import { ButtonPrimary } from "@app/components/ui/button-primary";
import { Input } from "@app/components/ui/input";
import { InputError } from "@app/components/ui/input-error";
import { Label } from "@app/components/ui/label";
import { Skeleton } from "@app/components/ui/skeleton";
import { UserInterface } from "@app/intefaces/user.interface";
import { userSchema } from "@app/schemas/user.schema";
import {
  useProfileQuery,
  useUpdateProfileMutation,
} from "@app/services/user.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { AvatarImage } from "@radix-ui/react-avatar";
import { User } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const Page = () => {
  const t = useTranslations();
  const { isLoading, data } = useProfileQuery(null);
  const [updateData, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInterface>({
    resolver: zodResolver(userSchema),
    values: {
      ...data,
    },
  });

  const onSubmit: SubmitHandler<UserInterface> = async (formValues) => {
    const res = await updateData(formValues);
    if (res.data.statusCode === 200) {
      return toast.success(res.data.message, {
        description: "Profile Update Successfully",
      });
    }
    return toast.error(res.data.message, {
      description: "Profile Update Failed",
    });
  };
  return (
    <section className="space-y-4">
      <header className="flex justify-between items-center p-4 border-b">
        <div className="flex justify-start items-center flex-1">
          {isLoading ? (
            <div className="flex justify-center items-center w-full gap-2">
              <Skeleton className="h-24 w-24 rounded-full" />
              <div className="space-y-1 flex-1">
                <Skeleton className="w-full h-12" />
                <Skeleton className="w-10/12 h-12" />
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-4">
              <Avatar className="h-24 w-24 rounded-full bg-gray-100 flex justify-center items-center">
                <AvatarImage src={data?.avatar} alt={data?.name} />
                <AvatarFallback>
                  <User className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h1 className="text-2xl font-bold">{data?.name}</h1>
                <p className="text-sm text-muted-foreground">{data?.email}</p>
              </div>
            </div>
          )}
        </div>
      </header>
      <main>
        <div className="space-y-4">
          <h2 className="font-bold text-xl">
            {t("profile.personal_information")}
          </h2>
          {isLoading ? (
            <Skeleton className="w-full h-28" />
          ) : (
            <form
              className="bg-gray-100/30 grid grid-cols-1 lg:grid-cols-3 p-4 rounded-lg gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              {Object.entries(data || {}).map(([key, value]) => {
                if (
                  key === "refresh_token" ||
                  key === "reset_password_token" ||
                  key === "id"
                )
                  return;
                return (
                  <div key={key} className="flex flex-col gap-2">
                    <Label htmlFor={key} className="font-bold">
                      {t(`general.${key}`)}:
                    </Label>
                    <Input
                      id={key}
                      {...register(key as keyof UserInterface)}
                      placeholder={t("general.empty")}
                      className={`placeholder:text-muted-foreground placeholder:italic ${(errors as any)[key] && "border-red-500"}`}
                    />
                    <InputError error={(errors as any)[key]?.message} />
                  </div>
                );
              })}
              <ButtonPrimary
                type="submit"
                className="col-span-full"
                value={t("general.update")}
                isLoading={isUpdating}
                disabled={isUpdating}
              />
            </form>
          )}
        </div>
      </main>
    </section>
  );
};

export default Page;
