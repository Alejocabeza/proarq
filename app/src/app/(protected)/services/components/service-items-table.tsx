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
import { formatCurrency } from "@app/lib/format-currency";
import { ServiceItemsInterface } from "@app/intefaces/service.interface";

interface ServiceItemsTableProps {
  items: ServiceItemsInterface[];
}

export const ServiceItemsTable: React.FC<ServiceItemsTableProps> = ({
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
            <TableHead>{t("services.activity")}</TableHead>
            <TableHead>{t("services.united_price")}</TableHead>
            <TableHead>{t("activities.percentage")}</TableHead>
          </TableHeader>
          <TableBody>
            {items.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell className="space-y-2 h-16">
                    {item?.activity?.name}
                  </TableCell>
                  <TableCell className="space-y-2 h-16">
                    {formatCurrency(item.unitedPrice, "COP", "es-CO")}
                  </TableCell>
                  <TableCell className="space-y-2 h-16">
                    {formatCurrency(item.percentage, "COP", "es-CO")}
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
