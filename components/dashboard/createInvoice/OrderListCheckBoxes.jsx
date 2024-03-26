
import { Checkbox } from '@/components/ui/checkbox';
import { pushingOnSelectedValue } from '@/lib/features/Invoice/invoiceSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import react, { useEffect, useState } from 'react';

const OrderListCheckBoxes = ({ orderList }) => {
    const {selectedValues}=useAppSelector(state=>state.invoiceSlice)
    const dispatch=useAppDispatch()

    const handleCheckboxChange = (event) => {
            dispatch(pushingOnSelectedValue(event.target.value))
        
    };

 
    return (
        <input type='checkbox' className={` checkbox checkbox-md checkbox-success mx-2`} value={orderList} checked={selectedValues?.includes(orderList)} onChange={handleCheckboxChange} />
    )
};
export default OrderListCheckBoxes;