"use client"
import { MdDelete } from "react-icons/md"
import { format } from "date-fns"
import { IoMdDownload } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addingId } from "@/lib/features/Chalan/chalanSlice";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useState } from "react";
import Chalan from "@/components/dashboard/chalan/chalan";
import { useCreateBillFromChalanMutation, useDeleteDeliveryMutation } from "@/lib/features/delivery/deliveryApi";
import { FaFileInvoice, FaEye } from "react-icons/fa";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { BsThreeDots } from "react-icons/bs";
import DeleteModal from "@/components/dashboard/company/Modal/DeleteModal";
import { Dialog, DialogTrigger ,DialogHeader,DialogDescription,DialogTitle,DialogContent,ProfileForm} from "@/components/ui/dialog";
import { clearingSelectedValue } from "@/lib/features/Invoice/invoiceSlice";
import Model from "@/components/utils/Model";
import { DialogClose } from "@radix-ui/react-dialog";
import Link from "next/link";
const Action = ({ id, actionName,billAction ,chalanInfo}) => {
    const [open, setOpen] = useState(false)
    const [action ,setAction]=useState("Delete")
    const [unitPrice,setUnitPrice]=useState(0)
    const [deleteDelivery,{isLoading,isError}] = useDeleteDeliveryMutation()
    const [createBillForChalan]=useCreateBillFromChalanMutation()
    const [chalanName, setChalanName] = useState("")
    const dispatch = useAppDispatch()
    const handleChalan = (chalanId) => {
        setChalanName(chalanId)
        dispatch(addingId({ id: parseFloat(chalanId), name: `Chalan Number ${chalanId}` }))
    }
    const handleChange=(e)=>{
        setUnitPrice(e.target.value)        
    }
    const handleSubmit=()=>{
        // let amount=parseFloat(unitPrice)*chalanInfo?.deliveredQuantity
        const billInformation={unitPrice:parseFloat(unitPrice),chalanId:id}
        createBillForChalan(billInformation)
            .then(res => {
                if (res.data) {
                    setUnitPrice("")
                }
            })
    }
    // console.log(billAction)
    return (
        <div > 
              <Dialog open={open} onOpenChange={setOpen}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className={"border-none"}><BsThreeDots size={22} /></Button>
                </PopoverTrigger>
                <PopoverContent className="w-44">
                    <div className="flex mx-2 my-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleChalan(id)} ><FaEye size={24} color={"green"} className="cursor-pointer" /> <span className="mx-2">Chalan</span></div>
                    <DialogTrigger>  <div className="flex mx-2 my-2 hover:bg-gray-200 cursor-pointer" onClick={()=>setAction("bill")}><FaFileInvoice /><span className="mx-2">Make Bill</span></div> </DialogTrigger>
                  {chalanInfo?.unitPrice &&  <Link href={`/dashboard/bill/${id}`} className="flex mx-2 my-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleChalan(id)} ><FaEye size={24} color={"green"} className="cursor-pointer" /> <span className="mx-2">Go to Bill</span></Link>}
                    <DialogTrigger>  <div className="flex mx-2 my-2 hover:bg-gray-200 cursor-pointer" onClick={()=>setAction("delete")}><MdDelete size={24} color={"red"} className="cursor-pointer" /> <span className="mx-2">Delete</span></div></DialogTrigger>
                
                    </PopoverContent>
            </Popover>

{
    action==="bill" ?
    <>
    <DialogContent>
                <DialogHeader>
                    <DialogTitle>Want to make a bill for Chalan {chalanInfo?.id}</DialogTitle>
                    <div className="">
                        <h2>Total Quantity : {chalanInfo?.deliveredQuantity}</h2>
                        <h2>Amount : {chalanInfo?.deliveredQuantity * parseFloat(unitPrice) || 0}</h2>
                       <span>Unit Price : </span> <input type='number' defaultValue={0} className=" " onChange={(e) => handleChange(e)} />
                        
                        <button onClick={handleSubmit} className="btn btn-sm text-white bg-blue-500 rounded text-xl hover:bg-blue-600">Submit</button>
                    
                    </div>
                </DialogHeader>
            </DialogContent>
    
    </>
    :
    <>
    <DeleteModal title={"Do You Want To Remove Chalan"} property={id} id={id} setOpen={setOpen} isLoading={isLoading}  deleteQueryFn={deleteDelivery}/>
    </>
}

            {/* {
                actionName === 'Delete' &&
                <>

                    <DeleteModal title={"Do You Want To Remove Chalan"} property={id} id={id} setOpen={setOpen} isLoading={isLoading}  deleteQueryFn={deleteDelivery}/>

                </>
            } */}
        </Dialog>
        </div>
    )
};
export default Action;