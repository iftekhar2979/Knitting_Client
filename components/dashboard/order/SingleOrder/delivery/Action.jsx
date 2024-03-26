"use client"
import { MdDelete } from "react-icons/md"
import { format } from "date-fns"
import { IoMdDownload } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addingId } from "@/lib/features/Chalan/chalanSlice";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useState } from "react";
import Chalan from "@/components/dashboard/chalan/chalan";
import { useDeleteDeliveryMutation } from "@/lib/features/delivery/deliveryApi";
import { FaDotCircle, FaEye } from "react-icons/fa";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { BsThreeDots } from "react-icons/bs";
import DeleteModal from "@/components/dashboard/company/Modal/DeleteModal";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
const Action = ({ id, actionName }) => {
    const [open, setOpen] = useState(false)
    const [deleteDelivery,{isLoading,isError}] = useDeleteDeliveryMutation()
    const [chalanName, setChalanName] = useState("")
    const dispatch = useAppDispatch()
    const handleChalan = (chalanId) => {
        setChalanName(chalanId)
        dispatch(addingId({ id: parseFloat(chalanId), name: `Chalan Number ${chalanId}` }))
    }


    return (
        <div >   <Dialog open={open} onOpenChange={setOpen}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className={"border-none"}><BsThreeDots size={22} /></Button>
                </PopoverTrigger>
                <PopoverContent className="w-44">
                    <div className="flex mx-2 my-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleChalan(id)} ><FaEye size={24} color={"green"} className="cursor-pointer" /> <span className="mx-2">Show</span></div>

                    <DialogTrigger>  <div className="flex mx-2 my-2 hover:bg-gray-200 cursor-pointer"><MdDelete size={24} color={"red"} className="cursor-pointer" /> <span className="mx-2">Delete</span></div></DialogTrigger>
                </PopoverContent>
            </Popover>


            {
                actionName === 'Delete' &&
                <>

                    <DeleteModal title={"Do You Want To Remove Chalan"} property={id} id={id} setOpen={setOpen} isLoading={isLoading}  deleteQueryFn={deleteDelivery}/>

                </>
            }
        </Dialog>
        </div>
    )
};
export default Action;