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
import { ProviderItemsInterface } from "@app/intefaces/provider.interface";
import { formatCurrency } from "@app/lib/format-currency";

interface ProviderItemsTableProps {
  items: ProviderItemsInterface[];
}

export const ProviderItemsTable: React.FC<ProviderItemsTableProps> = ({
  items,
}) => {
  const t = useTranslations();

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span>{t("providers.provider_items")}</span>
      </div>
      <div className="rounded-sm bg-gray-100/40 border">
        <Table className="w-full">
          <TableHeader className="border-b rounded-md">
            <TableHead>{t("general.name")}</TableHead>
            <TableHead>{t("general.price")}</TableHead>
          </TableHeader>
          <TableBody>
            {items.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell className="space-y-2 h-16">{item.name}</TableCell>
                  <TableCell className="space-y-2 h-16">
                    {formatCurrency(item.amount, "COP", "es-CO")}
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
