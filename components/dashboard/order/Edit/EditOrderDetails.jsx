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
import { toast } from "@/components/ui/use-toast"
import { useAddOrderDetailsMutation, useEditOrderDetailsMutation } from "@/lib/features/orderDetailis/orderDetailsApi"
import { motion } from "framer-motion"
import { 
    Dna, 
    Pipette, 
    Settings, 
    Maximize, 
    Scale, 
    Scissors, 
    Palette, 
    Type, 
    Send,
    CircleDot,
    Cpu,
    Microscope
} from "lucide-react"
import { useEffect } from "react"

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

export function EditOrderDetails({ orderId, details }) {
  const [editOrderDetails, { isLoading, isError, isSuccess }] = useEditOrderDetailsMutation()
  
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      style: details?.style || "",
      colour: details?.colour || "",
      yarnCount: details?.yarnCount || "",
      yarnBrand: details?.yarnBrand || "",
      yarnLot: details?.yarnLot || "",
      lycraCount: details?.lycraCount || "",
      lycraBrand: details?.lycraBrand || "",
      lycraLot: details?.lycraLot || "",
      polyStarCount: details?.polyStarCount || "",
      polyStarBrand: details?.polyStarBrand || "",
      polyStarLot: details?.polyStarLot || "",
      e_DIA: details?.e_DIA || "",
      mc_DIA: details?.mc_DIA || "",
      f_GSM: details?.f_GSM || "",
      sl: details?.sl || ""
    },
  })

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Details Updated",
        description: "Order specification details have been saved.",
        className: "bg-emerald-600 text-white border-none",
      })
    }
    if (isError) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Failed to update order details. Please try again.",
      })
    }
  }, [isSuccess, isError])

  async function onSubmit(data) {
    const body = { orderId: parseInt(orderId), ...data }
    editOrderDetails({ id: details?.id, body })
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* Card 1: Material Composition (Yarn, Lycra, Poly) */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="xl:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden"
            >
              <div className="px-6 py-4 bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <Dna className="w-5 h-5 text-emerald-500" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Material Composition</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                  {/* Yarn Section */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Yarn
                    </h4>
                    {['yarnCount', 'yarnBrand', 'yarnLot'].map(name => (
                      <FormField
                        key={name}
                        control={form.control}
                        name={name}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-xs text-gray-500">
                              <Pipette className="w-3.5 h-3.5" /> {name.replace('yarn', 'Yarn ')}
                            </FormLabel>
                            <FormControl>
                              <Input className="h-10 rounded-lg border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>

                  {/* Lycra Section */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400" /> Lycra
                    </h4>
                    {['lycraCount', 'lycraBrand', 'lycraLot'].map(name => (
                      <FormField
                        key={name}
                        control={form.control}
                        name={name}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-xs text-gray-500">
                              <Pipette className="w-3.5 h-3.5" /> {name.replace('lycra', 'Lycra ')}
                            </FormLabel>
                            <FormControl>
                              <Input className="h-10 rounded-lg border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>

                  {/* Polyester Section */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Polyester
                    </h4>
                    {['polyStarCount', 'polyStarBrand', 'polyStarLot'].map(name => (
                      <FormField
                        key={name}
                        control={form.control}
                        name={name}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-xs text-gray-500">
                              <Pipette className="w-3.5 h-3.5" /> {name.replace('polyStar', 'Poly ')}
                            </FormLabel>
                            <FormControl>
                              <Input className="h-10 rounded-lg border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Fabric & Machine Specs */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden"
            >
              <div className="px-6 py-4 bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <Settings className="w-5 h-5 text-emerald-500" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Machine & Fabric</h3>
              </div>
              <div className="p-6 grid grid-cols-1 gap-6">
                {[
                  { name: 'mc_DIA', header: 'Machine DIA', icon: Cpu },
                  { name: 'e_DIA', header: 'Fabric DIA', icon: Maximize },
                  { name: 'f_GSM', header: 'Fabric GSM', icon: Scale },
                  { name: 'sl', header: 'Stitch Length', icon: Scissors },
                ].map(field => (
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

            {/* Card 3: Attributes (Style & Color) */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="xl:col-span-3 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden"
            >
              <div className="px-6 py-4 bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <Microscope className="w-5 h-5 text-emerald-500" />
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">Visual Attributes</h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {['style', 'colour'].map(name => (
                  <FormField
                    key={name}
                    control={form.control}
                    name={name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 mb-1.5 capitalize">
                          {name === 'style' ? <Type className="w-4 h-4" /> : <Palette className="w-4 h-4" />} {name}
                        </FormLabel>
                        <FormControl>
                          <Input className="h-12 text-lg font-medium rounded-xl border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20 bg-gray-50/30 dark:bg-gray-800/20" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          <div className="flex justify-center pt-4 pb-12">
            <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 h-12 rounded-xl text-lg font-medium shadow-xl shadow-emerald-200 dark:shadow-none transition-all active:scale-95 flex items-center gap-3"
            >
              {isLoading ? (
                <>
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <CircleDot className="w-5 h-5" />
                  </motion.div>
                  Applying Changes...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Update Specifications
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
