"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", potato: 186, onion: 80 },
  { month: "February", potato: 305, onion: 200 },
  { month: "March", potato: 237, onion: 120 },
  { month: "April", potato: 73, onion: 190 },
  { month: "May", potato: 209, onion: 130 },
  { month: "June", potato: 214, onion: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
};

export function Chart() {
  return (
    <div className="flex justify-end p-8">
      <Card className="flex-1 max-w-xl">
        <CardHeader>
          <CardTitle>Market Comparison</CardTitle>
          <CardDescription>
            Showing comaprison for commodities for last 6 Months
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <AreaChart
              data={chartData}
              width={600}
              height={200}
              margin={{
                left: 8,
                right: 8,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                dataKey="onion"
                type="natural"
                fill="var(--color-mobile)"
                fillOpacity={0.4}
                stroke="var(--color-mobile)"
                stackId="a"
              />
              <Area
                dataKey="potato"
                type="natural"
                fill="var(--color-desktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                January - June 2024
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
