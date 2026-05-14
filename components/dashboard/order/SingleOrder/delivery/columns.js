"use client"
import Link from 'next/link';
import { MdDelete } from "react-icons/md"
import { format } from "date-fns"
import { IoMdDownload } from "react-icons/io";
import Action from './Action';
import { Badge } from "@/components/ui/badge"

export const columns = [
    {
        accessorKey: "id",
        header: "Chalan #",
        cell: ({ row }) => {
            return <div className="font-bold text-emerald-700 underline underline-offset-4 decoration-emerald-200">#{row.original.id}</div>
        }
    },
    {
        accessorKey: "deliveredQuantity",
        header: "Quantity",
        cell: ({ row }) => {
            return <div className="font-bold text-gray-800">{row.original.deliveredQuantity} KG</div>
        }
    },
    {
        accessorKey: "deliveredBy",
        header: "Delivery Man",
        cell: ({ row }) => {
            return <div className="text-gray-500 text-sm font-medium">{row.original.deliveredBy || "N/A"}</div>
        }
    },
    {
        accessorKey: "billStatus",
        header: "Bill Status",
        cell: ({ row }) => {
            const isCreated = !!row.original.unitPrice;
            return (
                <Badge variant={isCreated ? "default" : "secondary"} className={`w-fit py-0.5 px-2 text-[10px] uppercase font-bold tracking-wider ${isCreated ? 'bg-emerald-600' : 'bg-rose-100 text-rose-700 hover:bg-rose-100'}`}>
                    {isCreated ? "BILLED" : "NOT BILLED"}
                </Badge>
            )
        }
    },
    {
        accessorKey: "created_at",
        header: "Date",
        cell: ({ row }) => {
            return <div className="text-gray-500 text-sm font-medium">{format(new Date(row.original.created_at), 'PP')}</div>
        }
    },
    {
        id: "action",
        header: "Action",
        cell: ({ row }) => {
            return (<Action id={row.original.id} chalanInfo={row.original} actionName={"Delete"} billAction={"Action"} />)
        }
    }
]
