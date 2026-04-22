"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
    { name: "Week 1", revenue: 4000, orders: 240 },
    { name: "Week 2", revenue: 3000, orders: 198 },
    { name: "Week 3", revenue: 2000, orders: 180 },
    { name: "Week 4", revenue: 2780, orders: 210 },
    { name: "Week 5", revenue: 1890, orders: 150 },
    { name: "Week 6", revenue: 2390, orders: 190 },
];

const chartConfig = {
    revenue: {
        label: "Revenue",
        color: "#10b981", // emerald-500
    },
    orders: {
        label: "Orders",
        color: "#3b82f6", // blue-500
    }
}

export function GrowthBarChart() {
    return (
        <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="px-0 pt-0">
                <CardTitle className="text-lg font-bold text-gray-900">Revenue Growth</CardTitle>
                <CardDescription>Weekly performance analysis</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <BarChart data={data}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#9ca3af', fontSize: 12}}
                            dy={10}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar 
                            dataKey="revenue" 
                            fill="var(--color-revenue)" 
                            radius={[6, 6, 0, 0]} 
                            barSize={32}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
