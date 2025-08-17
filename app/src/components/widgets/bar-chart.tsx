"use client";

import { LoaderCircle } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

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
import { useTranslations } from "next-intl";
import { useFindAllProjectByMonthQuery } from "@app/services/project.service";
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function BarChartWidget() {
  const t = useTranslations();
  const { isLoading, data } = useFindAllProjectByMonthQuery(null);

  const normalizeData = (data: { name: string; percentage: number }[] = []) => {
    const filledData = [...data];

    while (filledData.length < 5) {
      filledData.push({
        name: t("general.empty"),
        percentage: 0,
      });
    }

    return filledData;
  };

  const chartData = normalizeData(data);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("general.projects")}</CardTitle>
        <CardDescription>
          {t("month.january")} - {t("month.december")}{" "}
          {new Date().getFullYear()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <span className="loading loading-spinner loading-lg">
                <LoaderCircle className="animate-spin h-12 w-12" />
              </span>
            </div>
          ) : (
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis
                domain={[0, 100]}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="percentage"
                name={t("general.projects")}
                fill="var(--color-desktop)"
                radius={4}
              />
            </BarChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
