"use client";

import dynamicImport from "next/dynamic";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const RegisterForm = dynamicImport(() => import("./register-form"), {
  ssr: false,
});

export default RegisterForm;
