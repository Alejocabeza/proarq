"use client";
import { NotFoundComponent } from "@app/components/ui/not-found-pages";
import { useTranslations } from "next-intl";
import React from "react";

export default function Page() {
  const t = useTranslations();
  return (
    <div>
      <NotFoundComponent name={t('general.quotes')} />
    </div>
  );
}
