import { AreaGraph } from "./area-graph";
import { BarGraph } from "./bar-graph";
import { EmployeeSendsGraph } from "./employeesends-graph";
import { PieGraph } from "./pie-graph";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import PageContainer from "@/components/layout/page-container";
import { RecentSales } from "./recent-sales";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AnalysisPage() {
  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Email Analytics</h2>
          <div className="hidden items-center space-x-2 md:flex">
            <CalendarDateRangePicker />
            <Button>Export CSV</Button>
            <Button>Export PDF</Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                <path d="m21.854 2.147-10.94 10.939" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">882,498</div>
              <p className="text-xs text-green-600 py-2">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delivered</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                <path d="m16 19 2 2 4-4" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">82.47%</div>
              <div className="text-1xl font-bold pt-2">92,350 Delivered</div>
              <p className="text-xs text-red-700 py-2">
                -4.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Opened</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
                <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18.09%</div>
              <div className="text-1xl font-bold pt-2">92,350 Total Opens</div>
              <p className="text-xs text-green-600 py-2">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clicked</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M14 4.1 12 6" />
                <path d="m5.1 8-2.9-.8" />
                <path d="m6 12-1.9 2" />
                <path d="M7.2 2.2 8 5.1" />
                <path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47.25%</div>
              <div className="text-1xl font-bold pt-2">
                48,4724 Total Clicks
              </div>
              <p className="text-xs text-green-600 py-2">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Complaints</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 16h.01" />
                <path d="M12 8v4" />
                <path d="M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.47%</div>
              <div className="text-1xl font-bold pt-2">80 Complaints</div>
              <p className="text-xs text-muted-foreground text-red-700 py-2">
                -4.1% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="pt-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">
            <AreaGraph />
          </div>
          <div className="col-span-4 md:col-span-3">
            <PieGraph />
          </div>
          <Card className="col-span-4 md:col-span-3">
            <CardHeader>
              <CardTitle>Top 5 Sends by Open Rate</CardTitle>
              <CardDescription>
                You ran 0000 campaigns this period.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentSales />
            </CardContent>
          </Card>
          <div className="col-span-4">
            <Card>
              <CardHeader>
                <CardTitle>Campaigns by Employee</CardTitle>
                <CardDescription>Employee data for selected time period.</CardDescription>
              </CardHeader>
              <CardContent>
                <EmployeeSendsGraph />
              </CardContent>
              <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                  {/* Overall performance trending up{" "}
                  <TrendingUp className="h-4 w-4" /> */}
                </div>
                <div className="leading-none text-muted-foreground">
                  Showing performance data for all employees
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
