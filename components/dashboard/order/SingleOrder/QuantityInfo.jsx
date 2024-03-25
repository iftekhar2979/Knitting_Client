"use client"

import Loading from "@/components/utils/Loading";
import { useCreateDeliveryMutation, useGetOnlyQuantityInfoQuery } from "@/lib/features/order/orderApi";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import InputDropDown from "@/components/utils/InputDropDown";
import { revalidatePath } from 'next/cache'

const deliveryMen=["Alif","kalif","Jalif"]
const QuantityInfo = ({ id }) => {
    const { data, isLoading, isError, error } = useGetOnlyQuantityInfoQuery(id)
    const [createDelivery]=useCreateDeliveryMutation()

    const [deliveryQuantity, setDeliveryQuantity] = useState("")
    const [deliveryMan, setDeliveryMan] = useState("")

    if (isLoading) {
        return <Loading />
    }
    let { orderQuantity = "", restQuantity = "", status = "" } = data
    const handleDelivery = (e) => {
        let deliveryValue = e.target.value
        setDeliveryQuantity(parseFloat(deliveryValue))
        if (deliveryValue === restQuantity || deliveryValue >= restContent) {
            alert("You did not add more number")
        }
    }
    let restContent = ""
    deliveryQuantity ? restContent = restQuantity - deliveryQuantity : restContent = restQuantity
            if (orderQuantity - restQuantity > 0) {
                status = "Pending"
            } 
             if (restQuantity === 0) {
                status = "Fullfilled"

            } 
             if(orderQuantity === restQuantity){
                status = "Ordered"
            }
const handleInputDropdown=(e)=>{
    const val = e.target.value
    setDeliveryMan(val)
    
}
    const handleSendDelivery = () => {
        const query={deliveredBy:deliveryMan,amount:deliveryQuantity,from:parseFloat(id),status}
        createDelivery(query)
    }
    return (
        <div>

            <div className="my-2 border rounded-md shadow-sm p-10 font-mono flex justify-center flex-col">

                <h2 className="py-2 px-4">Status  : <span className="border-b py-2 px-4">{status}</span></h2>

                <h2 className="py-2 px-4">Total Order Quantity: <span className="border-b py-2 px-4 text-bold">{orderQuantity}</span> KG</h2>
                <InputDropDown
                    label={''}
                    divclass={'my-2'}
                    handleInputDropdown={handleInputDropdown}
                    className={`py-3 px-4 pe-9 block w-1/2 bg-gray-50 border rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600 `}
                    options={deliveryMen}
                    sectionName={'companyName'}
                    placeholder={'Select Delivery Man'}
                    required
                />
                <h2 className="py-2 px-4">Delivered Quantity  :
                    <span className="border-b py-2 px-4 text-bold">
                        <Input type="number" placeholder="Quantity.." className="w-72 inline" onChange={(e) => handleDelivery(e)} />
                    </span>
                    <span className="mx-4">
                        Kg
                    </span>
                    <Button onClick={handleSendDelivery}>Send</Button>
                </h2>
                <h2 className="py-2 px-4">Rest of Quantity  : <span className="border-b py-2 px-4 text-bold">{restContent}</span> KG</h2>
            </div>

        </div>
    )
};
export default QuantityInfo;