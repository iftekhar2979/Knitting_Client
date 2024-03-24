"use client"
import Link from 'next/link';
import { MdDelete } from "react-icons/md"
import { format } from "date-fns"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
const action = [

    {
        id: 62,
        actionName: "Delete",

    },
]

export const columns = [
    {
        accessorKey: "companyName",
        header: "Company",
        
    },

    {
        accessorKey: "buyerName",
        header: "Buyer",
    },
    {
        accessorKey: "fabricsName",
        header: "Fabrics Type",
    },
    {
        accessorKey: "season",
        header: "Season",
    },
    {
        accessorKey: "orderNumber",
        header: "Order Number",
        cell: ({ row }) => {
            const {id,orderNumber}=row.original
            return <Link href={`/dashboard/order/${id}`} className="text-blue-300">{orderNumber}</Link>
        }
    
    },
    {
        accessorKey: "invoiceNumber",
        header: "Invoice Number",
    },
    {
        accessorKey: "pmNumber",
        header: "PM Number",
    },
    {
        accessorKey: "poNumber",
        header: "PO Number",
    },
    {
        accessorKey: "boNumber",
        header: "BO Number",
    },
    {
        accessorKey: "orderQuantity",
        header: "Order Qty",
    },
    {
        accessorKey: "deliveryQuantity",
        header: "Delivery Qty",
        cell: ({ row }) => {
            const {orderQuantity,restQuantity}=row.original
            return <div >{orderQuantity-restQuantity}</div>
        }
    },
    {
        accessorKey: "restQuantity",
        header: "Rest Qty",
    },
    {
        accessorKey: "targetDate",
        header: "Target Date",
        cell: ({ row }) => {

            return <div >{format(row.original.createdAt, 'PP')}</div>
        }
    },

    {
        accessorKey: "Action",
        header: "Action",
        cell: ({ row }) => {
            return <div ><MdDelete size={32} color={"red"} className="cursor-pointer" /></div>
        }
    }


]
