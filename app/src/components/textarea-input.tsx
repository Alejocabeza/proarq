import React, { FC, HTMLAttributes } from "react";
import { Textarea } from "./ui/textarea";
import { cn } from "@app/lib/utils";

interface TextareaInputProps extends HTMLAttributes<HTMLTextAreaElement> {}

export const TextareaInput: FC<TextareaInputProps> = ({
  className,
  ...props
}) => {
  return <Textarea {...props} className={cn("resize-none", className)} />;
};
