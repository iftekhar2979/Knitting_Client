"use client";
import { useState, useMemo } from "react";
import { useGetOrderQuery } from "@/lib/features/order/orderApi";
import { DataTable } from "../company/DataTable";
import { columns } from "./columns";
import Loading from "@/components/utils/Loading";
import Error from "@/components/utils/Error";
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import InputDropDown from "@/components/utils/InputDropDown"
import { Button } from "@/components/ui/button"
import { HiOutlineSearch, HiOutlineOfficeBuilding, HiOutlineUser, HiOutlineTag, HiOutlineSortAscending, HiOutlineSortDescending, HiOutlineFilter } from "react-icons/hi"
import { useGetCompanyQuery } from "@/lib/features/company/companyApi";

const ViewOrder = () => {
    const [pageIndex, setPageIndex] = useState(0); 
    const [pageSize, setPageSize] = useState(30);
    const [orderNumber, setOrderNumber] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [buyerName, setBuyerName] = useState("");
    const [fabricsName, setFabricsName] = useState("");
    const [status, setStatus] = useState("");
    const [sort, setSort] = useState("desc");

    const { data: companies } = useGetCompanyQuery();

    const { data, isLoading, isError } = useGetOrderQuery({
        page: pageIndex + 1,
        limit: pageSize,
        orderNumber,
        companyName,
        buyerName,
        fabricsName,
        status,
        sort
    }, {
        refetchOnMountOrArgChange: true,
    });

    const companyOptions = useMemo(() => companies?.map(c => c.companyName) || [], [companies]);
    const buyerOptions = useMemo(() => {
        if (!companyName) return [];
        const selectedCompany = companies?.find(c => c.companyName === companyName);
        return selectedCompany?.buyers?.map(b => b.buyerName) || [];
    }, [companyName, companies]);

    if (isLoading) return <Loading />;
    if (isError) return <Error data={"Error fetching orders. Please try again."} />;

    const toggleSort = () => setSort(prev => prev === "desc" ? "asc" : "desc");

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 pb-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 pt-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-brand-green tracking-tight">Order Management</h1>
                    <p className="text-gray-500 mt-2 font-medium">Overview and tracking of all manufacturing orders.</p>
                </div>
            </div>

            {/* Premium Filter Section */}
            <Card className="mb-8 border-none shadow-sm bg-white dark:bg-gray-900/50 overflow-hidden">
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                        {/* Order Number Search */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <HiOutlineSearch className="text-emerald-500" /> Order Number
                            </label>
                            <Input 
                                placeholder="Search Number..." 
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

                        {/* Fabric Search */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <HiOutlineTag className="text-emerald-500" /> Fabric Type
                            </label>
                            <Input 
                                placeholder="e.g. S/J, Rib..." 
                                value={fabricsName}
                                onChange={(e) => { setFabricsName(e.target.value); setPageIndex(0); }}
                                className="h-11 border-gray-200 focus:ring-emerald-500/20 focus:border-emerald-500"
                            />
                        </div>

                        {/* Status Filter */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <HiOutlineFilter className="text-emerald-500" /> Status
                            </label>
                            <select
                                value={status}
                                onChange={(e) => { setStatus(e.target.value); setPageIndex(0); }}
                                className="w-full h-11 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                            >
                                <option value="">All Statuses</option>
                                <option value="Pending">Pending</option>
                                <option value="Ordered">Ordered</option>
                                <option value="Fullfilled">Fullfilled</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-between items-center border-t border-gray-50 pt-4">
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={toggleSort}
                            className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 h-10 px-4 transition-all"
                        >
                            {sort === "desc" ? <HiOutlineSortDescending size={18} /> : <HiOutlineSortAscending size={18} />}
                            Sort by Date ({sort === "desc" ? "Newest First" : "Oldest First"})
                        </Button>
                        <p className="text-xs text-gray-400 font-medium tracking-wide italic">Real-time server-side synchronization enabled</p>
                    </div>
                </CardContent>
            </Card>

            {/* Data Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <DataTable
                    columns={columns}
                    data={data?.orders || []}
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

export default ViewOrder;
