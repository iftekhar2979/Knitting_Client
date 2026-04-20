"use client"
import { DataTable } from '@/components/dashboard/company/DataTable';
import Error from '@/components/utils/Error';
import Loading from '@/components/utils/Loading';
import { useGetAllDeliveryQuery } from '@/lib/features/delivery/deliveryApi';
import { columns } from './columns';
import React, { useState, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import InputDropDown from "@/components/utils/InputDropDown"
import { Button } from "@/components/ui/button"
import { HiOutlineSearch, HiOutlineOfficeBuilding, HiOutlineUser, HiOutlineHashtag, HiOutlineSortAscending, HiOutlineSortDescending } from "react-icons/hi"
import { useGetCompanyQuery } from "@/lib/features/company/companyApi";

const AllDeliveryLists = () => {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(30);
    const [id, setId] = useState(""); // Chalan Number
    const [orderNumber, setOrderNumber] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [buyerName, setBuyerName] = useState("");
    const [sort, setSort] = useState("desc");

    const { data, isLoading, isError } = useGetAllDeliveryQuery({
        page: pageIndex + 1,
        limit: pageSize,
        id,
        orderNumber,
        companyName,
        buyerName,
        sort
    }, {
        refetchOnMountOrArgChange: true,
    });

    const { data: companies } = useGetCompanyQuery();

    const companyOptions = useMemo(() => companies?.map(c => c.companyName) || [], [companies]);
    const buyerOptions = useMemo(() => {
        if (!companyName) return [];
        const selectedCompany = companies?.find(c => c.companyName === companyName);
        return selectedCompany?.buyers?.map(b => b.buyerName) || [];
    }, [companyName, companies]);

    if (isLoading) return <Loading />;
    if (isError) return <Error data={'Error fetching delivery list. Please try again.'} />;

    const toggleSort = () => setSort(prev => prev === "desc" ? "asc" : "desc");

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 pb-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-brand-green tracking-tight">Delivery Logistics</h1>
                    <p className="text-gray-500 mt-2">Monitor and manage all outgoing delivery chalans across all orders.</p>
                </div>
            </div>

            {/* Premium Filter Section */}
            <Card className="mb-8 border-none shadow-sm bg-white dark:bg-gray-900/50 overflow-hidden">
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Chalan Number Search */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <HiOutlineHashtag className="text-emerald-500" /> Chalan Number
                            </label>
                            <Input
                                placeholder="Search Chalan #..."
                                value={id}
                                onChange={(e) => { setId(e.target.value); setPageIndex(0); }}
                                className="h-11 border-gray-200 focus:ring-emerald-500/20 focus:border-emerald-500"
                            />
                        </div>

                        {/* Order Number Search */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <HiOutlineSearch className="text-emerald-500" /> Order Number
                            </label>
                            <Input
                                placeholder="Search Order #..."
                                value={orderNumber}
                                onChange={(e) => { setOrderNumber(e.target.value); setPageIndex(0); }}
                                className="h-11 border-gray-200 focus:ring-emerald-500/20 focus:border-emerald-500"
                            />
                        </div>

                        {/* Company Filter */}
                        <InputDropDown
                            label={
                                <span className="flex items-center gap-2">
                                    <HiOutlineOfficeBuilding className="text-emerald-500" /> Company
                                </span>
                            }
                            options={companyOptions}
                            handleInputDropdown={(e) => { setCompanyName(e.target.value); setPageIndex(0); }}
                            placeholder="All Companies"
                            labelblock={false}
                        />

                        {/* Buyer Filter */}
                        <InputDropDown
                            label={
                                <span className="flex items-center gap-2">
                                    <HiOutlineUser className="text-emerald-500" /> Buyer
                                </span>
                            }
                            options={buyerOptions}
                            handleInputDropdown={(e) => { setBuyerName(e.target.value); setPageIndex(0); }}
                            placeholder={companyName ? "Select Buyer" : "Choose Company First"}
                            labelblock={false}
                            disabled={!companyName}
                        />
                    </div>

                    <div className="mt-6 flex justify-between items-center border-t border-gray-50 pt-4">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={toggleSort}
                            className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 h-10 px-4"
                        >
                            {sort === "desc" ? <HiOutlineSortDescending size={18} /> : <HiOutlineSortAscending size={18} />}
                            Sort by Date ({sort === "desc" ? "Newest First" : "Oldest First"})
                        </Button>
                        <p className="text-xs text-gray-400 font-medium tracking-wide italic">Showing results from all orders</p>
                    </div>
                </CardContent>
            </Card>

            {/* Data Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <DataTable
                    columns={columns}
                    data={data?.data || []}
                    total={data?.total || 0}
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    onPageChange={setPageIndex}
                    onPageSizeChange={setPageSize}
                    manualFiltering={true}
                />
            </div>
        </div>
    );
};

export default AllDeliveryLists;