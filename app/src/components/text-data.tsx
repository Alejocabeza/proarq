"use client";
import React, { PropsWithChildren } from "react";
import { Skeleton } from "./ui/skeleton";
import { useTranslations } from "next-intl";

interface TextDataProps extends PropsWithChildren {
  text: string | number | object;
  isLoading?: boolean;
  title?: string;
  className?: string;
}

export const TextData = ({ text, isLoading, title }: TextDataProps) => {
  const t = useTranslations();
  return (
    <div>
      {isLoading ? (
        <>
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
        </>
      ) : (
        <>
          <h3 className="font-bold capitalize">{t("general." + title)}:</h3>
          <span>
            {(text && typeof text === "object"
              ? (text as { name: string }).name
              : text) || t("general.no_available")}
          </span>
        </>
      )}
    </div>
  );
};
