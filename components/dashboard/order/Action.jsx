"use client"
import { MdDelete } from "react-icons/md"
import {  FaEdit,  } from "react-icons/fa";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { BsThreeDots } from "react-icons/bs";
import DeleteModal from "@/components/dashboard/company/Modal/DeleteModal";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useDeleteOrderMutation } from "@/lib/features/order/orderApi";
import { useState } from "react";
import Link from "next/link";
const Action = ({ id, actionName,row,orderNumber }) => {
    const [open, setOpen] = useState(false)
    const [deleteOrder,{isLoading,isError}] = useDeleteOrderMutation()
   
 
    return (
        <div >   <Dialog open={open} onOpenChange={setOpen}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className={"border-none"}><BsThreeDots size={22} /></Button>
                </PopoverTrigger>
                <PopoverContent className="w-44">
                   <Link href={`/dashboard/order/${id}/edit`}> <div className="flex mx-2 my-2 hover:bg-gray-200 cursor-pointer"  ><FaEdit size={24} color={"green"} className="cursor-pointer" /> <span className="mx-2">Edit</span></div></Link>

                    <DialogTrigger>  <div className="flex mx-2 my-2 hover:bg-gray-200 cursor-pointer"><MdDelete size={24} color={"red"} className="cursor-pointer" /> <span className="mx-2">Delete</span></div></DialogTrigger>
                </PopoverContent>
            </Popover>


            {
                actionName === 'Delete' &&
                <>

                    <DeleteModal title={"Do You Want To Remove Order"} property={orderNumber} id={id} setOpen={setOpen} isLoading={isLoading}  deleteQueryFn={deleteOrder}/>

                </>
            }
        </Dialog>
        </div>
    )
};
export default Action;