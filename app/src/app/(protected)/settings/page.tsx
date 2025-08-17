import { getTranslations } from "next-intl/server";
import React from "react";
import { SettingForm } from "./components/setting-form";

const Page = async () => {
  const t = await getTranslations();
  return (
    <div>
      <h1 className="text-3xl font-bold">{t("general.settings")}</h1>
      <p>Configuracion tu herramienta y personalizala a tu gusto</p>
      <SettingForm />
    </div>
  );
};

export default Page;
