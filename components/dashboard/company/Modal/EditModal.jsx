"use client"
import react from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import {z} from 'zod'
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
import {  useForm } from "react-hook-form";
import { useEditCompanyMutation } from '@/lib/features/company/companyApi';


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
const EditModal = ({defaultValues}) => {
  const [editCompany]=useEditCompanyMutation()
    const {companyName,location,contact,email,id}=defaultValues
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          companyName: companyName,
          email:email,
          location:location,
          contact:contact
    
        },
      })
     

    async function onSubmit(data) {
      editCompany({id:id,body:data})
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
            <Button type="submit" className="">Submit</Button>
        </form>
    </Form>
    )
};
export default EditModal;