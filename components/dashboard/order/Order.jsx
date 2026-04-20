"use client"
import React, { useState, useEffect } from 'react';
import { useEditStatusMutation, useGetSingleOrderQuery } from '@/lib/features/order/orderApi';
import QuantityInfo from './SingleOrder/QuantityInfo';
// import OrderSkeleton from './SingleOrder/OrderSkeleton';
import Error from '@/components/utils/Error';
import { format } from 'date-fns';
import {
    HiOutlineOfficeBuilding,
    HiOutlineLocationMarker,
    HiOutlineUser,
    HiOutlineCalendar,
    HiOutlineTag,
    HiOutlineHashtag,
    HiOutlinePencilAlt,
    HiOutlineExclamationCircle,
    HiOutlineBadgeCheck,
    HiOutlineClock,
    HiOutlineArrowLeft
} from 'react-icons/hi';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link';
import OrderSkeleton from './SingleOrder/OrderSkeleton';

const Order = ({ id }) => {
    const { data, isLoading, isError } = useGetSingleOrderQuery(id)
    const [status, setStatus] = useState("");
    const [editStatus] = useEditStatusMutation()

    useEffect(() => {
        if (data?.status) {
            setStatus(data.status);
        }
    }, [data]);

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        editStatus({ id, body: { status: newStatus } });
    };

    if (isLoading) return <OrderSkeleton />;
    if (isError) return <Error data={"Error fetching order details. Please refresh the page."} />;

    const {
        companyName,
        company = {},
        buyerName,
        targetDate,
        orderNumber,
        programNumber,
        jobNumber,
        season,
        bookingNumber,
        sbNumber,
        fabricsName,
        orderedDate
    } = data;

    const getStatusColor = (s) => {
        if (s === "Fullfilled" || s === "Completed") return "bg-emerald-100 text-emerald-700 hover:bg-emerald-100";
        if (s === "Pending") return "bg-amber-100 text-amber-700 hover:bg-amber-100";
        return "bg-blue-100 text-blue-700 hover:bg-blue-100";
    };

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 pb-10 space-y-8 mt-4">
            {/* Action Bar & Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard/order" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                            <HiOutlineArrowLeft size={20} />
                        </Link>
                        <h1 className="text-3xl font-extrabold text-brand-green tracking-tight flex items-center gap-3">
                            Order #{orderNumber}
                        </h1>
                        <Badge variant="outline" className={`ml-2 py-1 px-3 text-xs font-bold uppercase tracking-widest ${getStatusColor(status)}`}>
                            {status}
                        </Badge>
                    </div>
                    <p className="text-gray-500 font-medium ml-12 italic">Managed Manufacturing Order Profile</p>
                </div>

                <div className="flex items-center gap-3 ml-12 md:ml-0">
                    <div className="flex flex-col items-start gap-1 mr-4">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Update Status</label>
                        <select
                            value={status}
                            onChange={handleStatusChange}
                            className="h-10 pl-3 pr-8 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white shadow-sm"
                        >
                            <option value="Ordered">Ordered</option>
                            <option value="Pending">Pending</option>
                            <option value="Fullfilled">Fullfilled</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <Link href={`/dashboard/order/${id}/edit`}>
                        <Button variant="outline" className="h-10 gap-2 border-emerald-100 text-emerald-600 hover:bg-emerald-50 font-bold">
                            <HiOutlinePencilAlt size={18} /> Edit Order
                        </Button>
                    </Link>
                    <Button variant="ghost" className="h-10 gap-2 text-rose-500 hover:bg-rose-50 font-bold">
                        <HiOutlineExclamationCircle size={18} /> Issues
                    </Button>
                </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 1. Commercial Details Card */}
                <Card className="border-none shadow-sm bg-white dark:bg-gray-900/50 overflow-hidden lg:col-span-1">
                    <div className="h-2 bg-emerald-500" />
                    <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center space-y-4 pb-6 border-b border-gray-50">
                            <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-600">
                                <HiOutlineOfficeBuilding size={48} />
                            </div>
                            <div className="space-y-1">
                                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{companyName}</h2>
                                <div className="flex items-center justify-center gap-2 text-gray-500 font-medium italic">
                                    <HiOutlineLocationMarker size={16} className="text-emerald-500" />
                                    {company?.location || "Location Unknown"}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-6">
                            <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <HiOutlineUser className="text-emerald-500" size={16} /> Buyer Entity
                                </span>
                                <span className="font-bold text-gray-800">{buyerName}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <HiOutlineTag className="text-emerald-500" size={16} /> Fabric Base
                                </span>
                                <span className="font-bold text-gray-800">{fabricsName}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 2. Production & Reference Details */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Reference Card */}
                    <Card className="border-none shadow-sm bg-white p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                            <HiOutlineHashtag size={80} />
                        </div>
                        <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <HiOutlineHashtag /> Production References
                        </h3>
                        <div className="grid grid-cols-1 gap-6">
                            <div className="flex justify-between items-end border-b border-gray-50 pb-3">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter capitalize ">Fabric Name / Fabric ID</p>
                                    <p className="text-lg font-bold text-gray-800">{fabricsName}</p>
                                </div>
                                <div className="text-right space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter capitalize">Season Identity</p>
                                    <p className="text-lg font-bold text-gray-800">{season || "—"}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter capitalize ">Program Number</p>
                                    <p className="font-bold text-gray-700">{programNumber || "—"}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter capitalize">Job Number</p>
                                    <p className="font-bold text-gray-700">{jobNumber || "—"}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter capitalize">Booking Number</p>
                                    <p className="font-bold text-gray-700">{bookingNumber || "—"}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter capitalize">SB Number</p>
                                    <p className="font-bold text-gray-700">{sbNumber || "—"}</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Timeline Card */}
                    <Card className="border-none shadow-sm bg-white p-6 relative overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                            <HiOutlineClock size={80} />
                        </div>
                        <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <HiOutlineCalendar /> Critical Timeline
                        </h3>
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 relative">
                                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center z-10 shrink-0">
                                    <HiOutlineBadgeCheck size={20} />
                                </div>
                                <div className="absolute left-5 top-10 w-0.5 h-10 bg-emerald-50 z-0 hidden md:block" />
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ordered On</p>
                                    <p className="text-xl font-extrabold text-gray-800">{format(new Date(orderedDate), "PPPP")}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                                    <HiOutlineClock size={20} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Target Delivery</p>
                                    <p className="text-xl font-extrabold text-gray-800">{format(new Date(targetDate), "PPPP")}</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Preserving QuantityInfo component at the bottom */}
            <div className="pt-8 border-t border-gray-100">
                <QuantityInfo id={id} />
            </div>
        </div>
    );
};

export default Order;