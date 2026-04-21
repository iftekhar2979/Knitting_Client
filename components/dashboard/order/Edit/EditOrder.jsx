"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { toast } from "@/components/ui/use-toast"
import Error from "@/components/utils/Error"
import InputDropDown from "@/components/utils/InputDropDown"
import { useGetCompanyQuery } from "@/lib/features/company/companyApi"
import { useEditOrderMutation } from "@/lib/features/order/orderApi"
import { useGetProductQuery } from "@/lib/features/Product/productApi"
import { useState, useEffect } from "react"
import { EditOrderDetails } from "./EditOrderDetails"
import { motion, AnimatePresence } from "framer-motion"
import { 
    Settings2, 
    Hash, 
    Calendar, 
    Layers, 
    ClipboardCheck, 
    Activity, 
    Tags, 
    Send, 
    Package,
    Building2,
    User,
    Shirt,
    Target
} from "lucide-react"

const FormSchema = z.object({
    orderNumber: z.string().min(5, {
        message: "Order Number must be at least 5 characters"
    }),
    programNumber: z.string(),
    jobNumber: z.string(),
    bookingNumber: z.string(),
    sbNumber: z.string(),
    season: z.string(),
    status: z.string()
})

const EditOrder = ({ id, data: orderInfo }) => {
    const { data: companyInformation, isLoading, error, isError } = useGetCompanyQuery()
    const { company, details } = orderInfo
    const [editOrder, { isLoading: editOrderLoading, isError: editOrderError, isSuccess: editOrderSuccess }] = useEditOrderMutation()
    const { data: product, isLoading: productLoading, error: productError, isError: productIsError } = useGetProductQuery()
    const [companyInfo, setCompanyInfo] = useState({ companyId: orderInfo?.company?.id, companyName: orderInfo?.company?.companyName })
    const [buyerInfo, setBuyerInfo] = useState({ buyerId: orderInfo?.buyer?.id, buyerName: orderInfo?.buyer?.buyerName })
    const [fabricsInfo, setFabricsInfo] = useState({ fabricsId: orderInfo?.fabricsId, fabricsName: orderInfo?.fabricsName })
    const [buyers, setBuyers] = useState(orderInfo?.company?.buyers?.map(item => item.buyerName) || [])
    const [date, setDate] = useState(orderInfo?.targetDate ? new Date(orderInfo.targetDate).toISOString().split('T')[0] : "")
    const [quantity, setQuantity] = useState(orderInfo?.orderQuantity || 0)
    
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            orderNumber: orderInfo?.orderNumber,
            sbNumber: orderInfo?.sbNumber,
            bookingNumber: orderInfo?.bookingNumber,
            programNumber: orderInfo?.programNumber,
            jobNumber: orderInfo?.jobNumber,
            season: orderInfo?.season,
            targetDate: orderInfo?.targetDate,
            fabricsType: orderInfo?.fabricsType,
            status: orderInfo?.status,
        },
    })

    const companyNames = companyInformation?.map(item => item.companyName)
    const products = product?.map(item => item.fabricsName)

    const handleInputDropdown = (e) => {
        const val = e.target.value
        const findCompanyLocation = companyInformation?.find((item) => item?.companyName === val)
        if (findCompanyLocation) {
            const { id, companyName, buyers } = findCompanyLocation
            setCompanyInfo({ companyId: id, companyName, buyers })
            setBuyers(buyers?.map(item => item.buyerName))
            if (buyers && buyers.length > 0) {
                const { id: buyerId, buyerName } = buyers[0]
                setBuyerInfo({ buyerId, buyerName })
            } else {
                setBuyerInfo({ buyerId: 0, buyerName: "N/A" })
            }
        }
    }

    const handleBuyerDropDown = (e) => {
        const val = e.target.value
        const buyersList = companyInfo?.buyers || companyInformation?.find(c => c.id === companyInfo.companyId)?.buyers
        const selectedBuyer = buyersList?.find(buyer => buyer?.buyerName === val)
        if (selectedBuyer) {
            setBuyerInfo({ buyerId: selectedBuyer.id, buyerName: selectedBuyer.buyerName })
        }
    }

    const productDropDown = (e) => {
        const selectedProduct = e.target.value
        const prod = product?.find(p => p?.fabricsName === selectedProduct)
        if (prod) {
            setFabricsInfo({ fabricsId: prod.id, fabricsName: prod.fabricsName })
        }
    }

    async function onSubmit(data) {
        const { companyId, companyName } = companyInfo
        let oldQty = orderInfo.orderQuantity
        let newQty = parseFloat(quantity)
        let newRestQty = orderInfo.restQuantity
        if (oldQty < newQty) {
            newRestQty += newQty - oldQty
        } else {
            newRestQty -= oldQty - newQty
        }
        const body = { 
            companyId, 
            companyName, 
            ...buyerInfo, 
            ...fabricsInfo, 
            orderQuantity: parseFloat(quantity), 
            restQuantity: newRestQty, 
            targetDate: date ? new Date(date) : undefined, 
            ...data 
        }
        editOrder({ id, body })
    }

    useEffect(() => {
        if (editOrderSuccess) {
            toast({
                title: "Order Updated",
                description: "The order has been successfully modified.",
                className: "bg-emerald-600 text-white border-none",
            })
        }
        if (editOrderError) {
            toast({
                variant: "destructive",
                title: "Update Failed",
                description: "There was an error updating the order.",
            })
        }
    }, [editOrderSuccess, editOrderError])

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { staggerChildren: 0.1 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    }

    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="w-full max-w-7xl mx-auto space-y-8 py-6"
        >
            {/* Phase 1: Core Configuration Card */}
            <motion.div variants={itemVariants} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="px-6 py-4 bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                    <Settings2 className="w-5 h-5 text-emerald-500" />
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Primary Configuration</h3>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <InputDropDown
                        label={<div className="flex items-center gap-2 mb-1.5"><Building2 className="w-4 h-4" /> Company</div>}
                        handleInputDropdown={handleInputDropdown}
                        className="h-11 rounded-xl focus:ring-emerald-500/20"
                        options={companyNames}
                        sectionName={'companyName'}
                        placeholder={companyInfo.companyName || 'Select Company'}
                        required
                    />
                    <InputDropDown
                        label={<div className="flex items-center gap-2 mb-1.5"><User className="w-4 h-4" /> Buyer</div>}
                        handleInputDropdown={handleBuyerDropDown}
                        className="h-11 rounded-xl focus:ring-emerald-500/20"
                        options={buyers}
                        sectionName={'Buyer Name'}
                        placeholder={buyerInfo.buyerName || 'Select Buyer'}
                        required
                    />
                    <InputDropDown
                        label={<div className="flex items-center gap-2 mb-1.5"><Shirt className="w-4 h-4" /> Fabrics Type</div>}
                        handleInputDropdown={productDropDown}
                        className="h-11 rounded-xl focus:ring-emerald-500/20"
                        options={products}
                        sectionName={'fabricsName'}
                        placeholder={fabricsInfo.fabricsName || 'Select Fabrics'}
                        required
                    />
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2 mb-1.5"><Target className="w-4 h-4" /> Target Date</Label>
                        <Input 
                            type="date" 
                            className="h-11 rounded-xl border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20" 
                            value={date} 
                            onChange={(e) => setDate(e.target.value)} 
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2 mb-1.5"><Package className="w-4 h-4" /> Quantity (KG)</Label>
                        <Input 
                            type="number" 
                            className="h-11 rounded-xl border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20" 
                            placeholder="Enter Quantity" 
                            value={quantity} 
                            onChange={(e) => setQuantity(e.target.value)} 
                        />
                    </div>
                </div>
            </motion.div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Phase 2: Reference Information Card */}
                        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden h-full">
                            <div className="px-6 py-4 bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                                <ClipboardCheck className="w-5 h-5 text-emerald-500" />
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Reference Details</h3>
                            </div>
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { name: 'orderNumber', header: 'Order Number', icon: Hash },
                                    { name: 'season', header: 'Season', icon: Tags },
                                    { name: 'bookingNumber', header: 'Booking No', icon: ClipboardCheck },
                                    { name: 'sbNumber', header: 'SB No', icon: Target },
                                ].map((field) => (
                                    <FormField
                                        key={field.name}
                                        control={form.control}
                                        name={field.name}
                                        render={({ field: formField }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2 mb-1.5">
                                                    <field.icon className="w-4 h-4" /> {field.header}
                                                </FormLabel>
                                                <FormControl>
                                                    <Input className="h-11 rounded-xl border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20" {...formField} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </div>
                        </motion.div>

                        {/* Phase 3: Process & Status Card */}
                        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden h-full">
                            <div className="px-6 py-4 bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-emerald-500" />
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Process Tracking</h3>
                            </div>
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { name: 'programNumber', header: 'Program No', icon: Layers },
                                    { name: 'jobNumber', header: 'Job No', icon: Activity },
                                    { name: 'status', header: 'Status', icon: ClipboardCheck },
                                ].map((field) => (
                                    <FormField
                                        key={field.name}
                                        control={form.control}
                                        name={field.name}
                                        render={({ field: formField }) => (
                                            <FormItem className={field.name === 'status' ? 'md:col-span-2' : ''}>
                                                <FormLabel className="flex items-center gap-2 mb-1.5">
                                                    <field.icon className="w-4 h-4" /> {field.header}
                                                </FormLabel>
                                                <FormControl>
                                                    <Input className="h-11 rounded-xl border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20" {...formField} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Action Section */}
                    <motion.div variants={itemVariants} className="flex flex-col items-center gap-4">
                        <Button 
                            type="submit" 
                            disabled={editOrderLoading}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 h-12 rounded-xl text-lg font-medium shadow-lg shadow-emerald-200 dark:shadow-none transition-all active:scale-95 flex items-center gap-2"
                        >
                            {editOrderLoading ? (
                                <>
                                    <motion.div 
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    >
                                        <Activity className="w-5 h-5" />
                                    </motion.div>
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Update Order
                                </>
                            )}
                        </Button>
                        {editOrderError && <p className="text-red-500 text-sm font-medium flex items-center gap-2"><Activity className="w-4 h-4" /> Failed to update order. Please try again.</p>}
                    </motion.div>
                </form>
            </Form>

            <motion.div variants={itemVariants} className="pt-8">
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-serif flex items-center gap-2 tracking-tight">
                        <Settings2 className="w-6 h-6 text-emerald-500" />
                        Detailed Specifications
                    </h2>
                    <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
                </div>
                <EditOrderDetails orderId={id} details={details} />
            </motion.div>
        </motion.div>
    )
}
export default EditOrder