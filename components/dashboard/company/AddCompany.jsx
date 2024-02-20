"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  companyName: z.string().min(2, {
    message: "Company Name must be at least 2 characters.",
  }),
  email:z.string().email({message:"Email Not Valid"}),
  location:z.string().min(3,{
    message: "Location must be at least 2 characters.",
  }),
  contact:z.number().min(10,{
    message: "Contact Number must be at least 10 characters.",
  })
})

const info=[
  {
    id:1,
    name:'companyName',
    header:"Company Name",
    placeholder:"Company Name..."
  },
  {
    id:2,
    name:'email',
    header:"Email",
    placeholder:"email..."
  },
  {
    id:3,
    name:'location',
    header:"Location",
    placeholder:"location..."
  },
  {
    id:4,
    name:'contact',
    header:"Contact",
    placeholder:"Contact..."
  },
]
export function AddCompany() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      companyName: "",
      email:"",
      location:"",
      contact:""

    },
  })

  function onSubmit(data) {
    console.log(data)
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <div className="w-full my-4 flex justify-center">  
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 border space-y-6">
        {
          info.map(item=>{
            const {name,header,placeholder,id}=item
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
        <Button type="submit" className="">Submit</Button>
      </form>
    </Form>
    </div>
  )
}
