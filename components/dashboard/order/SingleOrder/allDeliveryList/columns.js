"use client"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"
import { RiArrowUpDownFill } from "react-icons/ri"
import Action from "./Action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
const action = [
    {
        id: 62,
        actionName: "Delete",
    },
]

import { Badge } from "@/components/ui/badge"

export const columns = [
    {
        accessorKey: "id",
        header: "Chalan #",
        cell: ({ row }) => {
            return (
                <div className="font-bold text-emerald-700">
                    #{row.original.id}
                </div>
            )
        }
    },
    {
        accessorKey: "companyName",
        header: "Company",
        cell: ({ row }) => {
            const companyName = row.original.order?.company?.companyName || "N/A"
            return (
                <div className="flex flex-col">
                    <span className="font-semibold text-gray-800 tracking-tight">{companyName}</span>
                    <span className="text-[10px] text-gray-400 font-medium">ORDER: {row.original.order?.orderNumber}</span>
                </div>
            )
        }
    },
    {
        accessorKey: "buyerName",
        header: "Buyer",
        cell: ({ row }) => {
            return <div className="text-gray-600 font-medium">{row.original.order?.buyerName || "N/A"}</div>
        }
    },
    {
        accessorKey: "deliveredQuantity",
        header: "Quantity",
        cell: ({ row }) => {
            return (
                <div className="flex flex-col">
                    <span className="font-bold text-gray-800">{row.original.deliveredQuantity} KG</span>
                    <span className="text-[10px] text-gray-400 font-medium uppercase font-bold">{row.original.order?.unit || "KG"}</span>
                </div>
            )
        }
    },
    {
        accessorKey: "deliveredBy",
        header: "Delivered By",
        cell: ({ row }) => {
            return <div className="text-gray-500 text-sm">{row.original.deliveredBy || "Standard Delivery"}</div>
        }
    },
    {
        accessorKey: "created_at",
        header: "Date",
        cell: ({ row }) => {
            return <div className="text-gray-500 text-sm font-medium">{format(new Date(row.original.created_at), 'PPp')}</div>
        }
    },
    {
        id: "action",
        header: "Action",
        cell: ({ row }) => {
            return (<Action id={row.original.id} data={row.original} />)
        }
    }
]
