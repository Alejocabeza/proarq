"use client";

import { Input } from "@app/components/ui/input";
import { Label } from "@app/components/ui/label";
import { ButtonOAuth } from "@app/components/ui/button-oauth";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import { ButtonPrimary } from "@app/components/ui/button-primary";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterInterface } from "@app/intefaces/auth.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@app/schemas/auth.schema";
import { InputError } from "@app/components/ui/input-error";
import { useState } from "react";
import { registerAction } from "@app/actions/auth.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInterface>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterInterface> = async (data) => {
    setIsLoading(true);
    const res = await registerAction(data);
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
    router.push("/login");
  };

  return (
    <form className={"flex flex-col gap-6"} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">
          {t("register.create_an_account")}
        </h1>
        <p className="text-balance text-sm text-muted-foreground">
          {t("register.for_starting_your_project")}
        </p>{" "}
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">{t("general.name")}</Label>
          <Input
            id="name"
            placeholder="John Doe"
            autoFocus
            className={errors.email && "border-red-500"}
            {...register("name")}
          />
          <InputError error={errors.name?.message} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">{t("general.email")}</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            className={errors.email && "border-red-500"}
            {...register("email")}
          />
          <InputError error={errors.email?.message} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">{t("general.password")}</Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            placeholder="**********"
            className={errors.email && "border-red-500"}
          />
          <InputError error={errors.password?.message} />
        </div>
        <ButtonPrimary
          value={t("general.register")}
          isLoading={isLoading}
          disabled={isLoading}
        />
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            {t("general.or_continue_with")}
          </span>
        </div>
        <ButtonOAuth
          value={t("general.register_with_google")}
          variant="outline"
          icon={<IconBrandGoogleFilled className="mr-2" />}
        />
      </div>
      <div className="text-center text-sm">
        {t("register.already_have_an_account")}{" "}
        <Link href="/login" className="underline underline-offset-4">
          {t("general.login")}
        </Link>
      </div>
    </form>
  );
}
