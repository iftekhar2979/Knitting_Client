"use client"

import React from 'react';
import { PieChart } from "./PieChart";
import SelectTime from "./components/SelectTime";
import OverviewContainer from "./components/OverviewContainer";
import PopularContainer from "./components/PopularContainer";
import PieChartCircle from "./PieChartCirle";
import { GrowthBarChart } from "./GrowthBarChart";
import { StatusPieChart } from "./StatusPieChart";
import { HiOutlineChartBar, HiOutlineFire, HiOutlineTrendingUp } from "react-icons/hi";

const Dashboard = (props) => {
    return ( 
        <section className="p-4 lg:p-8 space-y-8 bg-gray-50/30 min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">Executive Dashboard</h1>
                    <p className="text-sm text-gray-500 font-medium mt-1">Real-time insights and operational metrics</p>
                </div>
                <div className="bg-white p-1 rounded-xl shadow-sm ring-1 ring-gray-100 flex items-center self-start sm:self-auto">
                    <SelectTime/>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Metrics Section */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                                <HiOutlineChartBar size={18} />
                            </div>
                            <h2 className="font-bold text-gray-900">Key Performance Indicators</h2>
                        </div>
                        <OverviewContainer/>
                    </div>

                    {/* New Analytics Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md">
                            <GrowthBarChart />
                        </div>
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md">
                            <StatusPieChart />
                        </div>
                    </div>

                    {/* Popular Items Section */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                                <HiOutlineFire size={18} />
                            </div>
                            <h2 className="font-bold text-gray-900">Most Popular Segments</h2>
                        </div>
                        <PopularContainer/>
                    </div>
                </div>

                {/* Charts Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="sticky top-24 space-y-6">
                        <div className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100">
                            <div className="p-4 flex items-center gap-2 border-b border-gray-50 mb-2">
                                <HiOutlineTrendingUp className="text-emerald-500" />
                                <span className="text-xs font-black uppercase tracking-widest text-gray-400">Unit Distribution</span>
                            </div>
                            <PieChart />
                        </div>
                        <div className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100">
                             <div className="p-4 flex items-center gap-2 border-b border-gray-50 mb-2">
                                <HiOutlineChartBar className="text-blue-500" />
                                <span className="text-xs font-black uppercase tracking-widest text-gray-400">Fabric Analytics</span>
                            </div>
                            <PieChartCircle />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Dashboard;