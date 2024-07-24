"use client"

import Loading from "@/components/utils/Loading";
import { useCreateDeliveryMutation, useGetOnlyQuantityInfoQuery } from "@/lib/features/order/orderApi";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import InputDropDown from "@/components/utils/InputDropDown";
import { revalidatePath } from 'next/cache'
import Error from "@/components/utils/Error";
import { useGetAllDeliveryManQuery } from "@/lib/features/delivery/deliveryApi";
import { FaFirstOrder, FaReceipt, FaSpinner, FaTruckPickup } from "react-icons/fa6";
import { MdCardTravel, MdCarRental, MdDeliveryDining, MdPerson, MdPersonPinCircle, MdProductionQuantityLimits, MdRollerShades } from "react-icons/md";
import { Bs6Square, BsBorderOuter, BsTruck } from "react-icons/bs";
import { FaFirstOrderAlt, FaProductHunt, FaRestroom, FaTruck, FaTruckLoading } from "react-icons/fa";
import { BiReset } from "react-icons/bi";


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

    let { orderQuantity = "", restQuantity = "", status = "", deliveredQuantity = "" } = data

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

            <div className="my-2  rounded-md shadow-sm  font-mono flex justify-center flex-col">
                {deliveryError ? <Error data={"You can't Add More Quantity than Rest Quantity . Please Put Valid Quantity"} /> : ""}
                <div className=' grid grid-cols-1 md:grid-cols-4 gap-4'>

                    <div className='px-6 flex flex-row md:flex-col justify-between md:justify-center '>
                        <div className='my-2 h-16'>
                            <div className="flex items-center">
                                <MdProductionQuantityLimits color="black" />
                                <h2 className="px-2">Ordered </h2>
                            </div>
                            <p> <span className="text-inactive font-semibold">{orderQuantity}  Kg</span></p>
                        </div>
                        <div className='my-2 h-16'>
                            <div className="flex items-center">
                                <MdRollerShades color="black" />
                                <h2 className="px-2">Role</h2>
                            </div>
                            <Input type="number" placeholder="Role Quantity " name="role" onChange={(e) => handleRole(e)} className="" />
                        </div>
                    </div>
                    <div className='px-6 flex flex-row md:flex-col justify-between md:justify-center '>
                        <div className='my-2 h-16'>
                            <div className="flex items-center">
                                <FaTruckPickup color="black" />
                                <h2 className="px-2">Delivered </h2>

                            </div>
                            <p> <span className="text-inactive font-semibold">{deliveredQuantity}  Kg</span></p>
                        </div>
                        <div className='my-2 h-16'>
                            <div className="flex items-center">
                                <MdPersonPinCircle color="black" />
                                <h2 className="px-2">Through By </h2>

                            </div>
                            <Input type="text" placeholder="Delivery Man " name="role" onChange={(e) => setDeliveryMan(e.target.value)} className="" />
                        </div>
                    </div>
                    <div className='px-6 flex flex-row md:flex-col justify-between md:justify-center '>
                        <div className='my-2 h-16'>
                            <div className="flex items-center">
                                <BiReset color="black" />
                                <h2 className="px-2">Rest Qty</h2>
                            </div>
                            <p> <span className="text-inactive font-semibold">{restQuantity}  Kg</span></p>
                        </div>

                        <div className='my-2 h-16'>

                            <div className="flex items-center">
                                <FaTruckLoading color="black" />
                                <h2 className="px-2"> Delivery  </h2>

                            </div>
                            <Input type="number" placeholder="Quantity.." disabled={restQuantity === 0} className="" defaultValue={deliveryQuantity} onChange={(e) => handleDelivery(e)} />

                        </div>

                    </div>
                    <div className='px-6 flex flex-row md:flex-col justify-between md:justify-center '>
                        <div className='my-2 h-16'>
                            <h2 className="">Yarn Details</h2>
                            <p> <span className="text-inactive font-semibold">Created</span></p>
                        </div>
                        <div className='my-2 h-16'>
                            <div className="flex items-center">
                                <FaTruck color="black" />
                                <h2 className="px-2"> Vechile Number</h2>
                            </div>

                            <Input type="text" placeholder="Vechile Number" name="vechileNumber" onChange={(e) => handleVechile(e)} className="" />
                        </div>

                    </div>
                </div>

                <div className="flex justify-center my-4">

                    <Button onClick={handleSendDelivery} className="bg-active-color mx-4">{deliveryLoading ?
                        <>
                            <FaSpinner />
                            <span>Sending</span>
                        </>
                        : "Send"}</Button>
                </div>

            </div>


        </div>
    )
};
export default QuantityInfo;