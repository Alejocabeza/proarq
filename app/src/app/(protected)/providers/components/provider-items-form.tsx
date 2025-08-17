"use client";

import { useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@app/components/ui/table";
import React, { useEffect } from "react";
import { Input } from "@app/components/ui/input";
import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormRegister,
} from "react-hook-form";
import { ButtonPrimary } from "@app/components/ui/button-primary";
import { CirclePlus, Trash } from "lucide-react";
import { Button } from "@app/components/ui/button";
import { InputError } from "@app/components/ui/input-error";
import {
  ProviderInterface,
  ProviderItemsInterface,
} from "@app/intefaces/provider.interface";

interface ProviderItemsTableProps {
  control: Control<ProviderInterface>;
  register: UseFormRegister<ProviderInterface>;
  errors: FieldErrors<ProviderInterface>;
  action?: "create" | "update";
}

const defaultItem: ProviderItemsInterface = {
  name: "",
  amount: 0,
};

export const ProviderItemsForm: React.FC<ProviderItemsTableProps> = ({
  control,
  register,
  errors,
  action = "create",
}) => {
  const t = useTranslations();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  useEffect(() => {
    if (action === "create") {
      if (fields.length <= 0) {
        append(defaultItem);
      }
    }
  }, []);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span>{t("providers.provider_items")}</span>
        <ButtonPrimary
          value={t("general.add")}
          icon={CirclePlus}
          className="w-max"
          onClick={() => append(defaultItem)}
        />
      </div>
      <div className="rounded-sm bg-gray-100/40 border">
        <Table className="w-full">
          <TableHeader className="border-b rounded-md">
            <TableHead>{t("general.name")}</TableHead>
            <TableHead>{t("general.price")}</TableHead>
            <TableHead>{t("general.actions")}</TableHead>
          </TableHeader>
          <TableBody>
            {fields.map((field, index) => {
              return (
                <TableRow key={field.id}>
                  <TableCell className="space-y-2">
                    <Input
                      placeholder={t("general.name")}
                      className={
                        errors.items && errors.items[index]?.name?.message
                          ? "border-red-500"
                          : ""
                      }
                      {...register(`items.${index}.name`)}
                    />
                    {errors?.items && (
                      <InputError error={errors?.items[index]?.name?.message} />
                    )}
                  </TableCell>
                  <TableCell className="space-y-2">
                    <Input
                      placeholder={t("general.price")}
                      className={
                        errors.items && errors.items[index]?.amount?.message
                          ? "border-red-500"
                          : ""
                      }
                      type="number"
                      {...register(`items.${index}.amount`, {
                        value: field.amount,
                      })}
                    />
                    {errors?.items && (
                      <InputError
                        error={errors?.items[index]?.amount?.message}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button size="icon" onClick={() => remove(index)}>
                      <Trash className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
