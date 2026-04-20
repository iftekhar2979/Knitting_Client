"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { motion } from "framer-motion"
import { 
    HiOutlineOfficeBuilding, 
    HiOutlineUser, 
    HiOutlineCube, 
    HiOutlineCalendar, 
    HiOutlineScale,
    HiOutlineClipboardList,
    HiOutlineArrowRight,
    HiOutlineInformationCircle
} from "react-icons/hi"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useGetCompanyQuery } from "@/lib/features/company/companyApi"
import { useAddOrderMutation } from "@/lib/features/order/orderApi"
import InputDropDown from "@/components/utils/InputDropDown"
import { useState } from "react"
import { useGetProductQuery } from "@/lib/features/Product/productApi"
import { Label } from "@/components/ui/label"
import Error from "@/components/utils/Error"
import Radio from "@/components/ui/Radio"
import { useAppSelector } from '@/lib/hooks';
import Swal from "sweetalert2"

const FormSchema = z.object({
    orderNumber: z.string().min(5, {
        message: "Order Number must be at least 5 characters"
    }),
    sbNumber: z.string().optional(),
    bookingNumber: z.string().optional(),
    jobNumber: z.string().optional(),
    programNumber: z.string().optional(),
    season: z.string().optional(),
    status: z.string().default("Ordered")
})

const infoFields = [
    { id: 102, name: 'orderNumber', header: "Order Number", placeholder: "e.g. ORD-2024-001", icon: <HiOutlineInformationCircle className="text-emerald-500" /> },
    { id: 105, name: 'season', header: "Season", placeholder: "e.g. Summer 2024", icon: <HiOutlineCalendar className="text-emerald-500" /> },
    { id: 106, name: 'programNumber', header: "Program No", placeholder: "e.g. PRG-99", icon: <HiOutlineClipboardList className="text-emerald-500" /> },
    { id: 107, name: 'jobNumber', header: "Job No", placeholder: "e.g. JOB-442", icon: <HiOutlineClipboardList className="text-emerald-500" /> },
    { id: 108, name: 'bookingNumber', header: "Booking No", placeholder: "e.g. BOK-887", icon: <HiOutlineClipboardList className="text-emerald-500" /> },
    { id: 109, name: 'sbNumber', header: "SB No", placeholder: "e.g. SB-112", icon: <HiOutlineClipboardList className="text-emerald-500" /> },
]

const units = ["Fabric", "Knitting"]

export function AddOrder() {
    const { data: companies, isLoading: companiesLoading } = useGetCompanyQuery()
    const [addOrder, { isLoading: insertingOrderLoading, isError: insertingOrderError }] = useAddOrderMutation()
    const { data: productsData, isLoading: productLoading } = useGetProductQuery()
    
    const [companyInfo, setCompanyInfo] = useState()
    const { userInfo } = useAppSelector((state) => state.user);
    const [buyerInfo, setBuyerInfo] = useState()
    const [unit, setUnit] = useState()
    const [fabricsInfo, setFabricsInfo] = useState()
    const [buyers, setBuyers] = useState()
    const [date, setDate] = useState("")
    const [quantity, setQuantity] = useState(0)

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            sbNumber: "",
            bookingNumber: "",
            jobNumber: "",
            programNumber: "",
            season: "",
            orderNumber: "",
            status: "Ordered"
        },
    })

    const companyNames = companies?.map(item => item.companyName)
    const products = productsData?.map(item => item.fabricsName)

    const handleInputDropdown = (e) => {
        const val = e.target.value
        const findCompany = companies?.find(item => item?.companyName === val)
        if (!findCompany) return

        const { id, companyName, buyers: companyBuyers } = findCompany
        setCompanyInfo({ companyId: id, companyName, buyers: companyBuyers })
        setBuyers(companyBuyers?.map(item => item.buyerName))
        
        if (companyBuyers && companyBuyers.length > 0) {
            const { id: buyerId, buyerName } = companyBuyers[0]
            setBuyerInfo({ buyerId, buyerName })
        } else {
            setBuyerInfo({ buyerId: 0, buyerName: "N/A" })
        }
    }

    const handleBuyerDropDown = (e) => {
        const val = e.target.value
        const buyer = companyInfo?.buyers?.find(b => b?.buyerName === val)
        if (buyer) {
            setBuyerInfo({ buyerId: buyer.id, buyerName: buyer.buyerName })
        }
    }

    const productDropDown = (e) => {
        const selectedProduct = e.target.value
        const prod = productsData?.find(p => p?.fabricsName === selectedProduct)
        if (prod) {
            setFabricsInfo({ fabricsId: prod.id, fabricsName: prod.fabricsName })
        }
    }

    const handleRadioChanges = (data) => {
        setUnit(data.item)
    }

    async function onSubmit(data) {
        if (!companyInfo) {
            Swal.fire({ title: 'Error!', text: 'Please select a company first', icon: 'error' })
            return
        }
        if (quantity <= 0) {
            Swal.fire({ title: 'Warning!', text: 'Booking quantity must be greater than zero', icon: 'warning' })
            return
        }
        
        const body = { 
            userId: userInfo?.data?.id, 
            companyId: companyInfo.companyId, 
            companyName: companyInfo.companyName, 
            ...buyerInfo, 
            ...fabricsInfo, 
            unit, 
            orderQuantity: parseFloat(quantity), 
            restQuantity: parseFloat(quantity), 
            targetDate: date ? new Date(date) : undefined, 
            ...data 
        }

        addOrder(body).then(res => {
            if (res.data) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Order created successfully!',
                    icon: 'success',
                    timer: 3000,
                    showConfirmButton: false
                })
                form.reset()
                setDate("")
                setQuantity(0)
            } else if (res.error) {
                Swal.fire({
                    title: 'Error!',
                    text: res.error.data?.message || 'Failed to create order!',
                    icon: 'error'
                })
            }
        })
    }

    const inputClasses = "h-11 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 transition-all duration-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 rounded-lg"
    const selectClasses = cn(inputClasses, "w-full appearance-none px-4")

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full space-y-8 pb-12"
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Client & Logistics */}
                <div className="lg:col-span-2 space-y-8">
                    <Card className="border-none shadow-sm bg-white dark:bg-gray-900/50">
                        <CardHeader className="border-b border-gray-50 dark:border-gray-800 pb-4">
                            <div className="flex items-center space-x-2">
                                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600">
                                    <HiOutlineOfficeBuilding size={20} />
                                </div>
                                <CardTitle className="text-xl font-bold">Client & Fabrication</CardTitle>
                            </div>
                            <CardDescription>Select the company and fabric specifications for this order.</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputDropDown
                                label={'Company Name'}
                                handleInputDropdown={handleInputDropdown}
                                className={selectClasses}
                                options={companyNames}
                                sectionName={'companyName'}
                                placeholder={'Select Company'}
                                required
                            />
                            <InputDropDown
                                label={'Buyer Name'}
                                handleInputDropdown={handleBuyerDropDown}
                                className={selectClasses}
                                options={buyers}
                                sectionName={'buyerName'}
                                placeholder={'Select Buyer'}
                                required
                            />
                            <InputDropDown
                                label={'Fabrics Type'}
                                handleInputDropdown={productDropDown}
                                className={selectClasses}
                                options={products}
                                sectionName={'fabricsName'}
                                placeholder={'Select Fabrics Type'}
                                required
                            />
                            <div className="space-y-2">
                                <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Unit Selection</Label>
                                <div className="p-1.5 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <Radio
                                        array={units}
                                        handleRadioChange={handleRadioChanges}
                                        selectedValue={unit}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm bg-white dark:bg-gray-900/50">
                        <CardHeader className="border-b border-gray-50 dark:border-gray-800 pb-4">
                            <div className="flex items-center space-x-2">
                                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600">
                                    <HiOutlineScale size={20} />
                                </div>
                                <CardTitle className="text-xl font-bold">Order Specifications</CardTitle>
                            </div>
                            <CardDescription>Define the delivery timeline and quantity requirements.</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="target-date" className="flex items-center space-x-1 underline decoration-emerald-200 underline-offset-4">
                                    <HiOutlineCalendar className="mr-1" /> Target Date
                                </Label>
                                <Input 
                                    id="target-date"
                                    type="date" 
                                    className={inputClasses}
                                    value={date} 
                                    onChange={(e) => setDate(e.target.value)} 
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="Quantity" className="flex items-center space-x-1 underline decoration-emerald-200 underline-offset-4">
                                    <HiOutlineScale className="mr-1" /> Quantity (KG)
                                </Label>
                                <Input 
                                    type="number" 
                                    id="Quantity" 
                                    placeholder="e.g. 1500" 
                                    className={inputClasses}
                                    onWheel={(e) => e.target.blur()} 
                                    onChange={(e) => setQuantity(e.target.value)} 
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Identity & Metadata */}
                <div>
                    <Card className="border-none shadow-sm bg-white dark:bg-gray-900/50 h-full">
                        <CardHeader className="border-b border-gray-50 dark:border-gray-800 pb-4">
                            <div className="flex items-center space-x-2">
                                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600">
                                    <HiOutlineClipboardList size={20} />
                                </div>
                                <CardTitle className="text-xl font-bold">Identity & Details</CardTitle>
                            </div>
                            <CardDescription>Core identifiers for tracking and organization.</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                                    {infoFields.map(item => (
                                        <FormField
                                            key={item.id}
                                            control={form.control}
                                            name={item.name}
                                            render={({ field }) => (
                                                <FormItem className="space-y-1.5">
                                                    <FormLabel className="font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                                                        {item.header}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input 
                                                            placeholder={item.placeholder} 
                                                            className={inputClasses}
                                                            {...field} 
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    ))}

                                    <div className="pt-6">
                                        <Button 
                                            type="submit" 
                                            disabled={insertingOrderLoading}
                                            className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-lg shadow-emerald-200 dark:shadow-none active:scale-95 flex items-center justify-center space-x-2"
                                        >
                                            {insertingOrderLoading ? (
                                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                                            ) : (
                                                <>
                                                    <span>Create New Order</span>
                                                    <HiOutlineArrowRight />
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </div>
            
            {insertingOrderError && (
                <div className="mt-4">
                    <Error error={"Order could not be created. Please verify all information and try again."} />
                </div>
            )}
        </motion.div>
    )
}


