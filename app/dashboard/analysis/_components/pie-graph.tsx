'use client';

import * as React from 'react';
import { TrendingUp } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

const chartData = [
  { vertical: 'Investor Relations', visitors: 450, fill: '#4e79a7' },
  { vertical: 'Automotive', visitors: 350, fill: '#f28e2c' },
  { vertical: 'Aerospace', visitors: 300, fill: '#e15759' },
  { vertical: 'CIO', visitors: 200, fill: '#76b7b2' },
  { vertical: 'Defense', visitors: 180, fill: '#59a14f' },
  { vertical: 'Maritime', visitors: 150, fill: '#edc949' },
  { vertical: 'Nuclear', visitors: 120, fill: '#af7aa1' },
  { vertical: 'Medical', visitors: 50, fill: '#ff9da7' }
];
const chartConfig = {
  visitors: {
    label: 'Visitors'
  },
  'Investor Relations': {
    label: 'Investor Relations',
    color: '#4e79a7'  // Blue
  },
  'Automotive': {
    label: 'Automotive',
    color: '#f28e2c'  // Orange
  },
  'Aerospace': {
    label: 'Aerospace',
    color: '#e15759'  // Red
  },
  'CIO': {
    label: 'CIO',
    color: '#76b7b2'  // Teal
  },
  'Defense': {
    label: 'Defense',
    color: '#59a14f'  // Green
  },
  'Maritime': {
    label: 'Maritime',
    color: '#edc949'  // Yellow
  },
  'Nuclear': {
    label: 'Nuclear',
    color: '#af7aa1'  // Purple
  },
  'Medical': {
    label: 'Medical',
    color: '#ff9da7'  // Pink
  }
} satisfies ChartConfig;


export function PieGraph() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Sends by Vertical Market</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[360px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="vertical"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy- 10}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Sends
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total sends for the selected time period.
        </div>
      </CardFooter>
    </Card>
  );
}
