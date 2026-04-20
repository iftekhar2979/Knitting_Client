"use client"
import Link from 'next/link';

import { RiArrowUpDownFill } from 'react-icons/ri';
import { Input } from '@/components/ui/input';
import Action from './Action';


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
const action = [

    {
        id: 62,
        actionName: "Delete",

    },
]

import { Badge } from "@/components/ui/badge";

export const columns = [
    {
        accessorKey: "companyName",
        header: "Company",
        cell: ({ row }) => {
            const companyName = row.original.company?.companyName || "N/A";
            return <div className="font-semibold text-gray-800">{companyName}</div>
        }
    },
    {
        accessorKey: "buyerName",
        header: "Buyer",
        cell: ({ row }) => {
            const buyerName = row.original.buyer?.buyerName || "N/A";
            return <div className="text-gray-600">{buyerName}</div>
        }
    },
    {
        accessorKey: "fabricsName",
        header: "Fabrics",
        cell: ({ row }) => {
            const fabricName = row.original.fabricsType?.fabricsName || row.original.fabricsName || "N/A";
            return <div className="text-gray-600 font-medium">{fabricName}</div>
        }
    },
    {
        accessorKey: "billNumber",
        header: "Bill / PI Number",
        cell: ({ row }) => {
            const { billNumber, piNumber, containOrders } = row.original;
            const number = billNumber || piNumber;
            const isBill = !!billNumber;

            return (
                <div className="flex flex-col gap-1">
                    <Link href={`/dashboard/pi/${containOrders}`} className="text-blue-500 hover:underline font-bold text-sm tracking-tight transition-colors">
                        {number}
                    </Link>
                    <Badge variant={isBill ? "default" : "outline"} className={`w-fit py-0 px-1.5 text-[10px] ${isBill ? 'bg-emerald-600 hover:bg-emerald-700' : 'text-blue-600 border-blue-200'}`}>
                        {isBill ? "BILL" : "PI"}
                    </Badge>
                </div>
            )
        }
    },
    {
        accessorKey: "invoiceQuantity",
        header: "Total Qty",
        cell: ({ row }) => {
            const qty = row.original.invoiceQuantity || row.original.totalPIQuantity;
            return <div className="font-bold text-gray-700">{qty} KG</div>
        }
    },
    {
        accessorKey: "invoiceAmount",
        header: "Total Amount",
        cell: ({ row }) => {
            const amount = row.original.invoiceAmount || row.original.totalPIAmount;
            return <div className="font-bold text-emerald-700">$ {amount?.toLocaleString()}</div>
        }
    },
    {
        id: "action",
        header: "Action",
        cell: ({ row }) => {
            return (<Action id={row.original.containOrders} actionName={"Delete"} />)
        }
    }
]





