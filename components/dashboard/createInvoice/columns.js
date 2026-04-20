"use client"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { RiArrowUpDownFill } from "react-icons/ri"
import OrderListCheckBoxes from "./OrderListCheckBoxes"
import { useEffect, useState } from "react"
import { useAppDispatch } from "@/lib/hooks"
import { pushingOnSelectedValue, pushingSelectedCompany, selectCompanyName } from "@/lib/features/Invoice/invoiceSlice"
import { CgUnavailable } from "react-icons/cg";
import { MdOutlineEventAvailable } from "react-icons/md";
import { FaCheck } from "react-icons/fa6"
import { FaCheckCircle } from "react-icons/fa"
export const columns = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: function Cell({ row }) {
            const [disabled, setDisabled] = useState(false)
            const [state, setState] = useState("")
            const dispatch = useAppDispatch()


            const handleCheckboxChange = (event) => {
                dispatch(pushingOnSelectedValue(event.target.value))
                dispatch(selectCompanyName(row.original.companyName))
            };

            return <OrderListCheckBoxes orderList={row.original.orderNumber} state={state} setDisabled={setDisabled} handleCheckboxChange={handleCheckboxChange} row={row.original} disabled={disabled} />
        },

    },
    {
        accessorKey: "orderNumber",
        header: "Order Num.",
        cell: ({ row }) => {
            const { id, orderNumber } = row.original
            return <Link href={`/dashboard/order/${id}`} className="text-blue-500 hover:underline font-medium">{orderNumber}</Link>
        }

    },
    {
        accessorKey: "companyName",
        header: "Company",
        cell: ({ row }) => <div className="font-medium text-gray-700">{row.getValue("companyName")}</div>
    },
    {
        accessorKey: "buyerName",
        header: "Buyer",
        cell: ({ row }) => <div className="text-gray-600">{row.getValue("buyerName")}</div>
    },
    {
        accessorKey: "fabricsName",
        header: "Fabrics",
        cell: ({ row }) => <div className="text-gray-600">{row.getValue("fabricsName")}</div>
    },
    {
        accessorKey: "orderQuantity",
        header: "Order Quantity",
        cell: ({ row }) => <div className="font-semibold">{row.getValue("orderQuantity")} KG</div>
    },
    {
        accessorKey: "isProformaInvoiceCreated",
        header: "Invoice Status",
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    {row.original.isProformaInvoiceCreated ? (
                        <div className="flex items-center text-emerald-600 gap-1 bg-emerald-50 px-2 py-1 rounded-full text-xs font-medium">
                            <FaCheckCircle size={14} /> Created
                        </div>
                    ) : (
                        <div className="flex items-center text-rose-600 gap-1 bg-rose-50 px-2 py-1 rounded-full text-xs font-medium">
                            <CgUnavailable size={14} /> Pending
                        </div>
                    )}
                </div>
            )
        },

    },
]
