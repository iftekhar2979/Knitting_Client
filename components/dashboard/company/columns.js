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
    header: "Company",
  },
  {
    accessorKey: "buyers",
    header: "Buyer",
    cell: ({ row }) => {
      return <DeleteBuyer buyerInfo={row.original}/>
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "contact",
    header: "Contact"
  },
  {
    accessorKey: "",
    header: "Action",
    cell: ({ row }) => {

      return <Action action={action} data={row.original}/>
    },
  },
]
