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
                <div
                    className={"flex flex-col"}

                >
                    <div className='flex'>

                        <h2 onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Company</h2>
                        <RiArrowUpDownFill size={22} />
                    </div>
                    <div>
                        <Input type="text"
                            value={(column?.getFilterValue()) ?? ""}
                            onChange={(event) =>
                                column?.setFilterValue(event.target.value)
                            }
                            className="h-4 text-[11px]"
                            placeholder="Company..."
                        />
                    </div>
                </div>
            )
        },
        accessorFn: (originalRow, index) => {
            return originalRow.order.company.companyName
        },
        cell: ({ row }) => {
            return row.original.order.company.companyName
        }
    },
    {
        accessorKey: "buyerName",
        header: ({ column }) => {
            return (
                <div
                    className={"flex flex-col"}
                >
                    <div className='flex'>
                        <h2 onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Buyer</h2>
                        <RiArrowUpDownFill size={22} />
                    </div>
                    <div>
                        <Input type="text"
                            value={(column?.getFilterValue()) ?? ""}
                            onChange={(event) =>
                                column?.setFilterValue(event.target.value)
                            }
                            className="h-4 text-[11px]"
                            placeholder="Buyer..."
                        />
                    </div>
                </div>
            )
        }, accessorFn: (originalRow, index) => {
            return originalRow.order.buyerName
        },
        cell: ({ row }) => {
            return row.original.order.buyerName
        }
    },
    {
        accessorKey: "orderNumber",
        header: ({ column }) => {
            return (
                <div
                    className={"flex flex-col"}
                >
                    <div className='flex'>
                        <h2 onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Order Number</h2>
                        <RiArrowUpDownFill size={22} />
                    </div>
                    <div>
                        <Input type="text"
                            value={(column?.getFilterValue()) ?? ""}
                            onChange={(event) =>
                                column?.setFilterValue(event.target.value)
                            }
                            className="h-4 text-[11px]"
                            placeholder="Buyer..."
                        />
                    </div>
                </div>
            )
        },
        accessorFn: (originalRow, index) => {
            return originalRow.order.orderNumber
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
            return <div className="w-auto">{format(row.original.createdAt, 'Pp')}</div>
        }
    },
    {
        accessorKey: "Action",
        header: "Action",
        cell: ({ row }) => {
            
            return(<Action id={row.original.id} data={row.original}/>)
        }
    }



]
