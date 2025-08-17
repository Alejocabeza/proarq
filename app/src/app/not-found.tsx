import { getTranslations } from "next-intl/server";
import React from "react";

export default async function NotFound() {
  const t = await getTranslations();
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="text-center">
        <h1 className="font-bold text-4xl">404</h1>
        <p>{t("general.not_found")}</p>
      </div>
    </div>
  );
}
