"use client"

import Loading from "@/components/utils/Loading";
import { useGetOnlyQuantityInfoQuery } from "@/lib/features/order/orderApi";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const QuantityInfo = ({ id }) => {
    const { data, isLoading, isError, error } = useGetOnlyQuantityInfoQuery(id)
    const [deliveryQuantity, setDeliveryQuantity] = useState("")

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
    let statusContent = ""
    let value=orderQuantity - restQuantity
    switch (value) {
        case value === 0:
                statusContent = "Ordered"
            break;
        case restQuantity === 0:
            statusContent = "Fullfilled"
            break;
        case value > 0:
            statusContent = "Ordered"
    }
    return (
        <div>

            <div className="my-2 border rounded-md shadow-sm p-10 font-mono flex justify-center flex-col">

                <h2 className="py-2 px-4">Status  : <span className="border-b py-2 px-4">{statusContent}</span></h2>

                <h2 className="py-2 px-4">Total Order Quantity: <span className="border-b py-2 px-4 text-bold">{orderQuantity}</span> KG</h2>
                <h2 className="py-2 px-4">Delivered Quantity  :
                    <span className="border-b py-2 px-4 text-bold">
                        <Input type="number" placeholder="Quantity.." className="w-72 inline" onChange={(e) => handleDelivery(e)} />
                    </span>
                    <span className="mx-4">
                        Kg
                    </span>
                    <Button>Send</Button>
                </h2>
                <h2 className="py-2 px-4">Rest of Quantity  : <span className="border-b py-2 px-4 text-bold">{restContent}</span> KG</h2>
            </div>

        </div>
    )
};
export default QuantityInfo;