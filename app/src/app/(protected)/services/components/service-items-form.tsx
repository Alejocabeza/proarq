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
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  useFieldArray,
} from "react-hook-form";
import { ButtonPrimary } from "@app/components/ui/button-primary";
import { CirclePlus, Trash } from "lucide-react";
import { Button } from "@app/components/ui/button";
import { InputError } from "@app/components/ui/input-error";
import { SelectLoader } from "@app/components/select-loader";
import {
  ServiceInterface,
  ServiceItemsInterface,
} from "@app/intefaces/service.interface";
import { Input } from "@app/components/ui/input";
import { useSession } from "next-auth/react";

interface ServiceItemsFormProps {
  control: Control<ServiceInterface>;
  register: UseFormRegister<ServiceInterface>;
  errors: FieldErrors<ServiceInterface>;
  action?: "create" | "update";
  data?: ServiceItemsInterface[];
  setValue: UseFormSetValue<ServiceInterface>;
}

const defaultItem: ServiceItemsInterface = {
  activity: null,
  unitedPrice: 0,
  percentage: 0,
};

export const ServiceItemsForm: React.FC<ServiceItemsFormProps> = ({
  control,
  errors,
  data = [],
  setValue,
  register,
}) => {
  const t = useTranslations();
  const { data: session } = useSession();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const handleFetchActivity = async (
    activity: string | null,
    index: number
  ) => {
    try {
      if (!activity) {
        setValue(`items.${index}.unitedPrice`, 0);
        setValue(`items.${index}.percentage`, 0);
      } else {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/activities/amounts/${activity}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session?.user.access_token}`,
            },
          }
        );
        const data = await response.json();

        setValue(`items.${index}.unitedPrice`, data.unitedPrice);
        setValue(`items.${index}.percentage`, data.percentageAmount);
      }
    } catch (error) {
      console.error("Error fetching activity data:", error);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span>{t("services.services_items")}</span>
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
            <TableHead>{t("services.activity")}</TableHead>
            <TableHead>{t("services.united_price")}</TableHead>
            <TableHead>{t("activities.percentage")}</TableHead>
            <TableHead>{t("general.actions")}</TableHead>
          </TableHeader>
          <TableBody>
            {fields.length > 0 ? (
              fields.map((field, index) => {
                const defaultActivity = data[index]?.activity && {
                  value: data[index]?.activity.id as string,
                  label: data[index]?.activity.name as string,
                };

                const fieldErrors = errors.items?.[index];

                return (
                  <TableRow key={field.id}>
                    <TableCell>
                      <Controller
                        control={control}
                        name={`items.${index}.activity`}
                        render={({ field }) => (
                          <SelectLoader
                            {...field}
                            optionLabel="name"
                            id="activity"
                            apiPath="/activities"
                            initialValue={defaultActivity}
                            onChange={(option) => {
                              field.onChange(option?.value || null);
                              handleFetchActivity(option?.value || null, index);
                            }}
                          />
                        )}
                      />
                      {fieldErrors?.activity && (
                        <InputError error={fieldErrors.activity.message} />
                      )}
                    </TableCell>
                    <TableCell>
                      <Input
                        {...register(`items.${index}.unitedPrice`)}
                        type="number"
                        step="0.01"
                        disabled
                      />
                      {fieldErrors?.unitedPrice && (
                        <InputError error={fieldErrors.unitedPrice.message} />
                      )}
                    </TableCell>
                    <TableCell>
                      <Input
                        {...register(`items.${index}.percentage`)}
                        type="number"
                        step="0.01"
                        disabled
                      />
                      {fieldErrors?.percentage && (
                        <InputError error={fieldErrors.percentage.message} />
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
                <TableCell colSpan={4} className="text-center">
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
