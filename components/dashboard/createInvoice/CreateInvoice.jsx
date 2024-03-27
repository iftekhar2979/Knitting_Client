"use client"

import { useGetInvoiceOrdersQuery } from "@/lib/features/order/orderApi";
import { DataTable } from "../company/DataTable";
import { columns } from "./columns";
import Loading from "@/components/utils/Loading";
import Error from "@/components/utils/Error";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { PopoverContent } from "@/components/ui/popover";
import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Table from "@/components/utils/Table/Table";
import { useGetOrdersInvoiceMutation } from "@/lib/features/Invoice/invoiceApi";
import ModalTable from "./ModalTable";
import { clearingState } from "@/lib/features/Invoice/piSlice";

const tableHeadings = [
    {
        id: 601,
        heading: 'Fabrics'
    },
    {
        id: 603,
        heading: "Description"
    },
    {
        id: 602,
        heading: "Finish Dia"
    },
    {
        id: 604,
        heading: "Style"
    },
    {
        id: 605,
        heading: "QTY (KG)"
    },
    {
        id: 606,
        heading: "Unit Price (USD)"
    },
    {
        id: 607,
        heading: "Total Amount (USD)"
    }
];
const CreateInvoice = (props) => {
    const { data, isLoading, isError, error } = useGetInvoiceOrdersQuery()
    const [getOrdersInvoice, { data: piOrders, isLoading: piOrderLoading, isError: isPiOrderError, error: piOrderError }] = useGetOrdersInvoiceMutation()
    const [open, setOpen] = useState(false)
    const { selectedValues, selectedCompany } = useAppSelector(state => state.invoiceSlice)
    const { piValue, totalAmount, totalQuantity } = useAppSelector(state => state.pI)
    const dispatch=useAppDispatch()
    if (isLoading) {
        return <Loading />
    }
    if (isError) {
        return <Error data={"Fetching Data Error !!! Please try again and contact your software Provider"} />
    }

    const handleProformaInvoice = () => {
        getOrdersInvoice(selectedValues)
    }
    const handleSubmit = () => {
        console.log(piValue)
       dispatch(clearingState())
    }
    return (
        <div className="w-full">
            <DataTable columns={columns} data={data} searchingValue={"orderNumber"} placeholder={"Filter with Order Number..."}>
            </DataTable>
            {selectedValues.length !== 0 ?
                <div className="w-full">
                    <Dialog className='w-full' open={open} onOpenChange={setOpen}>
                        <DialogTrigger><Button onClick={handleProformaInvoice}>Make Performa Invoice</Button></DialogTrigger>

                        <DialogContent className="fixed  z-50 grid w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg ">
                            {isPiOrderError ?
                                <Error data={"Please Select Same Company and Same Buyers Order for making Proforma Invoice"} />
                                :
                                <>
                                    <DialogHeader>
                                        <DialogTitle>Do You Want to Create PI for Order : {selectedValues.join(", ")}</DialogTitle>
                                    </DialogHeader>
                                    <Table tableHeadings={tableHeadings} >
                                        {piOrders?.map((item, index) => <>
                                            <ModalTable key={index} detail={item} />
                                        </>)}
                                        <tr>
                                            <td></td>
                                            <td>Total</td>
                                            <td></td>
                                            <td></td>
                                            <td>{totalQuantity} KG</td>
                                            <td></td>
                                            <td>$ {totalAmount}</td>
                                        </tr>
                                    </Table>
                                </>
                            }
                            <Button onClick={handleSubmit} className={'mx-auto w-24'}>Submit</Button>
                        </DialogContent>

                    </Dialog>
                </div>
                : ""}
        </div>
    )
};
export default CreateInvoice;