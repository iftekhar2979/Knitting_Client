"use client"
import { addPi, totalQuantityCounting } from '@/lib/features/Invoice/piSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ModalTable = ({ detail, billingWays }) => {
    const [value, setValue] = useState(0);
    const [finishDia, setfinishDia] = useState('');
    const [style, setStyle] = useState('');
    const [description, setDescription] = useState('');
    const { selectedValues } = useAppSelector(state => state.invoiceSlice);
    const { cleared, totalQuantity, totalAmount } = useAppSelector(state => state.pI);
    const { deliveredQuantity, companyId, fabricsName, buyerId, orderId, fabricsId } = detail;
    const dispatch = useAppDispatch();

    const handleChange = (e) => {
        setValue(parseFloat(e.target.value));
    };

    const amount = isNaN(deliveredQuantity * value) ? 0 : (deliveredQuantity * value);

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
            orderId: Number(orderId.slice(0, 1)),
            billingWay: billingWays
        };
        dispatch(addPi(object));
        dispatch(totalQuantityCounting());
    }, [value, finishDia, description, style, totalAmount, totalQuantity, billingWays]);

    useEffect(() => {
        if (cleared) {
            setValue("");
            setDescription("");
            setStyle("");
            setfinishDia("");
        }
    }, [cleared]);

    return (
        <tr className="border-b bg-white hover:bg-emerald-50/30 transition-colors dark:bg-gray-800 dark:border-gray-700">
            <td className="p-4 align-top font-medium text-gray-900">{fabricsName}</td>
            <td className="p-4 align-top">
                <Textarea 
                    placeholder="Enter description..."
                    onChange={(e) => setDescription(e.target.value)} 
                    className="w-48 min-h-[80px] text-xs resize-none focus-visible:ring-emerald-500" 
                    value={description}
                />
            </td>
            <td className="p-4 align-top">
                <Input 
                    placeholder="Finish Dia"
                    onChange={(e) => setfinishDia(e.target.value)} 
                    className="w-24 text-xs focus-visible:ring-emerald-500" 
                    value={finishDia}
                />
            </td>
            <td className="p-4 align-top">
                <Input 
                    placeholder="Style"
                    onChange={(e) => setStyle(e.target.value)} 
                    className="w-24 text-xs focus-visible:ring-emerald-500" 
                    value={style}
                />
            </td>
            <td className="p-4 align-top font-semibold text-gray-700">{deliveredQuantity}</td>
            <td className="p-4 align-top">
                <div className="relative">
                    <span className="absolute left-2 top-2.5 text-gray-400 text-xs">$</span>
                    <Input 
                        type="number" 
                        placeholder="0.00"
                        onChange={handleChange} 
                        className="w-28 pl-6 text-xs font-mono focus-visible:ring-emerald-500" 
                        value={value}
                    />
                </div>
            </td>
            <td className="p-4 align-top text-right font-bold text-emerald-700">
                ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
        </tr>
    );
};

export default ModalTable;