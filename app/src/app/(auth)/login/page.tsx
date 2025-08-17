"use client";

import dynamicImport from "next/dynamic";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const LoginForm = dynamicImport(() => import("./login-form"), { ssr: false });

export default LoginForm;
