"use client"
import Link from 'next/link';
import { MdDelete } from "react-icons/md"
import { format } from "date-fns"
import { RiArrowUpDownFill } from 'react-icons/ri';

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
        header: ({ column }) => {
            return (
                <p
                    className={"flex"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Company Name
                    <RiArrowUpDownFill className=" h-4 w-4" size={22} />
                </p>
            )
        },

    },

    {
        accessorKey: "buyerName",
        header: ({ column }) => {
            return (
                <p
                    className={"flex"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Buyer Name
                    <RiArrowUpDownFill className=" h-4 w-4" size={22} />
                </p>
            )
        },
    },
    {
        accessorKey: "fabricsName",
        header: ({ column }) => {
            return (
                <p
                    className={"flex"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Fabrics
                    <RiArrowUpDownFill className=" h-4 w-4" size={22} />
                </p>
            )
        },
    },
    {
        accessorKey: "season",
        header: ({ column }) => {
            return (
                <p
                    className={"flex"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Season
                    <RiArrowUpDownFill className=" h-4 w-4" size={22} />
                </p>
            )
        },
    },
    {
        accessorKey: "orderNumber",
        header: ({ column }) => {
            return (
                <p
                    className={"flex"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Order No.
                    <RiArrowUpDownFill className=" h-4 w-4" size={22} />
                </p>
            )
        },
        cell: ({ row }) => {
            const { id, orderNumber } = row.original
            return <Link href={`/dashboard/order/${id}`} className="text-blue-300">{orderNumber}</Link>
        }

    },
    {
        accessorKey: "invoiceNumber",
        header: ({ column }) => {
            return (
                <p
                    className={"flex"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Invoice No.
                    <RiArrowUpDownFill className=" h-4 w-4" size={22} />
                </p>
            )
        },
    },
    {
        accessorKey: "pmNumber",
        header: ({ column }) => {
            return (
                <p
                    className={"flex"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    PM No.
                    <RiArrowUpDownFill className=" h-4 w-4" size={22} />
                </p>
            )
        },
    },
    {
        accessorKey: "poNumber",
        header: ({ column }) => {
            return (
                <p
                    className={"flex"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    PO No.
                    <RiArrowUpDownFill className=" h-4 w-4" size={22} />
                </p>
            )
        },
    },
    {
        accessorKey: "boNumber",
        header: ({ column }) => {
            return (
                <p
                    className={"flex"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    BO No.
                    <RiArrowUpDownFill className=" h-4 w-4" size={22} />
                </p>
            )
        },
    },
    {
        accessorKey: "orderQuantity",
        header: ({ column }) => {
            return (
                <p
                    className={"flex"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Order Qty.
                    <RiArrowUpDownFill className=" h-4 w-4" size={22} />
                </p>
            )
        },
    },
    {
        accessorKey: "deliveryQuantity",
        header: ({ column }) => {
            return (
                <p
                    className={"flex"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Delivery Qty.
                    <RiArrowUpDownFill className=" h-4 w-4" size={22} />
                </p>
            )
        },
        cell: ({ row }) => {
            const { orderQuantity, restQuantity } = row.original
            return <div >{orderQuantity - restQuantity}</div>
        }
    },
    {
        accessorKey: "restQuantity",
        header: "Rest Qty",
    },
    {
        accessorKey: "targetDate",
        header: ({ column }) => {
            return (
                <p
                    className={"flex"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Created
                    <RiArrowUpDownFill className=" h-4 w-4" size={22} />
                </p>
            )
        },
        cell: ({ row }) => {

            return <div >{format(row.original.createdAt, 'PP')}</div>
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const { orderQuantity, restQuantity } = row.original
            let status = ""
            if (orderQuantity - restQuantity > 0) {
                status = "Pending"
            } 
             if (restQuantity === 0) {
                status = "Fullfilled"

            } 
             if(orderQuantity === restQuantity){
                status = "Ordered"
            }
            return <div >{status}</div>
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
