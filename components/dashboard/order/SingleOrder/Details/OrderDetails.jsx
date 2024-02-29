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
import { useAddCompanyMutation } from "@/lib/features/company/companyApi"
import { toast, useToast } from "@/components/ui/use-toast"
import { useAddOrderDetailsMutation } from "@/lib/features/orderDetailis/orderDetailsApi"

const FormSchema = z.object({
  style: z.string(),
  colour: z.string(),
  yarnCount: z.string(),
  yarnBrand: z.string(),
  yarnLot: z.string(),
  lycraCount: z.string(),
  lycraBrand: z.string(),
  lycraLot: z.string(),
  polyStarCount: z.string(),
  polyStarBrand: z.string(),
  polyStarLot: z.string(),
  mc_DIA: z.string(),
  e_DIA: z.string(),
  f_GSM: z.string(),
  sl: z.string()
})

const info = [
  {
    id: 201,
    name: 'style',
    header: "Style",
    placeholder: "Style...",
    type: "String"
  },
  {
    id: 214,
    name: 'colour',
    header: "Color",
    placeholder: "Color...",
    type: "String"
  },
  {
    id: 202,
    name: 'yarnCount',
    header: "Yarn Count",
    placeholder: "Yarn Count...",
    type: "String"
  },
  {
    id: 203,
    name: 'yarnBrand',
    header: "Yarn Brand",
    placeholder: "Yarn Barnd...",
    type: "String"
  },
  {
    id: 215,
    name: 'yarnLot',
    header: "Yarn Lot",
    placeholder: "Yarn Lot...",
    type: "String"
  },
  {
    id: 204,
    name: 'lycraCount',
    header: "Lycra Count",
    placeholder: "Lycra Count...",
    type: "String"
  },
  {
    id: 205,
    name: 'lycraBrand',
    header: "Lycra Brand",
    placeholder: "Lycra Brand...",
    type: "String"
  },
  {
    id: 206,
    name: 'lycraLot',
    header: "Lycra Lot",
    placeholder: "Lycra Lot...",
    type: "String"
  },
  {
    id: 207,
    name: 'polyStarCount',
    header: "Poly Star Count",
    placeholder: "Poly Star Count...",
    type: "String"
  },
  {
    id: 208,
    name: 'polyStarBrand',
    header: "Poly Star Brand",
    placeholder: "Poly Star Brand...",
    type: "String"
  },
  {
    id: 209,
    name: 'polyStarLot',
    header: "Poly Star Lot",
    placeholder: "Poly Star Lot...",
    type: "String"
  },
  {
    id: 210,
    name: 'e_DIA',
    header: "E DIA",
    placeholder: "E DIA...",
    type: "String"
  },
  {
    id: 211,
    name: 'mc_DIA',
    header: "MECHINE DIA",
    placeholder: "MECHINE DIA...",
    type: "String"
  },
  {
    id: 212,
    name: 'f_GSM',
    header: "F GSM",
    placeholder: "F GSM...",
    type: "String"
  },
  {
    id: 213,
    name: 'sl',
    header: "Serial Number",
    placeholder: "Serial Number...",
    type: "String"
  },

]

export function OrderDetails({id}) {
console.log(id)
  const [addOrderDetails,{isLoading,isError,error}]=useAddOrderDetailsMutation(id)
  

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      style: "",
      colour: "",
      yarnCount: "",
      yarnBrand: "",
      yarnLot: "",
      lycraCount: "",
      lycraBrand: "",
      lycraLot: "",
      polyStarCount: "",
      polyStarBrand: "",
      polyStarLot: "",
      e_DIA: "",
      mc_DIA: "",
      f_GSM: "",
      sl: ""

    },
  })

  async function onSubmit(data) {
const body={orderId:parseInt(id),...data}

   addOrderDetails(body)
  }

  return (
    <div className="w-full my-4 flex justify-center">
      <Form {...form}>

        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full shadow-md px-8 rounded-xl hover:shadow-xl space-y-6">
          <div className="grid grid-cols-2 gap-4">
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
            <Button type="submit" className="my-4">Submit</Button>

          </div>
        </form>
      </Form>
    </div>
  )
}
