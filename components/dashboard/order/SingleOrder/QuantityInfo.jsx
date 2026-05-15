"use client"

import React, { useEffect, useState } from "react";
import Loading from "@/components/utils/Loading";
import { useCreateDeliveryMutation, useGetOnlyQuantityInfoQuery } from "@/lib/features/order/orderApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Error from "@/components/utils/Error";
import { 
    FaSpinner, 
    FaTruckPickup, 
    FaTruck, 
    FaTruckLoading, 
    FaInfoCircle, 
    FaWeightHanging, 
    FaPalette,
    FaUser,
    FaClipboardList,
    FaCheckCircle
} from "react-icons/fa";
import { MdPersonPinCircle, MdProductionQuantityLimits, MdRollerShades } from "react-icons/md";
import { BiReset } from "react-icons/bi";
import Swal from "sweetalert2";

const QuantityInfo = ({ id }) => {
    const { data: quantityData, isLoading: qLoading } = useGetOnlyQuantityInfoQuery(id);
    const [createDelivery, { isLoading: deliveryLoading, isError: deliveryError }] = useCreateDeliveryMutation();
    
    const [vechile, setVechile] = useState("");
    const [role, setRole] = useState("");
    const [deliveryQuantity, setDeliveryQuantity] = useState("");
    const [deliveryMan, setDeliveryMan] = useState("");
    const [colour, setColour] = useState("");

    useEffect(() => {
        if (quantityData?.restQuantity !== 0 && deliveryQuantity > quantityData?.restQuantity) {
            Swal.fire({
                title: 'Limit Exceeded',
                text: "Delivery quantity cannot be more than the remaining balance.",
                icon: 'warning',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000,
                background: '#fffbe6'
            });
        }
    }, [deliveryQuantity, quantityData?.restQuantity]);

    if (qLoading) return <Loading />;

    const { 
        orderQuantity = 0, 
        restQuantity = 0, 
        status = "", 
        deliveredQuantity = 0,
        fabricsName = "N/A",
        buyerName = "N/A"
    } = quantityData || {};

    const handleSendDelivery = () => {
        if (!deliveryQuantity || deliveryQuantity <= 0) {
            return Swal.fire({
                title: 'Missing Info',
                text: 'Please enter a valid delivery weight.',
                icon: 'error'
            });
        }

        const query = {
            deliveredBy: deliveryMan,
            vechileNumber: vechile,
            roleQuantity: parseFloat(role) || 0,
            amount: deliveryQuantity,
            from: parseFloat(id),
            status,
            colour
        };

        createDelivery(query)
            .then(res => {
                if (res.data) {
                    setDeliveryQuantity("");
                    setDeliveryMan("");
                    setRole("");
                    setVechile("");
                    setColour("");

                    Swal.fire({
                        title: 'Success!',
                        text: 'Delivery record created and Chalan generated.',
                        icon: 'success',
                        confirmButtonColor: '#0A3228'
                    });
                }
            })
            .catch(err => {
                Swal.fire({
                    title: 'System Error',
                    text: err.message || 'Failed to save delivery',
                    icon: 'error'
                });
            });
    };

    return (
        <div className="space-y-8 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300">
                    <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-blue-500/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                            <MdProductionQuantityLimits size={28} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ordered Total</p>
                            <h3 className="text-3xl font-black text-slate-800">{orderQuantity}<span className="text-sm font-medium ml-1">Kg</span></h3>
                        </div>
                    </div>
                </div>

                <div className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300">
                    <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-emerald-500/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                            <FaCheckCircle size={28} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Already Delivered</p>
                            <h3 className="text-3xl font-black text-slate-800">{deliveredQuantity}<span className="text-sm font-medium ml-1">Kg</span></h3>
                        </div>
                    </div>
                </div>

                <div className="group relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300">
                    <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-orange-500/5 rounded-full group-hover:scale-150 transition-transform duration-500" />
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-orange-50 text-orange-600 rounded-xl group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                            <BiReset size={28} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Remaining Balance</p>
                            <h3 className={`text-3xl font-black ${restQuantity > 0 ? 'text-slate-800' : 'text-slate-300'}`}>{restQuantity}<span className="text-sm font-medium ml-1">Kg</span></h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Form Section */}
                <Card className="lg:col-span-8 shadow-2xl border-none ring-1 ring-slate-200 overflow-hidden bg-white/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-brand-green/10 rounded-lg">
                                <FaTruckLoading className="text-brand-green text-xl" />
                            </div>
                            <div>
                                <CardTitle className="text-2xl font-black text-slate-800">Dispatch Entry</CardTitle>
                                <CardDescription>Fill in the delivery details to generate a new chalan</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
                            <div className="space-y-2 group">
                                <Label className="text-xs font-bold uppercase tracking-wider text-slate-500 group-focus-within:text-brand-green transition-colors">Weight to Deliver (Kg)</Label>
                                <div className="relative">
                                    <FaWeightHanging className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                                    <Input 
                                        type="number" 
                                        disabled={restQuantity === 0}
                                        value={deliveryQuantity}
                                        onChange={(e) => setDeliveryQuantity(e.target.value === "" ? "" : parseFloat(e.target.value))}
                                        placeholder="0.00"
                                        className="pl-10 h-12 text-lg font-bold border-slate-200 focus:ring-brand-green focus:border-brand-green rounded-xl transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 group">
                                <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Rolls Count</Label>
                                <div className="relative">
                                    <MdRollerShades className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                                    <Input 
                                        type="number"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        placeholder="No. of rolls"
                                        className="pl-10 h-12 text-lg font-bold border-slate-200 focus:ring-brand-green rounded-xl transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Delivery Personnel</Label>
                                <div className="relative">
                                    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                                    <Input
                                        value={deliveryMan}
                                        onChange={(e) => setDeliveryMan(e.target.value)}
                                        placeholder="Delivery person name"
                                        className="pl-10 h-12 border-slate-200 rounded-xl transition-all font-semibold"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 group">
                                <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Vehicle Number</Label>
                                <div className="relative">
                                    <FaTruck className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                                    <Input 
                                        value={vechile}
                                        onChange={(e) => setVechile(e.target.value)}
                                        placeholder="Reg: DHAKA-METRO-..."
                                        className="pl-10 h-12 border-slate-200 rounded-xl transition-all font-semibold uppercase"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 md:col-span-2 group">
                                <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Colour / Fabric Shade</Label>
                                <div className="relative">
                                    <FaPalette className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                                    <Input 
                                        value={colour}
                                        onChange={(e) => setColour(e.target.value)}
                                        placeholder="Describe the fabric colour or code..."
                                        className="pl-10 h-12 border-slate-200 rounded-xl transition-all font-semibold"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-10">
                            <Button 
                                onClick={handleSendDelivery} 
                                disabled={deliveryLoading || restQuantity === 0}
                                className="w-full h-14 bg-brand-green hover:bg-emerald-900 text-white text-xl font-black rounded-2xl shadow-xl shadow-brand-green/20 hover:shadow-brand-green/40 hover:-translate-y-1 transition-all group"
                            >
                                {deliveryLoading ? (
                                    <FaSpinner className="animate-spin text-2xl" />
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <span>CONFIRM & DISPATCH</span>
                                        <FaTruckLoading className="group-hover:translate-x-2 transition-transform" />
                                    </div>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Sidebar Info Section */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="bg-gradient-to-br from-brand-green to-emerald-950 text-white border-none shadow-xl rounded-2xl overflow-hidden">
                        <CardHeader className="pb-0">
                            <CardTitle className="text-sm font-bold uppercase tracking-[0.2em] opacity-80">Order Context</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white/10 rounded-xl">
                                    <FaClipboardList size={20} />
                                </div>
                                <div>
                                    <p className="text-xs opacity-60 font-bold uppercase">Fabric Type</p>
                                    <p className="text-lg font-black tracking-tight">{fabricsName}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white/10 rounded-xl">
                                    <MdPersonPinCircle size={20} />
                                </div>
                                <div>
                                    <p className="text-xs opacity-60 font-bold uppercase">Buyer Client</p>
                                    <p className="text-lg font-black tracking-tight">{buyerName}</p>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-white/10">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="opacity-60">Fulfillment</span>
                                    <span className="font-bold">{Math.round((deliveredQuantity/orderQuantity)*100)}%</span>
                                </div>
                                <div className="w-full bg-black/20 h-2 rounded-full mt-2 overflow-hidden">
                                    <div 
                                        className="bg-emerald-400 h-full rounded-full transition-all duration-1000" 
                                        style={{ width: `${(deliveredQuantity/orderQuantity)*100}%` }}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="p-6 bg-amber-50 border border-amber-100 rounded-2xl text-amber-900 shadow-inner">
                        <div className="flex gap-3">
                            <FaInfoCircle className="shrink-0 mt-1" />
                            <div>
                                <h4 className="font-black text-sm uppercase">Notice</h4>
                                <p className="text-xs font-medium leading-relaxed opacity-80 mt-1">
                                    Ensuring accurate weight entry is critical for inventory reconciliation. Double-check the vehicle registration number before submission.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuantityInfo;
