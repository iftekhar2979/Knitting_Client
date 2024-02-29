"use client"

import { format } from "date-fns";
import { Button } from "@/components/ui/button"
import {
  Dialog,
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
import { useAddYarnReceivedMutation } from "@/lib/features/yarnDetails/yarnDetailsApi";
import { MdDelete } from "react-icons/md";
import InfoOfYarn from "./InfoOfYarn";
const SingleYarnInfo = ({ item }) => {
  const [dynamicRestQuantity, setDynamicRestQuantity] = useState(0)
  const [addYarnReceived] = useAddYarnReceivedMutation()
  const { id, company: { companyName }, yarn, bookingQuantity, restQuantity, updatedAt = '', createdAt, yarnInformationWithDetails = [] } = item
  const handleDelivery = (e) => {
    const value = parseFloat(e.target.value)
    if (value > restQuantity) {
      alert("Please Give Us Valid Input..OtherWise Your Input will not done")
    }
    setDynamicRestQuantity(value)
  }
  const handleSave = () => {
    addYarnReceived({ from: id, amount: dynamicRestQuantity })
    setDynamicRestQuantity(0)
  }
  return (
    <div className=" border rounded-md shadow-sm p-10 font-mono">
      <div>
        <p className=" py-1 px-4">Company Name : <span className="border-b  px-4 font-extrabold">{companyName}</span></p>
        <p className="py-1 px-4">Yarn : <span className="border-b  px-4">{yarn}</span></p>
        <p className="py-1 px-4">Booking Quantity : <span className="border-b  px-4">{bookingQuantity} Kg</span></p>
        <p className="py-1 px-4">Received Quantiy : <span className="border-b  px-4">{bookingQuantity - restQuantity} Kg</span></p>
        <p className=" py-1 px-4">Rest Quantity : <span className="border-b  px-4">{restQuantity} Kg</span></p>
        <p className=" py-1 px-4">Created At : <span className="border-b  px-4">{format(createdAt, "PPp")}</span></p>
        <p className="py-1 px-4">Updated At : <span className="border-b  px-4">{updatedAt && format(updatedAt, "PPp")}</span></p>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-transparent border-2 border-green-500 mx-2 h-6 text-black hover:bg-green-500 my-2 hover:text-white">Received Booking</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Received Booking</DialogTitle>
            </DialogHeader>
            <div className="my-2  rounded-md shadow-sm p-10 font-mono flex justify-center flex-col">
              <h2 className="">Rest Quantity : <span className="border-b  px-4 text-bold">{dynamicRestQuantity ? restQuantity - dynamicRestQuantity : restQuantity}</span> KG</h2>
              <div className="my-4">
                <Label>Received Quantity : </Label>
                <Input type="number" placeholder="Received Quantity.." defaultValue={dynamicRestQuantity} className="inline" onChange={(e) => handleDelivery(e)} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSave}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button className="bg-transparent border-2 border-red-500 mx-2 h-6 text-black hover:bg-red-500 my-2 hover:text-white">Delete</Button>
      </div>
      {
        yarnInformationWithDetails?.map((item,index )=> <InfoOfYarn key={item.id} index={index} item={item} />)
        }
    </div>

  )
};
export default SingleYarnInfo;