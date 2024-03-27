
import { Checkbox } from '@/components/ui/checkbox';
import { pushingOnSelectedValue } from '@/lib/features/Invoice/invoiceSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import react, { useEffect, useState } from 'react';

const OrderListCheckBoxes = ({ orderList, state, setDisabled, row, disabled, handleCheckboxChange }) => {
    const { selectedValues ,selectedCompany} = useAppSelector(state => state.invoiceSlice)
    useEffect(() => {
        if (selectedCompany[0]) {

            setDisabled(row.companyName !== selectedCompany[0])
        }else{
            setDisabled(false)
        }

    }, [selectedValues])
   
    return (
        <input type='checkbox' className={` checkbox checkbox-md checkbox-success mx-2`} disabled={row.isProformaInvoiceCreated} value={orderList} checked={selectedValues?.includes(orderList)} onChange={handleCheckboxChange} />
    )
};
export default OrderListCheckBoxes;