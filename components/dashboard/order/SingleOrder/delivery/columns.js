"use client"
import Link from 'next/link';
import { MdDelete } from "react-icons/md"
import { format } from "date-fns"
import { IoMdDownload } from "react-icons/io";
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
        accessorKey: "id",
        header: "Serial No.",
    },

    {
        accessorKey: "deliveredQuantity",
        header: "Delivered Quantity (KG)",
    },
    {
        accessorKey: "deliveredBy",
        header: "Delivery Man",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ row }) => {

            return <div >{format(row.original.createdAt, 'PP')}</div>
        }
    },
    {
        accessorKey: "Action",
        header: "Action",
        cell: ({ row }) => {
            
            return(<Action id={row.original.id}/>)
        }
    }
  


]
