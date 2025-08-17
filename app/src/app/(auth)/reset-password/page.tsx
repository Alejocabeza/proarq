"use client";

import dynamicImport from "next/dynamic";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const ResetPasswordForm = dynamicImport(() => import("./reset-password-form"), {
  ssr: false,
});

export default ResetPasswordForm;
