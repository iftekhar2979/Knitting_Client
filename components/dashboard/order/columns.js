"use client"
import Link from 'next/link';
import { MdDelete } from "react-icons/md"
import { format } from "date-fns"
import { RiArrowUpDownFill } from 'react-icons/ri';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputDropDown from '@/components/utils/InputDropDown';
import Action from './Action';

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
        },
    },
    {
        accessorKey: "fabricsName",
        header: ({ column }) => {

            return (
                <div
                    className={"flex flex-col"}

                >
                    <div className='flex'>

                        <h2 onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Fabrics</h2>
                        <RiArrowUpDownFill size={22} />
                    </div>
                    <div>
                        <Input type="text"
                            value={(column?.getFilterValue()) ?? ""}
                            onChange={(event) =>
                                column?.setFilterValue(event.target.value)
                            }
                            className="h-4 text-[11px]"
                            placeholder="Fabrics..."
                        />
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "season",
        header: ({ column }) => {

            return (
                <div
                    className={"flex flex-col"}

                >
                    <div className='flex'>

                        <h2 onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Season</h2>
                        <RiArrowUpDownFill size={22} />
                    </div>
                    <div>
                        <Input type="text"
                            value={(column?.getFilterValue()) ?? ""}
                            onChange={(event) =>
                                column?.setFilterValue(event.target.value)
                            }
                            className="h-4 text-[11px]"
                            placeholder="Season..."
                        />
                    </div>
                </div>
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
                    Order Num.
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
                    Inv. No.
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
        header: ({ column }) => {
            const statuses = ["All", "Pending", "Ordered", "Fullfilled"]
            return (
                <div className={"flex flex-col"} >
                    <div className='flex'>
                        <h2 onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>Status</h2>
                        <RiArrowUpDownFill size={22} />
                    </div>
                    <div >
                        <select
                            className={""}
                            onChange={(event) => { column?.setFilterValue(event.target.value) }}
                        >
                            <option disabled selected>Filter Status</option>
                            <option className='cursor-pointer' value={""} >{"ALL"}</option>
                            <option className='cursor-pointer' value={"Ordered"} >{"Ordered"}</option>
                            <option className='cursor-pointer' value={"Pending"} >{"Pending"}</option>
                            <option className='cursor-pointer' value={"Fullfilled"} >{"Fullfilled"}</option>
                        </select>
                    </div>
                </div>
            )
        },

        cell: ({ row }) => {
            // const { orderQuantity, restQuantity } = row.original
            // let status = ""
            // if (orderQuantity - restQuantity > 0) {
            //     status = "Pending"
            // }
            // if (restQuantity === 0) {
            //     status = "Fullfilled"

            // }
            // if (orderQuantity === restQuantity) {
            //     status = "Ordered"
            // }
            return <div >{row.original.status}</div>
        }
    },

    {
        accessorKey: "Action",
        header: "Action",
        cell: ({ row }) => {
            return (<Action id={row.original.id} orderNumber={row.original.orderNumber} actionName={"Delete"} />)
        }
    }


]
