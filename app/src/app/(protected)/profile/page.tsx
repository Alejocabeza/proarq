"use client";

import { TextData } from "@app/components/text-data";
import { Avatar } from "@app/components/ui/avatar";
import ButtonLink from "@app/components/ui/button-link";
import { Skeleton } from "@app/components/ui/skeleton";
import { useProfileQuery } from "@app/services/user.service";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Pencil, User } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

export default function Profile() {
  const t = useTranslations();
  const { isLoading, data } = useProfileQuery(null);
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
        <div className="flex justify-end items-center flex-1">
          <ButtonLink
            href="/profile/edit"
            className="flex gap-2 bg-gray-200 rounded px-2 py-1 justify-center items-center transition-colors duration-300 hover:bg-primary hover:text-white"
          >
            <Pencil className="h-4 w-4" />
            {t("general.edit")}
          </ButtonLink>
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
            <div className="bg-gray-100/30 grid grid-cols-1 lg:grid-cols-3 p-4 rounded-lg space-y-4">
              {Object.entries(data || {}).map(([key, value]) => {
                if (
                  key === "refresh_token" ||
                  key === "reset_password_token" ||
                  key === "id"
                )
                  return;
                return (
                  <TextData key={key} title={key} text={value as string} />
                );
              })}
            </div>
          )}
        </div>
      </main>
    </section>
  );
}
