import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { RiArrowUpDownFill } from "react-icons/ri"
import OrderListCheckBoxes from "./OrderListCheckBoxes"
import { useEffect, useState } from "react"
import { useAppDispatch } from "@/lib/hooks"
import { pushingOnSelectedValue, pushingSelectedCompany } from "@/lib/features/Invoice/invoiceSlice"
import { CgUnavailable } from "react-icons/cg";
import { MdOutlineEventAvailable } from "react-icons/md";
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
        cell:function Cell ({ row }) {
            const [disabled, setDisabled] = useState(false)
            const [state, setState] = useState("")
            const dispatch = useAppDispatch()


            const handleCheckboxChange = (event) => {
                dispatch(pushingOnSelectedValue(event.target.value))
            };
            return <OrderListCheckBoxes orderList={row.original.orderNumber} state={state} setDisabled={setDisabled} handleCheckboxChange={handleCheckboxChange} row={row.original} disabled={disabled} />
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
            // console.log(id)
            return <Link href={`/dashboard/order/${id}`} className="text-blue-300">{orderNumber}</Link>
        }

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
        accessorKey: "orderQuantity",
        header: ({ column }) => {
            return (
                <p
                    className={"flex"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Order Quantity
                    <RiArrowUpDownFill className=" h-4 w-4" size={22} />
                </p>
            )
        },
    },

    {
        accessorKey: "isProformaInvoiceCreated",
        header: ({ column }) => {
            return (
                <p
                    className={"flex"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Invoice Created
                    <RiArrowUpDownFill className=" h-4 w-4" size={22} />
                </p>
            )
        },
        cell: ({ row }) => {
            return <div>{row.original.isProformaInvoiceCreated ? <MdOutlineEventAvailable size={25} color={"green"}/> : <CgUnavailable size={25} color={"red"}/>}</div>
        },

    },





]