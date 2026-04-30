"use client"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import OrderListCheckBoxes from "./OrderListCheckBoxes"
import { useAppDispatch } from "@/lib/hooks"
import { pushingOnSelectedValue, selectCompanyName } from "@/lib/features/Invoice/invoiceSlice"
import { CgUnavailable } from "react-icons/cg";
import { FaCheckCircle } from "react-icons/fa"
import { Badge } from "@/components/ui/badge"

export const columns = [
    {
        id: "select",
        header: ({ table }) => (
            <div className="flex items-center justify-center px-2">
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                    className="border-gray-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                />
            </div>
        ),
        cell: function Cell({ row }) {
            const dispatch = useAppDispatch()

            const handleCheckboxChange = (event) => {
                dispatch(pushingOnSelectedValue(event.target.value))
                dispatch(selectCompanyName(row.original.companyName))
            };

            return (
                <OrderListCheckBoxes 
                    orderList={row.original.orderNumber} 
                    handleCheckboxChange={handleCheckboxChange} 
                    row={row.original} 
                />
            )
        },
    },
    {
        accessorKey: "orderNumber",
        header: "Order ID",
        cell: ({ row }) => {
            const { id, orderNumber } = row.original
            return (
                <Link 
                    href={`/dashboard/order/${id}`} 
                    className="text-emerald-600 hover:text-emerald-700 font-bold transition-colors underline-offset-4 hover:underline"
                >
                    {orderNumber}
                </Link>
            )
        }
    },
    {
        accessorKey: "companyName",
        header: "Company",
        cell: ({ row }) => (
            <div className="font-semibold text-gray-800 tracking-tight">
                {row.getValue("companyName")}
            </div>
        )
    },
    {
        accessorKey: "buyerName",
        header: "Buyer",
        cell: ({ row }) => <div className="text-gray-500 font-medium">{row.getValue("buyerName")}</div>
    },
    {
        accessorKey: "fabricsName",
        header: "Fabrics",
        cell: ({ row }) => (
            <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-none font-normal">
                {row.getValue("fabricsName")}
            </Badge>
        )
    },
    {
        accessorKey: "orderQuantity",
        header: () => <div className="text-right">Quantity</div>,
        cell: ({ row }) => (
            <div className="text-right font-mono font-bold text-gray-700">
                {row.getValue("orderQuantity").toLocaleString()} <span className="text-[10px] text-gray-400 font-sans">KG</span>
            </div>
        )
    },
    {
        accessorKey: "isProformaInvoiceCreated",
        header: () => <div className="text-center">Status</div>,
        cell: ({ row }) => {
            const isCreated = row.original.isProformaInvoiceCreated;
            return (
                <div className="flex justify-center">
                    {isCreated ? (
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100 transition-colors gap-1.5 px-3 py-1">
                            <FaCheckCircle size={12} />
                            <span className="text-[11px] font-bold uppercase tracking-wider">Invoiced</span>
                        </Badge>
                    ) : (
                        <Badge variant="outline" className="bg-rose-50 text-rose-600 border-rose-100 gap-1.5 px-3 py-1">
                            <CgUnavailable size={14} />
                            <span className="text-[11px] font-bold uppercase tracking-wider">Pending</span>
                        </Badge>
                    )}
                </div>
            )
        },
    },
]

