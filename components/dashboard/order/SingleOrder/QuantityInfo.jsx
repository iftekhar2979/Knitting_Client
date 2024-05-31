"use client"

import Loading from "@/components/utils/Loading";
import { useCreateDeliveryMutation, useGetOnlyQuantityInfoQuery } from "@/lib/features/order/orderApi";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import InputDropDown from "@/components/utils/InputDropDown";
import { revalidatePath } from 'next/cache'
import Error from "@/components/utils/Error";

const deliveryMen = ["Alif", "kalif", "Jalif"]
const QuantityInfo = ({ id }) => {
    const { data, isLoading, isError, error, isSuccess } = useGetOnlyQuantityInfoQuery(id)
    const [createDelivery, { isLoading: deliveryLoading, isError: deliveryError, isSuccess: deliverySuccess }] = useCreateDeliveryMutation()
    const [vechile, setVechile] = useState("")
    const [role, setRole] = useState("")
    const [deliveryQuantity, setDeliveryQuantity] = useState("")
    const [deliveryMan, setDeliveryMan] = useState("")


    useEffect(() => {

        if (data?.restQuantity !== 0 && deliveryQuantity >= data?.restQuantity) {
            alert("You Can't add more number")
        }
    }, [deliveryQuantity, data?.restQuantity])
    if (isLoading) {
        return <Loading />
    }

    let { orderQuantity = "", restQuantity = "", status = "" } = data

    const handleDelivery = (e) => {
        let deliveryValue = e.target.value
        setDeliveryQuantity(parseFloat(deliveryValue))

    }
    const handleRole = (e) => {
        let deliveryValue = e.target.value
        setRole(deliveryValue)

    }
    const handleVechile = (e) => {
        let deliveryValue = e.target.value
        setVechile(deliveryValue)

    }

    const handleInputDropdown = (e) => {
        const val = e.target.value
        setDeliveryMan(val)

    }
    const handleSendDelivery = () => {
        const query = {
            deliveredBy: deliveryMan,
            vechileNumber: vechile,
            roleQuantity: parseFloat(role),
            amount: deliveryQuantity,
            from: parseFloat(id),
            status
        }
        console.log(query)
        createDelivery(query)
            .then(res => {
                if (res.data) {
                    setDeliveryQuantity("")
                    setDeliveryMan("")
                    setRole("")
                    setVechile("")
                }
            })

    }

    return (
        <div>

            <div className="my-2 border rounded-md shadow-sm p-10 font-mono flex justify-center flex-col">
                {deliveryError ? <Error data={"You can't Add More Quantity than Rest Quantity . Please Put Valid Quantity"} /> : ""}
                <h2 className="py-2 px-4">Status  : <span className="border-b py-2 px-4">{status}</span></h2>
                <h2 className="py-2 px-4">Total Order Quantity: <span className="border-b py-2 px-4 text-bold">{orderQuantity}</span> KG</h2>
                <InputDropDown
                    label={''}
                    divclassName={'my-2'}
                    handleInputDropdown={handleInputDropdown}
                    className={`py-3 px-4 pe-9 block w-1/2 bg-gray-50 border rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600 `}
                    options={deliveryMen}
                    sectionName={'companyName'}
                    placeholder={'Select Delivery Man'}
                    required
                />
                <div className="py-2 px-2">
                    <span>
                        Role Quantity :
                    </span>
                    <span>
                        <Input type="number" placeholder="Role Quantity " name="role" onChange={(e) => handleRole(e)} className="w-72 inline" />
                    </span>
                </div>
                <div className="py-2 px-2">
                    <span>
                        Vechile Number :
                    </span>
                    <span>
                        <Input type="text" placeholder="Vechile Number" name="vechileNumber" onChange={(e) => handleVechile(e)} className="w-72 inline" />
                    </span>
                </div>
                <h2 className="py-2 px-4">Delivered Quantity  :
                    <span className="border-b py-2 px-4 text-bold">
                        <Input type="number" placeholder="Quantity.." disabled={restQuantity === 0} className="w-72 inline" defaultValue={deliveryQuantity} onChange={(e) => handleDelivery(e)} />
                    </span>
                    <span className="mx-4">
                        Kg
                    </span>
                    <Button onClick={handleSendDelivery}>{deliveryLoading ? "Sending" : "Send"}</Button>
                </h2>
                <h2 className="py-2 px-4">Rest of Quantity  : <span className="border-b py-2 px-4 text-bold">{restQuantity}</span> KG</h2>
            </div>

        </div>
    )
};
export default QuantityInfo;