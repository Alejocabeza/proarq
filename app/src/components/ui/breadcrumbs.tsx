"use client";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "./breadcrumb";
import { useTranslations } from "next-intl";

export const Breadcrumbs = () => {
  const t = useTranslations();
  const pathnames = usePathname()
    .split("/")
    .filter((path) => path !== "");

  const isUUID = (str: string) =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {pathnames.map((name, index) => {
            const path = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            return (
              <BreadcrumbLink key={name} href={path}>
                {isUUID(name) ? name : t("general." + name)}
                {!isLast && (
                  <span className="mx-2 text-muted-foreground">/</span>
                )}
              </BreadcrumbLink>
            );
          })}
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
