"use client";

import * as React from "react";
import { Label, Pie, PieChart, Cell } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@app/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@app/components/ui/chart";
import { StatusEnum } from "@app/enum/status.enum";
import { useFindTaskCountQuery } from "@app/services/task.service";
import { useTranslations } from "next-intl";
import { LoaderCircle } from "lucide-react";

interface PieChartWidgetProps {
  statusName: string;
  status: StatusEnum;
  title: string;
}

export function PieChartWidget({
  status,
  statusName,
  title,
}: PieChartWidgetProps) {
  const t = useTranslations();
  const { isLoading, data } = useFindTaskCountQuery({ status });
  const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))"];

  const totalTasks = data?.totalTask || 1;
  const normalizedData = [
    {
      statusName,
      count: data?.taskCount || 0,
      percentage: ((data?.taskCount || 0) / totalTasks) * 100,
    },
    {
      statusName: t("tasks.total_tasks"),
      count: totalTasks - (data?.taskCount || 0),
      percentage: ((totalTasks - (data?.taskCount || 0)) / totalTasks) * 100,
    },
  ];

  const config = {
    "tasks.total_tasks": {
      label: t("tasks.total_tasks"),
      color: COLORS[0],
    },
    "tasks.task_pending": {
      label: t("tasks.task_pending"),
      color: COLORS[1],
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {t("month.january")} - {t("month.december")}{" "}
          {new Date().getFullYear()}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={config}
          className="mx-auto aspect-square max-h-[250px]"
        >
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <span className="loading loading-spinner loading-lg">
                <LoaderCircle className="animate-spin h-12 w-12" />
              </span>
            </div>
          ) : (
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={normalizedData}
                dataKey="count"
                nameKey="statusName"
                innerRadius={60}
                outerRadius={100}
                strokeWidth={5}
              >
                {normalizedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {data?.taskCount || 0}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            {statusName}
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
