import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { setBuyer } from "@/lib/features/addOrder/addOrderSlice";
import { useAppDispatch } from "@/lib/hooks";

const DropDown = ({data,dropDownName,value,field}) => {
    
    return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="w-[280px]">
                <SelectValue placeholder={dropDownName} />
            </SelectTrigger>
            <SelectContent>        
                    {data?.map(item=><SelectItem key={item.id}  value={item[value]}>{item[value]}</SelectItem>)}
            </SelectContent>
        </Select>
    )
};
export default DropDown;