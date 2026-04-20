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
import { useToast } from "@/components/ui/use-toast"
import Error from "@/components/utils/Error"
import { useAddCompanyMutation } from "@/lib/features/company/companyApi"
import { useEffect } from "react"

import { Building2, Mail, MapPin, Phone, Hash, Plus, Loader2 } from "lucide-react"

const FormSchema = z.object({
  companyName: z.string().min(2, {
    message: "Company Name must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  location: z.string().min(3, {
    message: "Location must be at least 3 characters.",
  }),
  contact: z.string().min(10, {
    message: "Contact Number must be at least 10 characters.",
  }),
  shortForm: z.string().max(7, {
    message: "Short Form must not exceed 7 characters.",
  })
})

export function AddCompany() {
  const [addCompany, { isLoading, isError, isSuccess, error }] = useAddCompanyMutation()
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      companyName: "",
      email: "",
      location: "",
      contact: "",
      shortForm: ""
    },
  })

  async function onSubmit(data) {
    addCompany(data)
  }

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Company Registered",
        description: "The new company has been successfully added to the system.",
        variant: "success",
      })
      form.reset()
    }
    if (isError) {
      toast({
        title: "Registration Failed",
        description: "There was an error adding the company. Please try again.",
        variant: "destructive",
      })
    }
  }, [isSuccess, isError, form, toast])

  return (
    <div className="w-full py-8 flex justify-center px-4">  
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <div className="p-2 bg-brand-green/10 rounded-lg">
              <Building2 className="w-6 h-6 text-brand-green" />
            </div>
            Register New Company
          </h2>
          <p className="mt-1 text-sm text-gray-500 ml-11">
            Fill in the details below to add a new company to your partner network.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Name - Full Width */}
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">Company Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input 
                            placeholder="e.g. Tertiary Textiles Ltd." 
                            className="pl-10 border-gray-200 focus:border-brand-green focus:ring-brand-green transition-all"
                            {...field} 
                          />
                        </div>
                      </FormControl>  
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email */}
              <div className="md:col-span-1">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">Email Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input 
                            placeholder="contact@company.com" 
                            className="pl-10 border-gray-200 focus:border-brand-green focus:ring-brand-green transition-all"
                            {...field} 
                          />
                        </div>
                      </FormControl>  
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Contact */}
              <div className="md:col-span-1">
                <FormField
                  control={form.control}
                  name="contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">Contact Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input 
                            placeholder="+880 1XXX-XXXXXX" 
                            className="pl-10 border-gray-200 focus:border-brand-green focus:ring-brand-green transition-all"
                            {...field} 
                          />
                        </div>
                      </FormControl>  
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Location */}
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">Business Location</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                          <textarea 
                            placeholder="Full address of the company..." 
                            className="flex min-h-[80px] w-full rounded-md border border-gray-200 bg-white px-10 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                            {...field} 
                          />
                        </div>
                      </FormControl>  
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Short Form */}
              <div className="md:col-span-1">
                <FormField
                  control={form.control}
                  name="shortForm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-semibold">Short Form (ID)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input 
                            placeholder="e.g. TTL" 
                            className="pl-10 border-gray-200 focus:border-brand-green focus:ring-brand-green transition-all uppercase"
                            {...field} 
                          />
                        </div>
                      </FormControl>  
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {isError && <Error data={error?.data} />}

            <div className="pt-4">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-brand-green hover:bg-brand-accent text-white font-bold py-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Registering Company...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Add Company
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
