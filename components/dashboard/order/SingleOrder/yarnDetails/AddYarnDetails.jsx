"use client"


import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGetCompanyQuery } from "@/lib/features/company/companyApi";
import { useState } from "react";
import { useAddYarnDetailsMutation } from "@/lib/features/yarnDetails/yarnDetailsApi";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FaPlusCircle, FaBuilding, FaWeightHanging, FaBoxOpen, FaAlignLeft, FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";

const FormSchema = z.object({
    bookingQuantity: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
        message: "Quantity must be a positive number.",
    }),
    yarn: z.string().min(2, {
        message: "Yarn type must be at least 2 characters.",
    }),
    companyId: z.string().min(1, {
        message: "Please select a company.",
    })
});

const AddYarnDetails = ({ id }) => {
    const { data: companies, isLoading: companiesLoading } = useGetCompanyQuery();
    const [addYarnDetails, { isLoading: isSubmitting }] = useAddYarnDetailsMutation();
    const [descriptionOfYarn, setDescriptionOfYarn] = useState("");

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            bookingQuantity: "",
            yarn: "",
            companyId: "",
        },
    });

    async function onSubmit(data) {
        const body = {
            companyId: parseInt(data.companyId),
            ReceivingQuantity: parseFloat(data.bookingQuantity),
            descriptionOfYarn,
            orderId: parseFloat(id),
            restQuantity: parseFloat(data.bookingQuantity),
            yarnType: data.yarn
        };

        try {
            await addYarnDetails(body).unwrap();
            Swal.fire({
                title: 'Success!',
                text: 'New yarn receipt added to order.',
                icon: 'success',
                confirmButtonColor: '#0A3228'
            });
            form.reset();
            setDescriptionOfYarn("");
        } catch (err) {
            Swal.fire({
                title: 'Error',
                text: err.data?.message || 'Failed to add yarn details.',
                icon: 'error'
            });
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto my-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="shadow-2xl border-none ring-1 ring-slate-200 overflow-hidden bg-white/80 backdrop-blur-md">
                <CardHeader className="bg-slate-50/50 border-b pb-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-brand-green text-white rounded-2xl shadow-lg shadow-brand-green/20">
                            <FaPlusCircle size={24} />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-black text-slate-800">Add Yarn Receipt</CardTitle>
                            <CardDescription>Log new yarn arrivals for Order #{id}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-10">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <FormField
                                    control={form.control}
                                    name="companyId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Supplier Company</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="h-12 border-slate-200 rounded-xl font-semibold focus:ring-brand-green">
                                                    <div className="flex items-center gap-2">
                                                        <FaBuilding className="text-slate-300" />
                                                        <SelectValue placeholder="Select supplier" />
                                                    </div>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {companies?.map(company => (
                                                        <SelectItem key={company.id} value={company.id.toString()}>
                                                            {company.companyName}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="yarn"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Yarn Type / Grade</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <FaBoxOpen className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                                                    <Input placeholder="e.g. 30/1 Combed Cotton" className="pl-10 h-12 border-slate-200 rounded-xl font-semibold focus:ring-brand-green" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="bookingQuantity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-bold uppercase tracking-widest text-slate-500">Receiving Quantity (Kg)</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <FaWeightHanging className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                                                    <Input type="number" step="0.01" placeholder="0.00" className="pl-10 h-12 border-slate-200 rounded-xl font-bold text-lg focus:ring-brand-green" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Additional Description</Label>
                                    <div className="relative">
                                        <FaAlignLeft className="absolute left-3 top-3 text-slate-300" />
                                        <Textarea
                                            className="pl-10 min-h-[48px] border-slate-200 rounded-xl focus:ring-brand-green resize-none"
                                            placeholder="Lot number, brand, etc..."
                                            value={descriptionOfYarn}
                                            onChange={(e) => setDescriptionOfYarn(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-14 bg-brand-green hover:bg-emerald-900 text-white text-xl font-black rounded-2xl shadow-xl shadow-brand-green/20 hover:shadow-brand-green/40 hover:-translate-y-1 transition-all group"
                                >
                                    {isSubmitting ? (
                                        <FaSpinner className="animate-spin text-2xl" />
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            <span>REGISTER YARN RECEIPT</span>
                                            <FaPlusCircle className="group-hover:rotate-90 transition-transform duration-300" />
                                        </div>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddYarnDetails;