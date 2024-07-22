"use client"
import { addPi, clearingState, totalQuantityCounting } from '@/lib/features/Invoice/piSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import react, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const ModalTable = ({ detail ,billingWays}) => {
    const [value, setValue] = useState(0)
    const [finishDia, setfinishDia] = useState('')
    const [style, setStyle] = useState('')
    const [description, setDescription] = useState('')
    const { selectedValues, selectedCompany } = useAppSelector(state => state.invoiceSlice)
    const { cleared, totalQuantity, totalAmount } = useAppSelector(state => state.pI)
    const { deliveredQuantity , companyId, fabricsName, buyerId,orderId, fabricsId } = detail
    const dispatch = useAppDispatch()
console.log(orderId)
 
    const handleChange = (e) => {
        setValue(parseFloat(e.target.value))
    }
    const amount = isNaN(deliveredQuantity * value) ? 0 : (deliveredQuantity * value)
    useEffect(() => {
        const object = {
            fabricsName,
            finishDia: finishDia,
            totalQuantity: deliveredQuantity,
            companyId,
            style,
            buyerId,
            fabricsId,
            containOrders: selectedValues.join("_"),
            piName: `${companyId}_${selectedValues.join("_")}`,
            piNumber: `TKCF-${companyId}-${selectedValues.join("_")}`,
            description,
            unitPrice: value,
            amount: parseFloat(amount.toFixed(4)),
            invoiceQuantity: totalQuantity,
            invoiceAmount: totalAmount,
            orderId:Number(orderId.slice(0,1)),
            billingWay:billingWays
        }
        dispatch(addPi(object))
        dispatch(totalQuantityCounting())

    }, [value, finishDia, description, style, totalAmount, totalQuantity,billingWays])

    useEffect(() => {
        if (cleared) {
            setValue("")
            setDescription("")
            setStyle("")
            setfinishDia("")
        }
    }, [cleared])
    return (
        <>
            <tr className="border bg-gray-50 border hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700">
                <td className='text-md '>{fabricsName}</td>
                <td className='text-md '><textarea type='text' onChange={(e) => setDescription(e.target.value)} className='w-36 border' /></td>
                <td className='text-md '><textarea type='text' onChange={(e) => setfinishDia(e.target.value)} className='w-24 border' /></td>
                <td className='text-md '><textarea type='text' onChange={(e) => setStyle(e.target.value)} className='w-24 border' /></td>
                <td className='text-md '>{deliveredQuantity}</td>
                <td className='text-md '>{<input type='number' onChange={(e) => handleChange(e)} className='w-24' />}</td>
                <td className='text-md '>$ {amount.toLocaleString()}</td>
            </tr>


        </>
    )
};
export default ModalTable;