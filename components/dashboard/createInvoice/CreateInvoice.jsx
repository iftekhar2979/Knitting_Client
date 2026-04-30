"use client"
import { useGetInvoiceOrdersQuery } from "@/lib/features/order/orderApi";
import { DataTable } from "../company/DataTable";
import { columns } from "./columns";
import Loading from "@/components/utils/Loading";
import Error from "@/components/utils/Error";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState, useMemo } from "react";
import Table from "@/components/utils/Table/Table";
import { useCreateBillInformationMutation, useCreateProformaInvoiceMutation, useGetOrdersInvoiceMutation } from "@/lib/features/Invoice/invoiceApi";
import ModalTable from "./ModalTable";
import { addBillingSystem, clearingState } from "@/lib/features/Invoice/piSlice";
import { clearingSelectedValue } from "@/lib/features/Invoice/invoiceSlice";
import { GrNext, GrPrevious } from "react-icons/gr";
import { HiOutlineSearch, HiOutlineOfficeBuilding, HiOutlineUser, HiOutlineCube, HiOutlineSortAscending, HiOutlineSortDescending, HiOutlineDocumentText, HiOutlineReceiptTax, HiOutlineCheckCircle, HiOutlineExclamationCircle, HiOutlineInformationCircle, HiOutlineCash, HiOutlineTicket } from "react-icons/hi";
import { Input } from "@/components/ui/input";
import InputDropDown from "@/components/utils/InputDropDown";
import { useGetCompanyQuery } from "@/lib/features/company/companyApi";
import { useGetProductQuery } from "@/lib/features/Product/productApi";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const tableHeadings = [
    { id: 601, heading: 'Fabrics' },
    { id: 603, heading: "Description" },
    { id: 602, heading: "Finish Dia" },
    { id: 604, heading: "Style" },
    { id: 605, heading: "QTY (KG)" },
    { id: 606, heading: "Unit Price (USD)" },
    { id: 607, heading: "Total Amount (USD)" }
];

const CreateInvoice = () => {
    // 1. State hooks
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(30);
    const [orderNumber, setOrderNumber] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [buyerName, setBuyerName] = useState("");
    const [fabricsName, setFabricsName] = useState("");
    const [sort, setSort] = useState("desc");
    const [open, setOpen] = useState(false);
    const [billingWay, setBillingWay] = useState("");
    const [billSteps, setBillSteps] = useState(0);

    // 2. Redux hooks
    const dispatch = useAppDispatch();
    const { selectedValues, selectedCompanyName } = useAppSelector(state => state.invoiceSlice);
    const { piValue, totalAmount, totalQuantity } = useAppSelector(state => state.pI);

    // 3. Query/Mutation hooks
    const { data: ordersData, isLoading, isError } = useGetInvoiceOrdersQuery({
        page, limit, orderNumber, companyName, buyerName, fabricsName, sort
    });
    const { data: companies } = useGetCompanyQuery();
    const { data: products } = useGetProductQuery();
    const [createProformaInvoice, { isLoading: isInvoiceCreatingLoading }] = useCreateProformaInvoiceMutation();
    const [createBillInfromation, { isLoading: isBillCreatingLoading }] = useCreateBillInformationMutation();
    const [getOrdersInvoice, { data: piOrders, isError: isPiOrderError }] = useGetOrdersInvoiceMutation();

    // 4. useMemo hooks
    const companyOptions = useMemo(() => companies?.map(c => c.companyName) || [], [companies]);
    
    const buyerOptions = useMemo(() => {
        if (!companyName) return [];
        const selectedCompany = companies?.find(c => c.companyName === companyName);
        return selectedCompany?.buyers?.map(b => b.buyerName) || [];
    }, [companyName, companies]);
    
    const fabricOptions = useMemo(() => products?.map(p => p.fabricsName) || [], [products]);

    const invoiceContext = useMemo(() => {
        if (!piOrders || piOrders.length === 0) return null;
        const firstOrder = piOrders[0];
        const company = companies?.find(c => c.id === firstOrder.companyId);
        const buyer = company?.buyers?.find(b => b.id === firstOrder.buyerId);
        
        return {
            companyName: company?.companyName || selectedCompanyName || "N/A",
            buyerName: buyer?.buyerName || "N/A",
            orderCount: selectedValues.length
        };
    }, [piOrders, companies, selectedCompanyName, selectedValues]);

    // 5. Handlers
    const handleProformaInvoice = () => {
        getOrdersInvoice(selectedValues);
        setBillSteps(1);
    };

    const handleTypeSelection = (type) => {
        setBillingWay(type);
        dispatch(addBillingSystem(type));
        setBillSteps(2);
    };

    const handleSubmit = () => {
        if (billingWay === "Proforma Invoice") {
            createProformaInvoice(piValue);
        } else {
            createBillInfromation(piValue);
        }
        dispatch(clearingSelectedValue());
        dispatch(clearingState());
        setOpen(false);
    };

    const toggleSort = () => setSort(prev => prev === "desc" ? "asc" : "desc");

    // 6. Early returns (Must be after all hooks)
    if (isLoading) return <Loading />;
    if (isError) return <Error data={"Error fetching data. Please try again."} />;

    // 7. Main JSX Return
    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 pb-24 relative">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-brand-green tracking-tight">Invoice Generation</h1>
                <p className="text-gray-500 mt-2">Select confirmed orders to generate proforma invoices or bills.</p>
            </div>

            {/* Filter Section */}
            <Card className="mb-8 border-none shadow-sm bg-white dark:bg-gray-900/50">
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                <HiOutlineSearch className="text-emerald-500" /> Order Number
                            </label>
                            <Input
                                placeholder="Search Order #"
                                value={orderNumber}
                                onChange={(e) => { setOrderNumber(e.target.value); setPage(1); }}
                                className="h-11 border-gray-200 focus:ring-emerald-500/20 focus:border-emerald-500"
                            />
                        </div>

                        <InputDropDown
                            label={<span className="flex items-center gap-2"><HiOutlineOfficeBuilding className="text-emerald-500" /> Company</span>}
                            options={companyOptions}
                            handleInputDropdown={(e) => { setCompanyName(e.target.value); setPage(1); }}
                            placeholder="All Companies"
                            labelblock={false}
                        />

                        <InputDropDown
                            label={<span className="flex items-center gap-2"><HiOutlineUser className="text-emerald-500" /> Buyer</span>}
                            options={buyerOptions}
                            handleInputDropdown={(e) => { setBuyerName(e.target.value); setPage(1); }}
                            placeholder={companyName ? "Select Buyer" : "Choose Company First"}
                            labelblock={false}
                            disabled={!companyName}
                        />

                        <InputDropDown
                            label={<span className="flex items-center gap-2"><HiOutlineCube className="text-emerald-500" /> Fabric Type</span>}
                            options={fabricOptions}
                            handleInputDropdown={(e) => { setFabricsName(e.target.value); setPage(1); }}
                            placeholder="All Fabrics"
                            labelblock={false}
                        />
                    </div>

                    <div className="mt-6 flex justify-between items-center border-t border-gray-50 pt-4">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={toggleSort}
                                className="flex items-center gap-2 text-gray-600 hover:text-emerald-600"
                            >
                                {sort === "desc" ? <HiOutlineSortDescending size={18} /> : <HiOutlineSortAscending size={18} />}
                                Sort by Quantity ({sort.toUpperCase()})
                            </Button>
                        </div>
                        <p className="text-xs text-gray-400 italic">Showing {ordersData?.orders?.length || 0} of {ordersData?.total || 0} orders</p>
                    </div>
                </CardContent>
            </Card>

            {/* Data Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <DataTable
                    columns={columns}
                    data={ordersData?.orders || []}
                    total={ordersData?.total || 0}
                    pageIndex={page - 1}
                    pageSize={limit}
                    onPageChange={(idx) => setPage(idx + 1)}
                    onPageSizeChange={setLimit}
                    manualFiltering={true}
                />
            </div>

            {/* Action Dialog */}
            {selectedValues.length > 0 && (
                <div className="fixed bottom-8 right-8 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button
                                onClick={handleProformaInvoice}
                                className="h-14 px-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xl shadow-emerald-500/40 flex items-center gap-3 transition-all hover:scale-105 active:scale-95"
                            >
                                <Badge variant="secondary" className="bg-white/20 text-white border-none px-2 py-0.5 text-lg font-bold">
                                    {selectedValues.length}
                                </Badge>
                                <span className="font-bold text-lg tracking-wide">Generate Invoice</span>
                                <GrNext className="ml-1" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-5xl max-h-[95vh] flex flex-col p-0 overflow-hidden gap-0">
                            {/* Modal Stepper Header */}
                            <div className="p-6 border-b bg-white">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <DialogTitle className="text-2xl font-black text-gray-900 flex items-center gap-2">
                                            {billSteps === 1 && <HiOutlineDocumentText className="text-emerald-500" />}
                                            {billSteps === 2 && <HiOutlineCheckCircle className="text-emerald-500" />}
                                            {billSteps === 1 ? "Select Document Type" : "Finalize Invoice Details"}
                                        </DialogTitle>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {billSteps === 1 
                                                ? "Choose the type of document you want to generate for the selected orders." 
                                                : `You are finalizing a ${billingWay} for ${selectedValues.length} orders.`}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <Badge variant="outline" className="h-7 px-3 border-emerald-200 text-emerald-700 bg-emerald-50 font-bold">
                                            STEP {billSteps} / 2
                                        </Badge>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Progress</span>
                                    </div>
                                </div>
                                
                                <div className="relative w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div 
                                        className="absolute top-0 left-0 h-full bg-emerald-500 transition-all duration-500 ease-out"
                                        style={{ width: `${(billSteps / 2) * 100}%` }}
                                    />
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto bg-gray-50/30">
                                {billSteps === 1 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10">
                                        <button 
                                            onClick={() => handleTypeSelection("Proforma Invoice")}
                                            className={cn(
                                                "relative p-8 rounded-3xl border-2 text-left transition-all duration-300 group hover:shadow-2xl hover:-translate-y-1",
                                                billingWay === "Proforma Invoice" 
                                                    ? "border-emerald-500 bg-white ring-8 ring-emerald-500/5 shadow-xl" 
                                                    : "border-gray-100 bg-white hover:border-emerald-200 shadow-sm"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300",
                                                billingWay === "Proforma Invoice" ? "bg-emerald-500 text-white scale-110 shadow-lg shadow-emerald-200" : "bg-gray-50 text-gray-400 group-hover:text-emerald-500 group-hover:bg-emerald-50"
                                            )}>
                                                <HiOutlineDocumentText size={36} />
                                            </div>
                                            <h3 className="text-xl font-black text-gray-900 mb-2">Proforma Invoice</h3>
                                            <p className="text-sm text-gray-500 leading-relaxed mb-4">
                                                Preliminary bill of sale sent to buyers in advance of a shipment. Used for customs and payment guarantees.
                                            </p>
                                            <div className="flex items-center text-xs font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                                SELECT THIS TYPE <GrNext className="ml-2" size={10} />
                                            </div>
                                            {billingWay === "Proforma Invoice" && (
                                                <div className="absolute top-6 right-6 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg animate-in zoom-in">
                                                    <HiOutlineCheckCircle size={20} />
                                                </div>
                                            )}
                                        </button>

                                        <button 
                                            onClick={() => handleTypeSelection("Bill")}
                                            className={cn(
                                                "relative p-8 rounded-3xl border-2 text-left transition-all duration-300 group hover:shadow-2xl hover:-translate-y-1",
                                                billingWay === "Bill" 
                                                    ? "border-emerald-500 bg-white ring-8 ring-emerald-500/5 shadow-xl" 
                                                    : "border-gray-100 bg-white hover:border-emerald-200 shadow-sm"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300",
                                                billingWay === "Bill" ? "bg-emerald-500 text-white scale-110 shadow-lg shadow-emerald-200" : "bg-gray-50 text-gray-400 group-hover:text-emerald-500 group-hover:bg-emerald-50"
                                            )}>
                                                <HiOutlineReceiptTax size={36} />
                                            </div>
                                            <h3 className="text-xl font-black text-gray-900 mb-2">Standard Bill</h3>
                                            <p className="text-sm text-gray-500 leading-relaxed mb-4">
                                                Final commercial document issued to a buyer. Records the final transaction details for accounting.
                                            </p>
                                            <div className="flex items-center text-xs font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                                SELECT THIS TYPE <GrNext className="ml-2" size={10} />
                                            </div>
                                            {billingWay === "Bill" && (
                                                <div className="absolute top-6 right-6 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg animate-in zoom-in">
                                                    <HiOutlineCheckCircle size={20} />
                                                </div>
                                            )}
                                        </button>
                                    </div>
                                )}

                                {billSteps === 2 && (
                                    <div className="p-8 space-y-8">
                                        {isPiOrderError ? (
                                            <div className="py-20 flex flex-col items-center text-center max-w-md mx-auto">
                                                <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-6">
                                                    <HiOutlineExclamationCircle size={48} />
                                                </div>
                                                <h3 className="text-xl font-black text-gray-900 mb-2">Order Mismatch</h3>
                                                <p className="text-gray-500">
                                                    Selected orders must belong to the same **Company** and **Buyer** to be consolidated into a single invoice. Please go back and revise your selection.
                                                </p>
                                                <Button variant="outline" onClick={() => setBillSteps(1)} className="mt-8 border-rose-200 text-rose-600 hover:bg-rose-50">
                                                    Return to Selection
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                                {/* Context Card */}
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                                    <Card className="border-none shadow-sm bg-white overflow-hidden group">
                                                        <div className="h-1 w-full bg-emerald-500/20 group-hover:bg-emerald-500 transition-colors" />
                                                        <CardContent className="p-5 flex items-center gap-4">
                                                            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                                                                <HiOutlineOfficeBuilding size={24} />
                                                            </div>
                                                            <div>
                                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Company</p>
                                                                <p className="text-base font-black text-gray-900 truncate">{invoiceContext?.companyName}</p>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                    
                                                    <Card className="border-none shadow-sm bg-white overflow-hidden group">
                                                        <div className="h-1 w-full bg-blue-500/20 group-hover:bg-blue-500 transition-colors" />
                                                        <CardContent className="p-5 flex items-center gap-4">
                                                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                                                                <HiOutlineUser size={24} />
                                                            </div>
                                                            <div>
                                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Buyer</p>
                                                                <p className="text-base font-black text-gray-900 truncate">{invoiceContext?.buyerName}</p>
                                                            </div>
                                                        </CardContent>
                                                    </Card>

                                                    <Card className="border-none shadow-sm bg-white overflow-hidden group">
                                                        <div className="h-1 w-full bg-amber-500/20 group-hover:bg-amber-500 transition-colors" />
                                                        <CardContent className="p-5 flex items-center gap-4">
                                                            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                                                                <HiOutlineTicket size={24} />
                                                            </div>
                                                            <div>
                                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Orders</p>
                                                                <p className="text-base font-black text-gray-900">{invoiceContext?.orderCount} Included</p>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </div>

                                                <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden mb-8">
                                                    <div className="bg-gray-50/80 px-8 py-4 border-b border-gray-100 flex items-center justify-between">
                                                        <h4 className="font-bold text-gray-700 flex items-center gap-2">
                                                            <HiOutlineCube className="text-emerald-500" /> Itemized Breakdown
                                                        </h4>
                                                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-none font-bold">
                                                            USD Currency
                                                        </Badge>
                                                    </div>
                                                    
                                                    <Table tableHeadings={tableHeadings} >
                                                        {piOrders?.map((item, index) => (
                                                            <ModalTable key={index} detail={item} billingWays={billingWay} />
                                                        ))}
                                                    </Table>

                                                    <div className="bg-gray-900 text-white p-10 flex flex-col md:flex-row justify-between items-center gap-8">
                                                        <div className="flex gap-12">
                                                            <div>
                                                                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Total Quantity</p>
                                                                <p className="text-3xl font-black">{totalQuantity.toLocaleString()} <span className="text-sm font-normal text-gray-500">KG</span></p>
                                                            </div>
                                                            <div className="w-px h-12 bg-gray-800 hidden md:block" />
                                                            <div>
                                                                <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">Currency</p>
                                                                <p className="text-3xl font-black">USD</p>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="text-right">
                                                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Grand Total Amount</p>
                                                            <div className="flex items-center gap-3 justify-end text-emerald-400">
                                                                <HiOutlineCash size={32} />
                                                                <p className="text-5xl font-black tracking-tighter">
                                                                    ${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 flex items-start gap-4">
                                                    <div className="shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                                                        <HiOutlineInformationCircle size={24} />
                                                    </div>
                                                    <div>
                                                        <h5 className="font-bold text-blue-900 text-sm mb-1">Invoice Generation Policy</h5>
                                                        <p className="text-xs text-blue-700 leading-relaxed max-w-2xl">
                                                            Final prices are subject to manager approval. Ensure all fabric descriptions and style names match the client's original purchase order to avoid processing delays in the accounts department.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Modal Footer */}
                            <div className="p-8 border-t bg-white flex items-center justify-between">
                                <Button 
                                    variant="ghost" 
                                    onClick={() => billSteps > 1 ? setBillSteps(1) : setOpen(false)} 
                                    className="h-12 px-6 flex items-center gap-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl font-bold transition-all"
                                >
                                    <GrPrevious /> {billSteps === 1 ? "Cancel" : "Back to Selection"}
                                </Button>
                                
                                {billSteps === 1 ? (
                                    <Button 
                                        onClick={() => setBillSteps(2)} 
                                        disabled={!billingWay} 
                                        className="h-14 px-10 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-xl shadow-emerald-500/20 transition-all active:scale-95 disabled:opacity-50"
                                    >
                                        Next: Finalize Details <GrNext className="ml-3" />
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={isInvoiceCreatingLoading || isBillCreatingLoading}
                                        className="h-14 px-12 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-xl shadow-emerald-500/20 transition-all active:scale-95 flex items-center gap-3"
                                    >
                                        {(isInvoiceCreatingLoading || isBillCreatingLoading) ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                Generate {billingWay} <HiOutlineCheckCircle size={24} />
                                            </>
                                        )}
                                    </Button>
                                )}
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            )}
        </div>
    );
};

export default CreateInvoice;
