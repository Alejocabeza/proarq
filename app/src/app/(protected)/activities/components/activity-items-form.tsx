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
import React, { useEffect, useState } from "react";
import { Input } from "@app/components/ui/input";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  useFieldArray,
  useWatch,
} from "react-hook-form";
import { ButtonPrimary } from "@app/components/ui/button-primary";
import { CirclePlus, Trash } from "lucide-react";
import { Button } from "@app/components/ui/button";
import { InputError } from "@app/components/ui/input-error";
import { SelectLoader } from "@app/components/select-loader";
import {
  ActivityInterface,
  ActivityItemsInterface,
} from "@app/intefaces/activity.interface";

interface ActivityItemsFormProps {
  control: Control<ActivityInterface>;
  register: UseFormRegister<ActivityInterface>;
  errors: FieldErrors<ActivityInterface>;
  action?: "create" | "update";
  data?: ActivityItemsInterface[];
}

const defaultItem: ActivityItemsInterface = {
  name: "",
  provider: null,
  providerItem: null,
  price: null,
  percentage: 0,
};

export const ActivityItemsForm: React.FC<ActivityItemsFormProps> = ({
  control,
  register,
  errors,
  data = [],
}) => {
  const t = useTranslations();
  const [items, setItems] = useState<ActivityItemsInterface[] | undefined>([]);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const watch = useWatch({
    control,
    name: "items",
  });

  useEffect(() => {
    setItems(watch);
  }, [watch]);

  const renderInputWithError = (
    fieldName: `items.${number}.name` | `items.${number}.percentage`,
    index: number,
    placeholder: string,
    errorMessage?: string
  ) => (
    <div className="space-y-2">
      <Input
        placeholder={placeholder}
        className={errorMessage ? "border-red-500" : ""}
        {...register(fieldName)}
      />
      {errorMessage && <InputError error={errorMessage} />}
    </div>
  );

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span>{t("activities.activity_items")}</span>
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
            <TableHead>{t("activities.provider")}</TableHead>
            <TableHead>{t("activities.provider_item")}</TableHead>
            <TableHead>{t("activities.price")}</TableHead>
            <TableHead>{t("activities.percentage")}</TableHead>
            <TableHead>{t("general.actions")}</TableHead>
          </TableHeader>
          <TableBody>
            {fields.length > 0 ? (
              fields.map((field, index: number) => {
                let defaultPrice = null;
                let defaultProvider = null;
                let defaultProviderItem = null;
                if (data) {
                  defaultPrice = {
                    value: data[index]?.price?.id as string,
                    label: data[index]?.price?.name as string,
                  };
                  defaultProvider = {
                    value: data[index]?.provider?.id as string,
                    label: data[index]?.provider?.name as string,
                  };
                  defaultProviderItem = {
                    value: data[index]?.providerItem?.id as string,
                    label: data[index]?.providerItem?.name as string,
                  };
                }

                const fieldErrors = errors.items?.[index];
                return (
                  <TableRow key={field.id}>
                    <TableCell>
                      {renderInputWithError(
                        `items.${index}.name`,
                        index,
                        t("general.name"),
                        fieldErrors?.name?.message
                      )}
                    </TableCell>

                    <TableCell>
                      <Controller
                        control={control}
                        name={`items.${index}.provider`}
                        render={({ field }) => (
                          <SelectLoader
                            {...field}
                            optionLabel="name"
                            id="provider"
                            apiPath="/providers"
                            initialValue={defaultProvider}
                            placeholder={t("activities.select_provider")}
                            onChange={(option) =>
                              !option || option.value === null
                                ? field.onChange(null)
                                : field.onChange(option.value)
                            }
                          />
                        )}
                      />
                      {fieldErrors?.provider && (
                        <InputError error={fieldErrors?.provider?.message} />
                      )}
                    </TableCell>

                    <TableCell>
                      <Controller
                        control={control}
                        name={`items.${index}.providerItem`}
                        render={({ field }) => (
                          <SelectLoader
                            {...field}
                            optionLabel={["name", "amount"]}
                            id="providerItem"
                            apiPath={`/providers/items`}
                            initialValue={defaultProviderItem}
                            dependsOn="provider"
                            placeholder={t("activities.select_provider")}
                            onChange={(option) =>
                              !option || option.value === null
                                ? field.onChange(null)
                                : field.onChange(option.value)
                            }
                            state={
                              items &&
                              (items[index] as unknown as Record<
                                string,
                                unknown
                              >)
                            }
                          />
                        )}
                      />
                      {fieldErrors?.providerItem && (
                        <InputError
                          error={fieldErrors?.providerItem?.message}
                        />
                      )}
                    </TableCell>

                    <TableCell>
                      <Controller
                        control={control}
                        name={`items.${index}.price`}
                        render={({ field }) => (
                          <SelectLoader
                            {...field}
                            optionLabel={["name", "amount"]}
                            id="price"
                            apiPath="/prices"
                            initialValue={defaultPrice}
                            placeholder={t("activities.select_price")}
                            onChange={(option) =>
                              !option || option.value === null
                                ? field.onChange(null)
                                : field.onChange(option.value)
                            }
                          />
                        )}
                      />
                      {fieldErrors?.price && (
                        <InputError error={fieldErrors?.price?.message} />
                      )}
                    </TableCell>

                    <TableCell>
                      {renderInputWithError(
                        `items.${index}.percentage`,
                        index,
                        t("general.name"),
                        fieldErrors?.percentage?.message
                      )}
                    </TableCell>

                    <TableCell>
                      <Button size="icon" onClick={() => remove(index)}>
                        <Trash className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  {t("general.no_items")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
