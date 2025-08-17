import { cn } from "@app/lib/utils";
import React from "react";

export const InputError = ({
  error,
  className,
}: {
  error: string | undefined;
  className?: string;
}) => {
  return (
    <>
      {error && (
        <span className={cn("text-sm text-red-500", className)}>{error}</span>
      )}
    </>
  );
};
