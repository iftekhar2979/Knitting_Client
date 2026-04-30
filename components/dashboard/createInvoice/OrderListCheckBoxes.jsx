"use client"
import { Checkbox } from '@/components/ui/checkbox';
import { useAppSelector } from '@/lib/hooks';

const OrderListCheckBoxes = ({ orderList, row, handleCheckboxChange }) => {
    const { selectedValues, selectedCompanyName } = useAppSelector(state => state.invoiceSlice);

    const isDisabled = !selectedCompanyName 
        ? false 
        : selectedCompanyName !== row.companyName;

    if (row.isBillCreated) {
        return (
            <div className="flex items-center justify-center">
                <Checkbox 
                    checked={true} 
                    disabled={true} 
                    className="h-5 w-5 border-emerald-500 data-[state=checked]:bg-emerald-500 data-[state=checked]:text-white" 
                />
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center">
            <Checkbox 
                id={`order-${orderList}`}
                className="h-5 w-5 border-gray-300 data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500 transition-all focus-visible:ring-emerald-500"
                disabled={isDisabled}
                checked={selectedValues?.includes(orderList)}
                onCheckedChange={(checked) => {
                    handleCheckboxChange({ target: { value: orderList, checked } });
                }}
            />
        </div>
    );
};

export default OrderListCheckBoxes;