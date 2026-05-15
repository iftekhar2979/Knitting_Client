"use client"
import Loading from '@/components/utils/Loading';
import { useGetSingleYarnDetailsQuery } from '@/lib/features/yarnDetails/yarnDetailsApi';
import React from 'react';
import SingleYarnInfo from './SingleYarnInfo';
import { FaDownload, FaDatabase, FaHistory, FaWeightHanging, FaBoxOpen } from "react-icons/fa";
import { CSVLink } from "react-csv";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BiReset } from 'react-icons/bi';
import { getYarnReturnTransactions } from './getYarnReturnTransactions';

const YarnDetailsInfo = ({ id }) => {
    const { data, isLoading, isError } = useGetSingleYarnDetailsQuery(id);

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <div className="text-center p-10 text-red-500">Error loading yarn details.</div>;
    }

    // Calculate overall stats
    const stats = data?.reduce((acc, item) => {
        acc.totalReceived += item.ReceivingQuantity || 0;
        acc.totalRest += item.restQuantity || 0;
        const returns = getYarnReturnTransactions(item).reduce((rAcc, r) => {
            rAcc.returned += r.returnQuantity || 0;
            rAcc.loss += r.westQuantity || 0;
            return rAcc;
        }, { returned: 0, loss: 0 }) || { returned: 0, loss: 0 };

        acc.totalReturned += returns.returned;
        acc.totalLoss += returns.loss;
        return acc;
    }, { totalReceived: 0, totalRest: 0, totalReturned: 0, totalLoss: 0 }) || { totalReceived: 0, totalRest: 0, totalReturned: 0, totalLoss: 0 };

    const headers = [
        { label: "Company Name", key: "company" },
        { label: "Yarn Type", key: "yarnType" },
        { label: "Received Quantity", key: "receiving_Quantity" },
        { label: "Rest Quantity", key: "rest_Quantity" },
        { label: "Returned Quantity", key: "return_quantity" },
        { label: "Received At", key: "received_at" },
    ];

    const statementDate = data?.map(item => ({
        company: item.company.companyName,
        yarnType: item.yarnType,
        receiving_Quantity: item.ReceivingQuantity,
        rest_Quantity: item.restQuantity,
        received_at: item.createdAt,
        return_quantity: item.ReceivingQuantity - item.restQuantity
    })) || [];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Quick Stats Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white border-none shadow-sm hover:shadow-md transition-all">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                            <FaWeightHanging size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Received</p>
                            <p className="text-xl font-black text-slate-700">{stats.totalReceived.toFixed(2)} <span className="text-xs font-normal">Kg</span></p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-none shadow-sm hover:shadow-md transition-all">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                            <FaHistory size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Used/Returned</p>
                            <p className="text-xl font-black text-slate-700">{stats.totalReturned.toFixed(2)} <span className="text-xs font-normal">Kg</span></p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-none shadow-sm hover:shadow-md transition-all">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                            <BiReset size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Process Loss</p>
                            <p className="text-xl font-black text-slate-700">{stats.totalLoss.toFixed(2)} <span className="text-xs font-normal">Kg</span></p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-brand-green text-white border-none shadow-lg">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-3 bg-white/20 text-white rounded-xl">
                            <FaDatabase size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-white/60 uppercase tracking-wider">Net Stock Balance</p>
                            <p className="text-xl font-black">{stats.totalRest.toFixed(2)} <span className="text-xs font-normal">Kg</span></p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-none shadow-sm bg-slate-50/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-brand-green/10 rounded-lg text-brand-green">
                            <FaDatabase size={20} />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-black text-slate-800 tracking-tight">Receipt History</CardTitle>
                            <p className="text-xs text-muted-foreground font-medium">Detailed breakdown of all yarn arrivals</p>
                        </div>
                    </div>
                    <CSVLink data={statementDate} headers={headers} filename={`yarn-inventory-${id}.csv`}>
                        <Button variant="outline" size="sm" className="h-9 border-slate-200 hover:bg-white hover:text-brand-green hover:border-brand-green transition-all shadow-sm gap-2">
                            <FaDownload className="text-xs" />
                            <span className="text-xs font-bold uppercase tracking-wider">Export List</span>
                        </Button>
                    </CSVLink>
                </CardHeader>
            </Card>

            {data?.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-100 shadow-inner">
                    <div className="relative inline-block mb-6">
                        <div className="absolute inset-0 bg-brand-green/10 rounded-full blur-2xl scale-150 animate-pulse" />
                        <FaBoxOpen className="relative text-slate-300 text-7xl mx-auto" />
                    </div>
                    <p className="text-slate-400 font-bold text-xl tracking-tight uppercase">No Inventory Found</p>
                    <p className="text-slate-400/60 text-sm max-w-xs mx-auto mt-2">Start by registering a new yarn receipt from the supplier above.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    {data?.map((item, index) => (
                        <SingleYarnInfo key={item.id} index={index} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default YarnDetailsInfo;
