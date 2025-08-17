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
import { ActivityItemsInterface } from "@app/intefaces/activity.interface";

interface ActivityItemsTableProps {
  items: ActivityItemsInterface[];
}

export const ActivityItemsTable: React.FC<ActivityItemsTableProps> = ({
  items,
}) => {
  const t = useTranslations();

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span>{t("activities.activity_items")}</span>
      </div>
      <div className="rounded-sm bg-gray-100/40 border">
        <Table className="w-full">
          <TableHeader className="border-b rounded-md">
            <TableHead>{t("general.name")}</TableHead>
            <TableHead>{t("activities.provider")}</TableHead>
            <TableHead>{t("activities.provider_item")}</TableHead>
            <TableHead>{t("activities.price")}</TableHead>
            <TableHead>{t("activities.percentage")}</TableHead>
          </TableHeader>
          <TableBody>
            {items.map((item) => {
              return (
                <TableRow key={item.id}>
                  <TableCell className="space-y-2 h-16">{item.name}</TableCell>
                  <TableCell className="space-y-2 h-16">
                    {item?.provider?.name || t("general.no_available")}
                  </TableCell>
                  <TableCell className="space-y-2 h-16">
                    {formatCurrency(item?.providerItem?.amount, "COP", "es-CO")}
                  </TableCell>
                  <TableCell className="space-y-2 h-16">
                    {formatCurrency(+item?.price?.amount, "COP", "es-CO")}
                  </TableCell>
                  <TableCell className="space-y-2 h-16">
                    {item.percentage}%
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
