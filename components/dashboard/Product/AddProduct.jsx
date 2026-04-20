"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useAddProductMutation } from '@/lib/features/Product/productApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Package, AlignLeft, Plus, Loader2 } from 'lucide-react';

const FormSchema = z.object({
    fabricsName: z.string().min(2, {
      message: "Fabrics Name must be at least 2 characters.",
    }),
    description:z.string().min(1, "Description is required"),
  })
  
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

    useEffect(() => {
      if (isSuccess) {
        toast({
          title: "Product Added",
          description: "The fabric type has been successfully added to inventory.",
          variant: "success",
        })
        form.reset()
      }
      if (isError) {
        toast({
          title: "Submission Failed",
          description: "There was an error adding the product. Please try again.",
          variant: "destructive",
        })
      }
    }, [isSuccess, isError, form, toast])

    return (
        <section className='w-full'>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                        <Plus className="w-5 h-5 text-brand-green" />
                        Add New Fabric
                    </h2>
                </div>
                
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-5">
                        <FormField
                            control={form.control}
                            name="fabricsName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 font-medium">Fabric Name</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <Input 
                                                placeholder="e.g. Cotton Jersey" 
                                                className="pl-10 border-gray-200 focus:border-brand-green focus:ring-brand-green transition-all"
                                                {...field} 
                                            />
                                        </div>
                                    </FormControl>  
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 font-medium">Description</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <AlignLeft className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                            <textarea 
                                                placeholder="Describe the fabric..." 
                                                className="flex min-h-[100px] w-full rounded-md border border-gray-200 bg-white px-10 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                                                {...field} 
                                            />
                                        </div>
                                    </FormControl>  
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full bg-brand-green hover:bg-brand-accent text-white font-semibold py-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Plus className="w-5 h-5" />
                                    Add Fabric Type
                                </>
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </section>
    )
};
export default AddProduct;