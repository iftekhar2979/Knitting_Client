"use client"
import { Checkbox } from '@/components/ui/checkbox';
import { clearingSelectedValue, pushingOnSelectedValue } from '@/lib/features/Invoice/invoiceSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import react, { useEffect, useState } from 'react';

const OrderListCheckBoxes = ({ orderList, row, handleCheckboxChange }) => {
    const [disabled, setDisabled] = useState(false)
    const { selectedValues, selectedCompanyName } = useAppSelector(state => state.invoiceSlice)



    return (
        <>
            {row.isBillCreated ? <> <input type='checkbox' checked={true} className={` checkbox checkbox-md checkbox-success mx-2`} disabled={true} /></>
                :
                <input type='checkbox' className={` checkbox checkbox-md checkbox-success mx-2`} disabled={!selectedCompanyName ? false : selectedCompanyName !== row.companyName ? true : false} value={orderList} checked={selectedValues?.includes(orderList)} onChange={handleCheckboxChange} />}
        </>
    )
};
export default OrderListCheckBoxes;