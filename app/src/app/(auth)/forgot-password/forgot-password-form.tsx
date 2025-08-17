"use client";

import { Input } from "@app/components/ui/input";
import { Label } from "@app/components/ui/label";
import { useTranslations } from "next-intl";
import { ButtonPrimary } from "@app/components/ui/button-primary";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { forgotPasswordInterface } from "@app/intefaces/auth.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@app/schemas/auth.schema";
import { InputError } from "@app/components/ui/input-error";
import { useState } from "react";
import { forgotPasswordAction } from "@app/actions/auth.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<forgotPasswordInterface>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<forgotPasswordInterface> = async (data) => {
    setIsLoading(true);
    const res = await forgotPasswordAction(data);
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

  return (
    <form className={"flex flex-col gap-6"} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">
          {t("forgot-password.reset_your_password")}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t("forgot-password.enter_your_email_below")}
        </p>{" "}
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">{t("general.email")}</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            autoFocus
            className={errors.email && "border-red-500"}
            {...register("email")}
          />
          <InputError error={errors.email?.message} />
        </div>
        <ButtonPrimary
          value={t("forgot-password.send_reset_link")}
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
