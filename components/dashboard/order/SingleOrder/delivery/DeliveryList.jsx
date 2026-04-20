"use client"
import { DataTable } from '@/components/dashboard/company/DataTable';
import Error from '@/components/utils/Error';
import Loading from '@/components/utils/Loading';
import { useGetAllDeliveryforAnSingleOrderQuery } from '@/lib/features/delivery/deliveryApi';
import React, { useState, useMemo } from 'react';
import { columns } from './columns';
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { HiOutlineHashtag, HiOutlineArrowLeft } from "react-icons/hi"
import Link from 'next/link';

const DeliveryList = ({ id }) => {
    const [chalanFilter, setChalanFilter] = useState("");
    const { data, isLoading, isError } = useGetAllDeliveryforAnSingleOrderQuery(id);

    // Derived filtered data
    const filteredData = useMemo(() => {
        if (!data) return [];
        if (!chalanFilter) return data;
        return data.filter(item => String(item.id).includes(chalanFilter));
    }, [data, chalanFilter]);

    if (isLoading) return <Loading />;
    if (isError) return <Error data={"Error fetching deliveries for this order."} />;

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 pb-10">
            {/* Header with Navigation */}
            <div className="mb-8 flex flex-col gap-4">
                <Link
                    href={`/dashboard/order/${id}`}
                    className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-bold transition-colors w-fit group"
                >
                    <HiOutlineArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Order Details
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-brand-green tracking-tight">Delivery History</h1>
                    <p className="text-gray-500 mt-2 italic font-medium">Viewing all chalans issued for Order ID: {id}</p>
                </div>
            </div>

            {/* Local Search Card */}
            <Card className="mb-8 border-none shadow-sm bg-white overflow-hidden max-w-sm">
                <CardContent className="p-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <HiOutlineHashtag className="text-emerald-500" /> Filter by Chalan #
                        </label>
                        <Input
                            placeholder="Enter Chalan Number..."
                            value={chalanFilter}
                            onChange={(e) => setChalanFilter(e.target.value)}
                            className="h-10 border-gray-100 focus:ring-emerald-500/10 focus:border-emerald-500 bg-gray-50/50"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Data Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <DataTable
                    columns={columns}
                    data={filteredData || []}
                    searchingValue={"id"}
                    placeholder={"Filter by Chalan Number..."}
                />
            </div>
        </div>
    );
};

export default DeliveryList;