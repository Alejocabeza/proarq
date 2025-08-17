"use client";

import dynamicImport from "next/dynamic";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NotFoundPage = dynamicImport(() => import("./not-found-page"), {
  ssr: false,
});

export default NotFoundPage;
