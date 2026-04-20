"use client"
import { Input } from '@/components/ui/input';
import { format } from "date-fns";
import Link from 'next/link';
import { RiArrowUpDownFill } from 'react-icons/ri';
import Action from './Action';


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
        accessorKey: "orderNumber",
        header: "Order Number",
        cell: ({ row }) => {
            const { id, orderNumber } = row.original
            return (
                <Link href={`/dashboard/order/${id}`} className="font-bold text-emerald-600 hover:underline transition-all underline-offset-4 decoration-emerald-200">
                    {orderNumber}
                </Link>
            )
        }
    },
    {
        accessorKey: "companyName",
        header: "Company",
        cell: ({ row }) => {
            const companyName = row.original.company?.companyName || row.original.companyName || "N/A"
            return <div className="font-semibold text-gray-800">{companyName}</div>
        }
    },
    {
        accessorKey: "buyerName",
        header: "Buyer",
        cell: ({ row }) => {
            const buyerName = row.original.buyer?.buyerName || row.original.buyerName || "N/A"
            return <div className="text-gray-600">{buyerName}</div>
        }
    },
    {
        accessorKey: "fabricsName",
        header: "Fabric Type",
        cell: ({ row }) => {
            const fabric = row.original.fabricsType?.fabricsName || row.original.fabricsName || "N/A"
            return <div className="text-gray-500 font-medium text-sm italic">{fabric}</div>
        }
    },
    {
        accessorKey: "orderQuantity",
        header: "Order Quantity",
        cell: ({ row }) => {
            return (
                <div className="flex flex-col">
                    <span className="font-bold text-gray-800">{row.original.orderQuantity}</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase">{row.original.unit || "KG"}</span>
                </div>
            )
        }
    },
    {
        accessorKey: "deliveryQuantity",
        header: "Delivered",
        cell: ({ row }) => {
            const { orderQuantity, restQuantity } = row.original
            const delivered = (orderQuantity - restQuantity).toFixed(2)
            return <div className="font-medium text-emerald-600">{delivered}</div>
        }
    },
    {
        accessorKey: "restQuantity",
        header: "Rest Qty",
        cell: ({ row }) => {
            return <div className="text-rose-500 font-semibold">{row.original.restQuantity}</div>
        }
    },
    {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => {
            return <div className="text-gray-400 text-[11px] font-medium">{format(new Date(row.original.createdAt), 'PP')}</div>
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status || "Pending"
            let variant = "secondary"
            let className = "bg-gray-100 text-gray-600"

            if (status === "Fullfilled" || status === "Completed") {
                variant = "default"
                className = "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
            } else if (status === "Pending" || status === "Ordered") {
                className = "bg-amber-100 text-amber-700 hover:bg-amber-100"
            }

            return (
                <Badge variant={variant} className={`py-0.5 px-2 text-[10px] font-bold uppercase tracking-wider ${className}`}>
                    {status}
                </Badge>
            )
        }
    },
    {
        id: "action",
        header: "Action",
        cell: ({ row }) => {
            return (<Action id={row.original.id} row={row.original} orderNumber={row.original.orderNumber} actionName={"Delete"} />)
        }
    }
]



