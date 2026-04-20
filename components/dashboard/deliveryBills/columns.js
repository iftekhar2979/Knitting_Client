"use client"
import Link from 'next/link';
import { MdDelete } from "react-icons/md"
import { format } from "date-fns"
// import { IoMdDownload } from "react-icons/io";
import Action from '../order/SingleOrder/delivery/Action';

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
        accessorKey: "companyName",
        header: "Company",
        cell: ({ row }) => {
            const companyName = row.original.order?.company?.companyName || "N/A"
            return <div className="font-semibold text-gray-800">{companyName}</div>
        }
    },
    {
        accessorKey: "buyerName",
        header: "Buyer",
        cell: ({ row }) => {
            const buyerName = row.original.order?.buyer?.buyerName || "N/A"
            return <div className="text-gray-600">{buyerName}</div>
        }
    },
    {
        accessorKey: "deliveredQuantity",
        header: "Quantity",
        cell: ({ row }) => {
            return <div className="font-bold text-gray-700">{row.original.deliveredQuantity} KG</div>
        }
    },
    {
        accessorKey: "billNumber",
        header: "Bill / Chalan Number",
        cell: ({ row }) => {
            const { billNumber, id } = row.original
            
            return (
                <div className="flex flex-col gap-1">
                    <div className="font-bold text-sm text-gray-800 tracking-tight">
                        {billNumber || `Chalan #${id}`}
                    </div>
                    <Badge variant={billNumber ? "default" : "secondary"} className={`w-fit py-0 px-1.5 text-[10px] ${billNumber ? 'bg-emerald-600' : 'bg-amber-100 text-amber-700 hover:bg-amber-100'}`}>
                        {billNumber ? "BILLED" : "CHALAN ONLY"}
                    </Badge>
                </div>
            )
        }
    },
    {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => {
            return <div className="text-gray-500 text-sm font-medium">{format(new Date(row.original.createdAt), 'PP')}</div>
        }
    },
    {
        id: "action",
        header: "Action",
        cell: ({ row }) => {     
            return(<Action id={row.original.id} chalanInfo={row.original} actionName={"Delete"} billAction={"Action"}/>)
        }
    }
]
