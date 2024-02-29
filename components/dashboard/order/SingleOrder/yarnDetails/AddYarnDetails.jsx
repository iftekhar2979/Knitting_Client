"use client"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { number, z } from "zod"

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
import { Input } from "@/components/ui/input"
import { useAddCompanyMutation, useGetCompanyQuery } from "@/lib/features/company/companyApi"
import { toast, useToast } from "@/components/ui/use-toast"
import InputDropDown from "@/components/utils/InputDropDown"
import { useState } from "react"
import { useAddYarnDetailsMutation } from "@/lib/features/yarnDetails/yarnDetailsApi"
const FormSchema = z.object({

    bookingQuantity: z.string(),
    yarn: z.string().min(2, {
        message: "Contact Number must be at least 2 characters.",
    })
})

const info = [
    {
        id: 221,
        name: 'bookingQuantity',
        header: "Booking Quantity",
        placeholder: "Booking Quantity...",
        type: "number"
    },
    {
        id: 222,
        name: 'yarn',
        header: "Yarn",
        placeholder: "Yarn...",
        type: "text"
    },

]

const AddYarnDetails = ({ id }) => {
    const { data, isLoading, error, isError } = useGetCompanyQuery()
    const [addYarnDetails] = useAddYarnDetailsMutation()
    const [companyInfo, setCompanyInfo] = useState()
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            bookingQuantity: 0,
            yarn: "",
        },
    })
console.log(form)
    const companyNames = data?.map(item => item.companyName)
    const handleInputDropdown = (e) => {
        const val = e.target.value
        const findCompanyLocation = data?.find((item, index) => {
            return item?.companyName === val
        })
        const { id, companyName } = findCompanyLocation
        setCompanyInfo({ companyId: id, companyName })

    }
    async function onSubmit(data) {
        const { companyId } = companyInfo
        const { bookingQuantity, yarn } = data
        const body = { companyId, bookingQuantity: parseFloat(bookingQuantity), orderId: parseFloat(id), restQuantity: parseFloat(bookingQuantity), yarn }
        addYarnDetails(body)
        form.reset()
        setCompanyInfo({})
    }
    return (
        <div className="w-full my-4">
            <div className="w-2/3 px-8 m-auto py-8 rounded-xl hover:shadow-xl space-y-6 shadow-md ">
                <h1 className="text-center text-2xl ">Add New Yarn Details For This Order</h1>
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
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="">
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
                                                    <Input placeholder={placeholder} type={type} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )
                            })
                        }
                        <Button type="submit" className="my-4 mx-auto">Submit</Button>
                    </form>
                </Form>
            </div>
 

        </div>
    )
};
export default AddYarnDetails;