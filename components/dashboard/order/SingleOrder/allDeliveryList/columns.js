"use client"
import { format } from "date-fns"
import { RiArrowUpDownFill } from "react-icons/ri"

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
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <p
                    className={"flex"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Serial No.
                    <RiArrowUpDownFill className=" h-4 w-4" />
                </p>
            )
        },
        accessorFn: (originalRow, index) => {
            return String(originalRow.id)
        },
    },
    {
        accessorKey: "companyName",
        header: ({ column }) => {
            return (
                <p
                    className={"flex"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Company Name
                    <RiArrowUpDownFill className=" h-4 w-4" />
                </p>
            )
        },
        accessorFn: (originalRow, index) => {
            return originalRow.order.orderNumber
        },
        cell: ({ row }) => {
            return row.original.order.companyName
        }
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
                    <RiArrowUpDownFill className=" h-4 w-4" />
                </p>
            )
        },
        cell: ({ row }) => {

            return row.original.order.buyerName
        }
    },
    {
        accessorKey: "orderNumber",
        header: ({ column }) => {
            return (
                <p
                    className={"flex"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Order Number
                    <RiArrowUpDownFill className=" h-4 w-4" />
                </p>
            )
        },
        cell: ({ row }) => {
            return row.original.order.orderNumber
        }
    },
    {
        accessorKey: "deliveredQuantity",
        header: ({ column }) => {
            return (
                <p
                    className={"flex"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Delivered Quantity (KG)
                    <RiArrowUpDownFill className=" h-4 w-4" />
                </p>
            )
        },
    },
    {
        accessorKey: "deliveredBy",
        header: ({ column }) => {
            return (
                <p
                    className={"flex"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Delivered By
                    <RiArrowUpDownFill className=" h-4 w-4" />
                </p>
            )
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <p
                    className={"flex"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <RiArrowUpDownFill className=" h-4 w-4" />
                </p>
            )
        },
        cell: ({ row }) => {
            return <div >{format(row.original.createdAt, 'PP')}</div>
        }
    },




]
