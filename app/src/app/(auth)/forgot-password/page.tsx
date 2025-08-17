"use client";

import dynamicImport from "next/dynamic";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const ForgotPasswordForm = dynamicImport(
  () => import("./forgot-password-form"),
  { ssr: false }
);

export default ForgotPasswordForm;
