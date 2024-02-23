"use client"
import { FormControl, FormField, FormItem, FormLabel, FormMessage,Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useAddProductMutation } from '@/lib/features/Product/productApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Button } from '@/components/ui/button';

const FormSchema = z.object({
    fabricsName: z.string().min(2, {
      message: "Fabrics Name must be at least 2 characters.",
    }),
    description:z.string().min(3,{message:"Description Not Valid"}),
  })
  
  const info=[
    {
      id:31,
      name:'fabricsName',
      header:"Fabrics Name",
      placeholder:"Fabrics Name...",
      type:"String"
    },
    {
      id:32,
      name:'description',
      header:"Description",
      placeholder:"Description...",
      type:"String"
    },
  ]
const AddProduct = (props) => {
    const [addProduct,{isLoading,isError,isSuccess}]=useAddProductMutation()
    const { toast } = useToast()
    const form = useForm({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        fabricsName: "",
        description:"",
      
      },
    })
  
    async function onSubmit(data) {
      addProduct(data)
    }
  
    return (
        <section className='my-4 w-full lg:w-1/2  md:w-full'>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full  shadow-md px-8 py-8 rounded-xl hover:shadow-xl space-y-6">
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
    </section>
    )
};
export default AddProduct;