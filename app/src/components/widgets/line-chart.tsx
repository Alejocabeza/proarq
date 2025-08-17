"use client";

import { LoaderCircle } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

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
import { useFindAllClientByMonthQuery } from "@app/services/client.service";
import { useTranslations } from "next-intl";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function LineChartWidget() {
  const t = useTranslations();
  const { isLoading, data } = useFindAllClientByMonthQuery(null);
  const dataChart = data?.map((item: { month: string; count: number }) => ({
    month: t(`month.${item.month}`),
    clients: item.count,
  }));
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>{t("general.clients")}</CardTitle>
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
            <LineChart
              accessibilityLayer
              data={dataChart}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} strokeDasharray={"3 3"} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={0}
                tickFormatter={(value) => value.slice(0, 3)}
              />
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
              <Line
                dataKey="clients"
                name={t("general.clients")}
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
