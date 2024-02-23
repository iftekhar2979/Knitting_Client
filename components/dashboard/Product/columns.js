"use client"

import { ColumnDef } from "@tanstack/react-table"
import Action from "@/components/utils/Action"
import { DeleteIcon } from "lucide-react"
import { MdDelete } from "react-icons/md"

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
        accessorKey: "fabricsName",
        header: "Fabrics Name",
    },

    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "Action",

        header: "Action",
        cell: ({ row }) => {
            return <div ><MdDelete size={32} color={"red"} className="cursor-pointer"/></div>
        }
    }

  
]
