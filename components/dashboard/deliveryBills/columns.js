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

export const columns = [

    // {
    //     accessorKey: "id",
    //     header: "Serial No.",
    // },
    {
        accessorKey: "companyName",
        header: "Company Name",
        accessorFn: (originalRow, index) => {
            console.log(originalRow)
            return String(originalRow.order.company.companyName)
        },
    },
    {
        accessorKey: "buyerName",
        header: "Buyer",
        accessorFn: (originalRow, index) => {
            // console.log(originalRow)
            return String(originalRow.order.buyer.buyerName)
        },
    },
    {
        accessorKey: "deliveredQuantity",
        header: "Delivered Quantity (KG)",
        accessorFn: (originalRow, index) => {
            return String(originalRow.deliveredQuantity)
        },
    },
    {
        accessorKey: "",
        header: "Bill Number",
        cell:({row})=>{
            return <h2> {row.original.billNumber?<span className='bg-green-400 p-1 rounded-lg'>{row.original.billNumber}</span>:<span className='bg-red-500 p-1 rounded-lg'>not edited</span>}</h2>
        }
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
            return(<Action id={row.original.id} chalanInfo={row.original} actionName={"Delete"} billAction={"Action"}/>)
        }
    }
  


]
