import { BarChartWidget } from "@app/components/widgets/bar-chart";
import { LineChartWidget } from "@app/components/widgets/line-chart";
import { PieChartWidget } from "@app/components/widgets/pie-chart";
import { StatusEnum } from "@app/enum/status.enum";
import { getTranslations } from "next-intl/server";
import React from "react";

export default async function Dashboard() {
  const t = await getTranslations();
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <PieChartWidget
          status={StatusEnum.PENDING}
          statusName={t("tasks.task_pending")}
          title={t("tasks.task_pending")}
        />
        <PieChartWidget
          status={StatusEnum.IN_PROGRESS}
          statusName={t("tasks.task_in_progress")}
          title={t("tasks.task_in_progress")}
        />
        <PieChartWidget
          status={StatusEnum.DONE}
          statusName={t("tasks.task_done")}
          title={t("tasks.task_done")}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <BarChartWidget />
        <LineChartWidget />
      </div>
    </>
  );
}
