"use client"

import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const SingleYarnInfo = ({item}) => {
    // console.log('iem',item)
    const { company:{companyName},yarn ,bookingQuantity,restQuantity,updatedAt='',createdAt,yarnInformationWithDetails=[] } = item
    return (
        <div className=" border rounded-md shadow-sm p-10">
          <div>

            <p className="py-2 px-4">Company Name : <span className="border-b py-2 px-4 font-extrabold">{companyName}</span></p>
            <p className="py-2 px-4">Yarn : <span className="border-b py-2 px-4">{yarn}</span></p>
            <p className="py-2 px-4">Booking Quantity : <span className="border-b py-2 px-4">{bookingQuantity}</span></p>
            <p className="py-2 px-4">Received Quantiy : <span className="border-b py-2 px-4">{bookingQuantity-restQuantity }</span></p>
            <p className="py-2 px-4">Rest Quantity : <span className="border-b py-2 px-4">{restQuantity}</span></p>
            <p className="py-2 px-4">Created At : <span className="border-b py-2 px-4">{format(createdAt,"Pp")}</span></p>
            <p className="py-2 px-4">Updated At : <span className="border-b py-2 px-4">{updatedAt && format(updatedAt,"Pp")}</span></p>
            <Button className="bg-transparent border-2 border-green-500 mx-2 h-6 text-black hover:bg-green-500 my-2 hover:text-white">Edit</Button>
            <Button className="bg-transparent border-2 border-red-500 mx-2 h-6 text-black hover:bg-red-500 my-2 hover:text-white">Delete</Button>
        
          </div>
         {
            yarnInformationWithDetails?.map(item=><div className="border-t">
                <span className="border-r px-2 font-serif ">Received : {item.receivedQuantity} </span>
              <span className="border-r px-2 font-serif ">  Data : { updatedAt && format(item.createdAt,"Pp")}</span></div>)
         }
        
        </div>

    )
};
export default SingleYarnInfo;