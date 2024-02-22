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

const FormSchema = z.object({
  companyName: z.string().min(2, {
    message: "Company Name must be at least 2 characters.",
  }),
  email:z.string().email({message:"Email Not Valid"}),
  location:z.string().min(3,{
    message: "Location must be at least 2 characters.",
  }),
  contact:z.string().min(10,{
    message: "Contact Number must be at least 10 characters.",
  })
})

const info=[
  {
    id:1,
    name:'companyName',
    header:"Company Name",
    placeholder:"Company Name...",
    type:"String"
  },
  {
    id:2,
    name:'email',
    header:"Email",
    placeholder:"Email...",
    type:"String"
  },
  {
    id:3,
    name:'location',
    header:"Location",
    placeholder:"Location...",
    type:"String"
  },
  {
    id:4,
    name:'contact',
    header:"Contact",
    placeholder:"Contact...",
    type:"Number"
  },
]

export function AddCompany() {
  const [addCompany,{isLoading,isError,isSuccess}]=useAddCompanyMutation()
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      companyName: "",
      email:"",
      location:"",
      contact:""
    },
  })

  async function onSubmit(data) {
    addCompany(data)
    if(isSuccess){
      toast({
        title: "Added Company Succesfully",
      })
    }
  }

  return (
    <div className="w-full my-4 flex justify-center">  
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/2 shadow-md px-8 py-8 rounded-xl hover:shadow-xl space-y-6">
        {
          info.map(item=>{
            const {name,header,placeholder,id,type}=item
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
        <Button type="submit" className="">{isLoading ? "Submitting" :"Submit"}</Button>
      </form>
    </Form>
    </div>
  )
}
