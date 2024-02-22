"use client"
import react from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
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
import { Button } from "../../../ui/button";
import { useForm } from "react-hook-form";
import { useAddBuyerMutation } from '@/lib/features/company/companyApi';
import { DialogClose } from '@radix-ui/react-dialog';
const FormSchema = z.object({
  buyer: z.string().min(2, {
    message: "Company Name must be at least 2 characters.",
  }),

})
const info = [
  {
    id: 21,
    name: 'buyer',
    header: "Buyer",
    placeholder: "Buyer...",
    type: "String"
  },
]
const BuyerModal = ({ defaultValues }) => {
  const [addBuyer, { isLoading, isError }] = useAddBuyerMutation()
  const { id } = defaultValues
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      buyer: ""
    },
  })
  async function onSubmit(data) {
    const { buyer } = data
    const body = { companyId: id, buyerName: buyer }
    addBuyer(body)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full shadow-md px-8 py-8 rounded-xl hover:shadow-xl space-y-6">
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
        <DialogClose asChild>
          <Button type="submit" className="">Submit</Button>

        </DialogClose>
      </form>
    </Form>
  )
};
export default BuyerModal;