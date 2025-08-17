import React, { ReactNode } from "react";
import { Button, ButtonProps } from "./button";
import { cn } from "@app/lib/utils";

interface ButtonOAuthProps extends ButtonProps {
  value?: string;
  icon?: ReactNode;
}

export const ButtonOAuth = ({
  value,
  children,
  icon,
  className,
  ...props
}: ButtonOAuthProps) => {
  return (
    <Button className={cn("w-full", className)} {...props}>
      {icon}
      {children || value}
    </Button>
  );
};
