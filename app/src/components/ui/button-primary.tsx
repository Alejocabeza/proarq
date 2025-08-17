import React from "react";
import { Button, ButtonProps } from "./button";
import { cn } from "@app/lib/utils";
import { LoaderCircle, LucideIcon } from "lucide-react";

interface ButtonPrimaryProps extends ButtonProps {
  value?: string;
  icon?: LucideIcon;
  isLoading?: boolean;
}

export const ButtonPrimary = ({
  value,
  children,
  className,
  icon: Icon,
  isLoading,
  ...props
}: ButtonPrimaryProps) => {
  return (
    <Button disabled={isLoading} className={cn("w-full", className)} {...props}>
      {isLoading ? (
        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <>
          {Icon && <Icon className="h-4 w-4" />}
          {children || value}
        </>
      )}
    </Button>
  );
};
