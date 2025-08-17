"use client";

import { Avatar, AvatarFallback } from "@app/components/ui/avatar";
import { ButtonPrimary } from "@app/components/ui/button-primary";
import { Input } from "@app/components/ui/input";
import { InputError } from "@app/components/ui/input-error";
import { Label } from "@app/components/ui/label";
import { Skeleton } from "@app/components/ui/skeleton";
import { UserInterface } from "@app/intefaces/user.interface";
import { userSchema } from "@app/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AvatarImage } from "@radix-ui/react-avatar";
import { User } from "lucide-react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUpdateProfileMutation } from "@app/services/user.service";

const PageContent = () => {
  const t = (key: string) => key;
  const { isLoading, data } = {
    isLoading: false,
    data: { name: "", email: "", phone: "", dni: "" } as UserInterface,
  };
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

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
    try {
      await updateProfile(formValues).unwrap();
      toast.success("Profile updated successfully", {
        description: "Profile Update Successfully",
      });
    } catch {
      toast.error("Failed to update profile", {
        description: "Profile Update Failed",
      });
    }
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
              {Object.keys(data || {})
                .filter((key) => {
                  return (
                    key === "name" ||
                    key === "email" ||
                    key === "phone" ||
                    key === "dni"
                  );
                })
                .map((key) => {
                  return (
                    <div key={key} className="flex flex-col gap-2">
                      <Label htmlFor={key} className="font-bold">
                        {t(`general.${key}`)}:
                      </Label>
                      <Input
                        id={key}
                        {...register(key as keyof UserInterface)}
                        placeholder={t("general.empty")}
                        className={`placeholder:text-muted-foreground placeholder:italic ${
                          errors[key as keyof UserInterface] && "border-red-500"
                        }`}
                      />
                      <InputError
                        error={errors[key as keyof UserInterface]?.message}
                      />
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

export default PageContent;
