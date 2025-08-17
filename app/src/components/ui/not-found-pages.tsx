import { useTranslations } from "next-intl";
import React from "react";

export const NotFoundComponent = ({ name }: { name: string }) => {
  const t = useTranslations();

  return (
    <div className="flex justify-center items-center h-[calc(100vh-5rem)] w-full">
      <div className="text-center space-y-2">
        <h1 className="font-bold text-4xl">{name}</h1>
        <span>{t("general.page_building", { name })}</span>
      </div>
    </div>
  );
};
