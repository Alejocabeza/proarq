"use client";

import { Input } from "@app/components/ui/input";
import { Label } from "@app/components/ui/label";
import { useTranslations } from "next-intl";
import { ButtonPrimary } from "@app/components/ui/button-primary";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { resetPasswordInterface } from "@app/intefaces/auth.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@app/schemas/auth.schema";
import { InputError } from "@app/components/ui/input-error";
import { useState, Suspense } from "react";
import { resetPasswordAction } from "@app/actions/auth.actions";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

function ResetPasswordFormContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<resetPasswordInterface>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit: SubmitHandler<resetPasswordInterface> = async (data) => {
    setIsLoading(true);
    const res = await resetPasswordAction(data, token as string);
    setIsLoading(false);
    if (res.error) {
      toast.error(res.title, {
        description: res.message,
      });
      return;
    }
    toast.success(res.title, {
      description: res.message,
    });
    router.push("/dashboard");
  };

  if (!token) router.push("/forgot-password");

  return (
    <form className={"flex flex-col gap-6"} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">
          {t("forgot-password.reset_your_password")}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t("reset-password.enter_your_password_below")}
        </p>{" "}
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="password">{t("general.password")}</Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            autoFocus
            className={errors.password && "border-red-500"}
            {...register("password")}
          />
          <InputError error={errors.password?.message} />
        </div>
        <ButtonPrimary
          value={t("reset-password.change_your_password")}
          isLoading={isLoading}
          disabled={isLoading}
        />
      </div>
      <div className="text-center text-sm text-balance">
        {t("forgot-password.dont_want_to_reset")}{" "}
        <Link href="/login" className="underline underline-offset-4">
          {t("general.login")}
        </Link>
      </div>
    </form>
  );
}

export default function ResetPasswordForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordFormContent />
    </Suspense>
  );
}
