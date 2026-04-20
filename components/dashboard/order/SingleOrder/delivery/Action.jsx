"use client"
import { MdDelete, MdReceipt } from "react-icons/md"
import { IoMdDownload } from "react-icons/io";
import { useAppDispatch } from "@/lib/hooks";
import { addingId } from "@/lib/features/Chalan/chalanSlice";
import { useState } from "react";
import { useCreateBillFromChalanMutation, useDeleteDeliveryBillMutation, useDeleteDeliveryMutation } from "@/lib/features/delivery/deliveryApi";
import { FaFileInvoice, FaEye, FaWeightHanging, FaTag, FaCalculator } from "react-icons/fa";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { BsThreeDots } from "react-icons/bs";
import DeleteModal from "@/components/dashboard/company/Modal/DeleteModal";
import { Dialog, DialogTrigger, DialogHeader, DialogTitle, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { TiDelete } from "react-icons/ti";
import Swal from "sweetalert2";

const Action = ({ id, chalanInfo }) => {
    const [open, setOpen] = useState(false)
    const [action, setAction] = useState("Delete")
    const [unitPrice, setUnitPrice] = useState("")
    
    const [deleteDelivery, { isLoading }] = useDeleteDeliveryMutation()
    const [createBillForChalan, { isLoading: isBilling }] = useCreateBillFromChalanMutation()
    const [deleteDeliveryBill, { isLoading: isDeletingLoading }] = useDeleteDeliveryBillMutation()
    
    const dispatch = useAppDispatch()

    const handleChalan = (chalanId) => {
        dispatch(addingId({ id: parseFloat(chalanId), name: `Chalan Number ${chalanId}` }))
    }

    const handleSubmit = async () => {
        if (!unitPrice || parseFloat(unitPrice) <= 0) {
            return Swal.fire({
                title: 'Invalid Price',
                text: 'Please enter a valid unit price.',
                icon: 'warning'
            });
        }

        const billInformation = { unitPrice: parseFloat(unitPrice), chalanId: id }
        try {
            const res = await createBillForChalan(billInformation).unwrap();
            if (res) {
                setOpen(false);
                setUnitPrice("");
                Swal.fire({
                    title: 'Success!',
                    text: 'Bill created successfully!',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        } catch (err) {
            Swal.fire({
                title: 'Error!',
                text: err.data?.message || 'Failed to create bill.',
                icon: 'error'
            });
        }
    }

    const totalAmount = (chalanInfo?.deliveredQuantity || 0) * (parseFloat(unitPrice) || 0);

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0 hover:bg-muted">
                            <BsThreeDots size={20} />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-52 p-2" align="end">
                        <div className="flex flex-col gap-1">
                            <button
                                onClick={() => { handleChalan(id); setAction("view"); }}
                                className="flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-sm hover:bg-accent transition-colors text-left"
                            >
                                <FaEye className="text-green-600" /> <span>View Chalan</span>
                            </button>

                            {!chalanInfo?.unitPrice && (
                                <DialogTrigger asChild>
                                    <button
                                        onClick={() => setAction("bill")}
                                        className="flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-sm hover:bg-accent transition-colors text-left"
                                    >
                                        <FaFileInvoice className="text-blue-600" /> <span>Make Bill</span>
                                    </button>
                                </DialogTrigger>
                            )}

                            {chalanInfo?.unitPrice && (
                                <>
                                    <Link
                                        href={`/dashboard/bill/${id}`}
                                        className="flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-sm hover:bg-accent transition-colors"
                                        onClick={() => handleChalan(id)}
                                    >
                                        <MdReceipt className="text-blue-600" /> <span>Go to Bill</span>
                                    </Link>

                                    <DialogTrigger asChild>
                                        <button
                                            onClick={() => setAction("removebill")}
                                            className="flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-sm hover:bg-destructive/10 text-destructive transition-colors text-left"
                                        >
                                            <TiDelete size={18} /> <span>Remove Bill</span>
                                        </button>
                                    </DialogTrigger>
                                </>
                            )}

                            <DialogTrigger asChild>
                                <button
                                    onClick={() => setAction("delete")}
                                    className="flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-sm hover:bg-destructive/10 text-destructive transition-colors text-left"
                                >
                                    <MdDelete /> <span>Remove Chalan</span>
                                </button>
                            </DialogTrigger>
                        </div>
                    </PopoverContent>
                </Popover>

                {action === "bill" ? (
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                                <FaFileInvoice className="text-blue-500" />
                                Generate Bill
                            </DialogTitle>
                        </DialogHeader>
                        
                        <div className="grid gap-6 py-4">
                            <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 border border-slate-100 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 rounded-full">
                                        <FaWeightHanging className="text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-semibold">Total Quantity</p>
                                        <p className="text-lg font-bold text-slate-900">{chalanInfo?.deliveredQuantity} <span className="text-sm font-normal text-slate-500">Kg</span></p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-slate-500 uppercase font-semibold">Chalan ID</p>
                                    <p className="text-sm font-medium text-slate-700">#{id}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="unitPrice" className="text-sm font-semibold flex items-center gap-2 text-slate-700">
                                        <FaTag className="text-slate-400 w-3 h-3" />
                                        Unit Price (per Kg)
                                    </Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                        <Input
                                            id="unitPrice"
                                            type="number"
                                            placeholder="0.00"
                                            className="pl-7 h-11 border-slate-200 focus:ring-blue-500"
                                            value={unitPrice}
                                            onChange={(e) => setUnitPrice(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-200/50">
                                    <div className="flex items-center justify-between opacity-80 mb-1">
                                        <span className="text-xs font-medium uppercase tracking-wider flex items-center gap-1">
                                            <FaCalculator className="w-3 h-3" /> Calculated Total
                                        </span>
                                    </div>
                                    <div className="text-3xl font-black tabular-nums">
                                        ${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-2">
                            <Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button 
                                className="flex-1 bg-blue-600 hover:bg-blue-700" 
                                onClick={handleSubmit}
                                disabled={isBilling}
                            >
                                {isBilling ? "Processing..." : "Confirm Billing"}
                            </Button>
                        </div>
                    </DialogContent>
                ) : action === "removebill" ? (
                    <DeleteModal 
                        title="Are you sure you want to remove the bill associated with Chalan?" 
                        property={id} 
                        id={id} 
                        setOpen={setOpen} 
                        isLoading={isDeletingLoading} 
                        deleteQueryFn={deleteDeliveryBill} 
                    />
                ) : (
                    <DeleteModal 
                        title="Do You Want To Remove Chalan?" 
                        property={id} 
                        id={id} 
                        setOpen={setOpen} 
                        isLoading={isLoading} 
                        deleteQueryFn={deleteDelivery} 
                    />
                )}
            </Dialog>
        </div>
    )
};

export default Action;