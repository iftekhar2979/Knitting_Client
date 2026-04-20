"use client"

import { ColumnDef } from "@tanstack/react-table"
import Action from "@/components/utils/Action"
import { MdDelete } from "react-icons/md"
import { Delete } from "lucide-react"
import DeleteBuyer from "./Modal/DeleteBuyer"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
const action=[
  {
      id:10,
      actionName:"Edit",
      
  },{
      id:11,
      actionName:"Add Buyer",
      
  },
  {
      id:12,
      actionName:"Delete",
      
  },
]

export const columns = [
  {
    accessorKey: "companyName",
    header: () => <div className="font-semibold text-gray-700">Company Name</div>,
    cell: ({ row }) => <div className="font-medium text-gray-900">{row.getValue("companyName")}</div>
  },
  {
    accessorKey: "buyers",
    header: "Buyer Info",
    cell: ({ row }) => {
      return <DeleteBuyer buyerInfo={row.original}/>
    },
  },
  {
    accessorKey: "email",
    header: "Email Address",
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => <div className="max-w-[200px] truncate">{row.getValue("location")}</div>
  },
  {
    accessorKey: "contact",
    header: "Contact"
  },
  {
    accessorKey: "Action",
    header: () => <div className="text-right px-4">Actions</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-end px-2">
          <Action action={action} data={row.original}/>
        </div>
      )
    },
  },
]
