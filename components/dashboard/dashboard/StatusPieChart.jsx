"use client"

import { Pie, PieChart, Cell, ResponsiveContainer, Legend } from "recharts"
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
    { name: "Delivered", value: 400, color: "#10b981" },
    { name: "Pending", value: 300, color: "#f59e0b" },
    { name: "In Production", value: 300, color: "#3b82f6" },
    { name: "Cancelled", value: 200, color: "#ef4444" },
];

const chartConfig = {
    value: {
        label: "Orders",
    },
    Delivered: { label: "Delivered", color: "#10b981" },
    Pending: { label: "Pending", color: "#f59e0b" },
    "In Production": { label: "In Production", color: "#3b82f6" },
    Cancelled: { label: "Cancelled", color: "#ef4444" },
}

export function StatusPieChart() {
    return (
        <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="px-0 pt-0">
                <CardTitle className="text-lg font-bold text-gray-900">Order Status</CardTitle>
                <CardDescription>Current distribution</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    </PieChart>
                </ChartContainer>
                <div className="mt-4 grid grid-cols-2 gap-4">
                    {data.map((item) => (
                        <div key={item.name} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-xs font-bold text-gray-600 uppercase tracking-tighter">{item.name}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
