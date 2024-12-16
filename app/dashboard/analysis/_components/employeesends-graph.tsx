"use client"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { name: "Albert", value: 120 },
  { name: "Alise", value: 85 },
  { name: "Brady", value: 150 },
  { name: "Brian", value: 95 },
  { name: "Chris", value: 110 },
  { name: "Jose", value: 130 },
  { name: "Kayanna", value: 70 },
  { name: "Marcus", value: 140 },
  { name: "Miller", value: 100 },
  { name: "Patricia", value: 80 },
  { name: "Pooja", value: 160 },
  { name: "Rafael", value: 90 },
  { name: "Rohan", value: 170 },
  { name: "Seth", value: 105 },
]

const chartConfig = {
  value: {
    label: "Campaigns",
    color: "hsl(var(--chart-1))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig

export function EmployeeSendsGraph() {
  return (

        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 10,
            }}
            height={600}
          >
            <CartesianGrid horizontal={false} />
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" axisLine={false} hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="value" fill="var(--color-value)" radius={4}>
              <LabelList dataKey="name" position="insideLeft" className="fill-white" fontSize={14} />
              <LabelList dataKey="value" position="right" />
            </Bar>
          </BarChart>
        </ChartContainer>
     
  )
}
