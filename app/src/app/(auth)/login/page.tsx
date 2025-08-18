"use client";

import { Input } from "@app/components/ui/input";
import { Label } from "@app/components/ui/label";
import { ButtonOAuth } from "@app/components/ui/button-oauth";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { ButtonPrimary } from "@app/components/ui/button-primary";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginInterface } from "@app/intefaces/auth.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@app/schemas/auth.schema";
import { InputError } from "@app/components/ui/input-error";
import { useState } from "react";
import { loginAction } from "@app/actions/auth.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInterface>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginInterface> = async (data) => {
    setIsLoading(true);
    const res = await loginAction(data);
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
          {t("login.login_to_your_account")}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t("login.enter_your_email_below")}
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
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">{t("general.password")}</Label>
            <a
              href="/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              {t("general.forgot_password")}
            </a>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="**********"
            {...register("password")}
            className={errors.email && "border-red-500"}
          />
          <InputError error={errors.password?.message} />
        </div>
        <ButtonPrimary
          value={t("general.login")}
          isLoading={isLoading}
          disabled={isLoading}
        />
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            {t("general.or_continue_with")}
          </span>
        </div>
        <ButtonOAuth
          value={t("general.login_with_google")}
          variant="outline"
          icon={<IconBrandGoogleFilled className="mr-2" />}
        />
      </div>
      <div className="text-center text-sm">
        {t("login.dont_have_an_account")}{" "}
        <Link href="/register" className="underline underline-offset-4">
          {t("general.register")}
        </Link>
      </div>
    </form>
  );
}
