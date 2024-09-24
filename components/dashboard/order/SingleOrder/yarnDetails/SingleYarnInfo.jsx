"use client"

import { format } from "date-fns";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { useAddYarnReceivedMutation, useDeleteYarnDetailsMutation } from "@/lib/features/yarnDetails/yarnDetailsApi";
import { MdDelete } from "react-icons/md";
import InfoOfYarn from "./InfoOfYarn";
import DeleteModal from "@/components/dashboard/company/Modal/DeleteModal";
const SingleYarnInfo = ({ item }) => {
  // const [dynamicRestQuantity, setDynamicRestQuantity] = useState(0)
  const [addYarnReceived] = useAddYarnReceivedMutation()
  const [retrunVal,setReturnVal]=useState({amount:0,role:"",vechileNumber:"",deliveredBy:""})
  const [deleteYarnDetails, { isLoading }] = useDeleteYarnDetailsMutation()
  const { id, company: { companyName,location }, yarnType,descriptionOfYarn, ReceivingQuantity, restQuantity, updatedAt = '', createdAt, yarnInformationWithDetails = [] } = item
  const handleDelivery = (e) => {
    const value = parseFloat(e.target.value)
    if (value > restQuantity) {
      alert("Please Give Us Valid Input..OtherWise Your Input will not done")
    }
    setDynamicRestQuantity(value)
  }
  let data={ id, company: { companyName,location }, yarnType,descriptionOfYarn, ReceivingQuantity, restQuantity, updatedAt, createdAt}
  const handleReturn=(e)=>{
    setReturnVal((values)=>{
      let val=e.target.value
      if(e.target.name==="amount"){
        val=parseFloat(e.target.value)
      }
      return {...values,[e.target.name]:val}
    })
  }

  const handleSave = () => {
    addYarnReceived({ from: id, ...retrunVal })
    setReturnVal({amount:0,role:"",vechileNumber:"",deliveredBy:""})
  }
  return (
    <>
      <div className=" border rounded-md shadow-sm p-10 font-mono">
        <div>
          <p className=" py-1 px-4">Company Name : <span className="border-b  px-4 font-extrabold">{companyName}</span></p>
          <p className="py-1 px-4">Yarn : <span className="border-b  px-4">{yarnType}</span></p>
          <p className="py-1 px-4">Received Quantity : <span className="border-b  px-4">{ReceivingQuantity} Kg</span></p>
          {/* <p className="py-1 px-4">Received Quantiy : <span className="border-b  px-4">{ReceivingQuantity - restQuantity} Kg</span></p> */}
          {/* <p className=" py-1 px-4">Rest Quantity : <span className="border-b  px-4">{restQuantity} Kg</span></p> */}
          {/* <p className=" py-1 px-4">Description : <span className="border-b  px-4">{descriptionOfYarn}</span></p> */}
          <p className=" py-1 px-4">Received At : <span className="border-b  px-4">{format(createdAt, "PPp")}</span></p>
          {/* <p className="py-1 px-4">Updated At : <span className="border-b  px-4">{updatedAt && format(updatedAt, "PPp")}</span></p> */}
          {restQuantity !== 0
            ?
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-transparent border-2 border-green-500 mx-2 h-6 text-black hover:bg-green-500 my-2 hover:text-white">Return</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Return Booking</DialogTitle>
                </DialogHeader>
                <div className="my-2  rounded-md shadow-sm font-mono flex justify-center flex-col">
                  <div className="my-4">
                    <Label>Return Quantity : </Label>
                    <Input type="number" placeholder="Return Quantity.."  name="amount"  className="inline" onChange={(e) => handleReturn(e)} />
                    <Label>Role : </Label>
                    <Input type="text" placeholder="Role Quantity.." name="role" className="inline" onChange={(e) => handleReturn(e)} />
                    <Label>Vechile No : </Label>
                    <Input type="text" placeholder="Vechile Number.."  name="vechileNumber" className="inline" onChange={(e) => handleReturn(e)} />
                    <Label>Delivery Man : </Label>
                    <Input type="text" placeholder="Delivery Man.."  name="deliveredBy" className="inline" onChange={(e) => handleReturn(e)} />
                  </div>
                </div>
                <DialogClose asChild>
                  <Button type="submit" onClick={handleSave}>Save</Button>
                  </DialogClose>
              </DialogContent>
            </Dialog>
            :
            ""
          }
          <Button className="bg-transparent border-2 border-red-500 mx-2 h-6 text-black hover:bg-red-500 my-2 hover:text-white" onClick={() => deleteYarnDetails(id)}>Delete</Button>


        </div>
        {
          yarnInformationWithDetails?.map((item, index) => <InfoOfYarn key={item.id} index={index} anotherInfo={data} item={item} />)
        }
      </div>

     </>

  )
};
export default SingleYarnInfo;