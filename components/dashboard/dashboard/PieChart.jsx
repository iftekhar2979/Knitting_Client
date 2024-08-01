"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { TrendingUp } from "lucide-react"
// import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useGetUnitWiseGraphQuery } from "@/lib/features/dashboard/dashboardApi"
import Loading from "@/components/utils/Loading"
import { clearingSelectedValue } from "@/lib/features/Invoice/invoiceSlice"

const monthName = ["January", "February", "March", "April", "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"]


const chartConfig = {
  fabric: {
    label: "fabric",
    color: "#71D8A7",
  },
  knitting: {
    label: "knitting",
    color: "#00BF63",
  },
}

export function PieChart() {
  const { data: chartData, isLoading, isError } = useGetUnitWiseGraphQuery()
  if (isLoading) {
    return <Loading />
  }
console.log(chartData)
  const date = new Date()
  let thisYear=date.getFullYear()
  let thisMonthNumber =date.getMonth()
  let lastMonthNumber=Math.abs(thisMonthNumber - 6)
  let lastMonth = monthName[thisMonthNumber]
  let firstMonth = monthName[lastMonthNumber]

  return (
    // <Card className="flex flex-col  w-full">
    <Card>
      <CardHeader>
        <CardTitle>Knitting and Fabrics Orders Bar Chart</CardTitle>
        <CardDescription>{firstMonth} to {lastMonth} {thisYear}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="fabric" fill="#71D8A7" radius={4} />
            <Bar dataKey="knitting" fill="#00BF63" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        {/* <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div> */}
      </CardFooter>
    </Card>


  )
}
