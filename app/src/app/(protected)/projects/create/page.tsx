"use client";

import dynamicImport from "next/dynamic";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const Page = dynamicImport(() => import("./page-content"), { ssr: false });

export default Page;
