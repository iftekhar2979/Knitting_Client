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

export const columns = [
    {
        accessorKey: "companyName",
        accessorFn: (originalRow, index) => {
            return String(originalRow.company.companyName)
        },
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
        accessorFn: (originalRow, index) => {
            return String(originalRow.buyer.buyerName)
        },
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
        accessorKey: "piNumber",
        header: ({ column }) => {
            return (
                <p
                    className={"flex"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                   PI Number
                    <RiArrowUpDownFill className=" h-4 w-4" size={22} />
                </p>
            )
        },
        cell: ({ row }) => {
            const { piNumber} = row.original
            return <Link href={`/pi/${piNumber}`} className="text-blue-300">{piNumber}</Link>
        }

    },
  
    {
        accessorKey: "totalPIQuantity",
        header: ({ column }) => {
            return (
                <p
                    className={"flex"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Total Quantity
                    <RiArrowUpDownFill className=" h-4 w-4" size={22} />
                </p>
            )
        },
    },
    {
        accessorKey: "totalPIAmount",
        header: ({ column }) => {
            return (
                <p
                    className={"flex"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Total Amount
                    <RiArrowUpDownFill className=" h-4 w-4" size={22} />
                </p>
            )
        },
    },{
        accessorKey: "Action",
        header: "Action",
        cell: ({ row }) => {
            
            return(<Action id={row.original.containOrders} actionName={"Delete"}/>)
        }
    }

  


]
