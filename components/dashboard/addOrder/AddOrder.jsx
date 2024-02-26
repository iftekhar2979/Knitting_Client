"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { date, number, z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useGetCompanyQuery } from "@/lib/features/company/companyApi"
import { useAddOrderMutation } from "@/lib/features/order/orderApi"
import { toast, useToast } from "@/components/ui/use-toast"
import InputDropDown from "@/components/utils/InputDropDown"
import { useState } from "react"
import { useGetProductQuery } from "@/lib/features/Product/productApi"
import { Label } from "@/components/ui/label"

const FormSchema = z.object({

    orderNumber: z.string().min(5, {
        message: "Order Number must be at least 5 characters"
    }),

    invoiceNumber: z.string().min(5, {
        message: "Order Number must be at least 5 characters"
    }),
    boNumber: z.string(),
    poNumber: z.string(),
    pmNumber: z.string(),
    season: z.string().min(2, {
        message: "Order Number must be at least 2 characters"
    }),
    status: z.string()

})

const info = [

    {
        id: 102,
        name: 'orderNumber',
        header: "Order Number",
        placeholder: "Order Number...",
        type: "String"
    },

    {
        id: 105,
        name: 'season',
        header: "Season",
        placeholder: "Season...",
        type: "String"
    },
    {
        id: 106,
        name: 'pmNumber',
        header: "P.M Number",
        placeholder: "P.M Number...",
        type: "String"
    },
    {
        id: 107,
        name: 'poNumber',
        header: "P.O Number",
        placeholder: "P.O Number...",
        type: "String"
    },
    {
        id: 108,
        name: 'boNumber',
        header: "B.O Number",
        placeholder: "B.O Number...",
        type: "String"
    },
    {
        id: 109,
        name: 'invoiceNumber',
        header: "Invoice Number",
        placeholder: "Invoice Number...",
        type: "String"
    },
]
export function AddOrder() {
    const { data, isLoading, error, isError } = useGetCompanyQuery()
    const [addOrder,{isLoading:insertingOrderLoading,isError:insertingOrderError}]=useAddOrderMutation()
    const { data: product, isLoading: productLoading, error: productError, isError: productIsError } = useGetProductQuery()
    const [companyInfo, setCompanyInfo] = useState()
    const [buyerInfo, setBuyerInfo] = useState()
    const [fabricsInfo, setFabricsInfo] = useState()
    const [buyers, setBuyers] = useState()
    const [date, setDate] = useState()
    const [quantity, setQuantity] = useState(0)
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            invoiceNumber: "",
            boNumber: "",
            poNumber: "",
            pmNumber: "",
            season: "",
            targetDate: new Date(),
            fabricsType: "",
            status: "Ordered"
        },
    })
    const companyNames = data?.map(item => item.companyName)
    const products = product?.map(item => item.fabricsName)

    const handleInputDropdown = (e) => {
        const val = e.target.value
        const findCompanyLocation = data?.find((item, index) => {
            return item?.companyName === val
        })
        const { id, companyName, buyers } = findCompanyLocation
        setCompanyInfo({ companyId: id, companyName, buyers })
        setBuyers(findCompanyLocation?.buyers?.map(item => item.buyerName))
        if (buyers.length > 0) {
            const { id: buyerId, buyerName } = buyers[0]
            setBuyerInfo({ buyerId, buyerName })
        } else {
            setBuyerInfo({ buyerId: 0, buyerName: "N/A" })
        }
    }
    const handleBuyerDropDown = (e) => {
        const val = e.target.value
        const buyers = companyInfo?.buyers
        const { id, buyerName } = buyers?.find(buyer => buyer?.buyerName === val)
        setBuyerInfo({ buyerId: id, buyerName })
    }
    const productDropDown = (e) => {
        const selectedProduct = e.target.value
        const { id, fabricsName } = product?.find(prod => prod?.fabricsName === selectedProduct)
        setFabricsInfo({ fabricsId: id, fabricsName })
    }

    async function onSubmit(data) {
        const {companyId, companyName}=companyInfo
        const body = { companyId,companyName, ...buyerInfo, ...fabricsInfo, orderQuantity: parseFloat(quantity),restQuantity:parseFloat(quantity), targetDate: date, ...data }
        addOrder(body)
    }

    return (
        <div className="w-full my-4 flex flex-col shadow-md justify-center">
            <div className="grid grid-cols-2 gap-6 mx-6 ">
                <InputDropDown
                    label={'Company'}
                    divclass={'my-2'}
                    handleInputDropdown={handleInputDropdown}
                    className={`py-3 px-4 pe-9 block w-full bg-gray-50 border rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600 `}
                    options={companyNames}
                    sectionName={'companyName'}
                    placeholder={'Select your Company'}
                    required
                />
                <InputDropDown
                    label={'Buyer'}
                    divclass={'my-2'}
                    handleInputDropdown={(e) => handleBuyerDropDown(e)}
                    className={`py-3 px-4 pe-9 block w-full bg-gray-50 border rounded-lg text-sm  disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600 `}
                    options={buyers}
                    sectionName={'Buyer Name'}
                    placeholder={'Select your Buyer'}
                    required
                />
                <InputDropDown
                    label={'Fabrics Type'}
                    divclass={'my-2'}
                    handleInputDropdown={productDropDown}
                    className={`py-3 px-4 pe-9 block w-full bg-gray-50 border rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600 `}
                    options={products}
                    sectionName={'fabricsName'}
                    placeholder={'Select your Fabrics Type'}
                    required
                />
                <div className="my-2">
                    <Popover>
                        <PopoverTrigger asChild className="w-full px-2" >
                            <div className="">
                                <Label >Target Date </Label>
                                <Input type="text" placeholder="DD/MM/YYYY" className="w-full" value={date} />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border w-full"
                            />

                        </PopoverContent>
                    </Popover>
                </div>

                <div className="my-2">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="Quantity">Quantity (KG)</Label>
                        <Input type="number" id="Quantity" placeholder="Quantity"  onWheel={() => document.activeElement.blur()} onChange={(e) => setQuantity(e.target.value)} />
                    </div>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full  rounded-xl hover:shadow-xl ">
                    <div className="grid grid-cols-2 gap-6 p-6">
                    {
                        info.map(item => {
                            const { name, header, placeholder, id, type } = item
                            return (
                                <FormField
                                    key={id}
                                    control={form.control}
                                    name={name}

                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{header}</FormLabel>
                                            <FormControl>

                                                <Input placeholder={placeholder} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )
                        })
                    }
                    </div>
                    <div className="flex justify-center my-4">

                    <Button type="submit" className="mx-auto p-auto">{insertingOrderLoading?"Inserting Order":"Insert Order"}</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
