'use client';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

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
  { month: 'January', sends: 82186, delivered: 81000, opens: 13149, clicks: 6887 },
  { month: 'February', sends: 75320, delivered: 74100, opens: 12500, clicks: 5980 },
  { month: 'March', sends: 90150, delivered: 88900, opens: 15200, clicks: 7450 },
  { month: 'April', sends: 68400, delivered: 67200, opens: 11800, clicks: 5600 },
  { month: 'May', sends: 79800, delivered: 78500, opens: 13900, clicks: 6750 },
  { month: 'June', sends: 85600, delivered: 84200, opens: 14500, clicks: 7100 },
  { month: 'July', sends: 72300, delivered: 71000, opens: 12200, clicks: 5900 },
  { month: 'August', sends: 66900, delivered: 65700, opens: 11300, clicks: 5400 },
  { month: 'September', sends: 88200, delivered: 86900, opens: 14800, clicks: 7200 },
  { month: 'October', sends: 93500, delivered: 92100, opens: 15700, clicks: 7600 },
  { month: 'November', sends: 87000, delivered: 85700, opens: 14600, clicks: 7050 },
  { month: 'December', sends: 95800, delivered: 94300, opens: 16100, clicks: 7800 }
];


const chartConfig = {
  sends: {
    label: 'Sends',
    color: '#4e79a7'  // Blue
  },
  delivered: {
    label: 'Delivered',
    color: '#f28e2c'  // Orange
  },
  opens: {
    label: 'Opens',
    color: '#e15759'  // Red
  },
  clicks: {
    label: 'Clicks',
    color: '#76b7b2'  // Teal
  }
} satisfies ChartConfig;


export function AreaGraph() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Data by Date</CardTitle>
        <CardDescription>
          Showing totals for the time period
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[310px] w-full"
        >
           <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillSends" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#4e79a7"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#4e79a7"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillDelivered" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#f28e2c"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#f28e2c"
                  stopOpacity={0.1}
                />
                </linearGradient>
                <linearGradient id="fillOpens" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#f28e2c"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#f28e2c"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillClicks" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#76b7b2"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#76b7b2"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="sends"
              type="natural"
              fill="url(#fillSends)"
              fillOpacity={0.4}
              stroke="#4e79a7"
              stackId="a"
            />
            <Area
              dataKey="delivered"
              type="natural"
              fill="url(#fillDelivered)"
              fillOpacity={0.4}
              stroke="#f28e2c"
              stackId="a"
            />
            <Area
              dataKey="opens"
              type="natural"
              fill="url(#fillOpens)"
              fillOpacity={0.4}
              stroke="#e15759"
              stackId="a"
            />
            <Area
              dataKey="clicks"
              type="natural"
              fill="url(#fillClicks)"
              fillOpacity={0.4}
              stroke="#76b7b2"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 0.0% this period <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Dates Set in Top Bar: January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
