import React, { FC, HTMLAttributes } from "react";
import { Textarea } from "./ui/textarea";
import { cn } from "@app/lib/utils";

export const TextareaInput: FC<HTMLAttributes<HTMLTextAreaElement>> = ({
  className,
  ...props
}) => {
  return <Textarea {...props} className={cn("resize-none", className)} />;
};
