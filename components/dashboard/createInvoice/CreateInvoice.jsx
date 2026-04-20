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
import Radio from "@/components/ui/Radio";
import { GrNext, GrPrevious } from "react-icons/gr";
import { HiOutlineSearch, HiOutlineFilter, HiOutlineSortAscending, HiOutlineSortDescending, HiOutlineOfficeBuilding, HiOutlineUser, HiOutlineCube } from "react-icons/hi";
import { Input } from "@/components/ui/input";
import InputDropDown from "@/components/utils/InputDropDown";
import { useGetCompanyQuery } from "@/lib/features/company/companyApi";
import { useGetProductQuery } from "@/lib/features/Product/productApi";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const tableHeadings = [
    { id: 601, heading: 'Fabrics' },
    { id: 603, heading: "Description" },
    { id: 602, heading: "Finish Dia" },
    { id: 604, heading: "Style" },
    { id: 605, heading: "QTY (KG)" },
    { id: 606, heading: "Unit Price (USD)" },
    { id: 607, heading: "Total Amount (USD)" }
];

let billingSystemOptions = ["Proforma Invoice", "Bill"];

const CreateInvoice = () => {
    // State for Pagination, Filtering, and Sorting
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(30);
    const [orderNumber, setOrderNumber] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [buyerName, setBuyerName] = useState("");
    const [fabricsName, setFabricsName] = useState("");
    const [sort, setSort] = useState("desc");

    // Queries
    const { data: ordersData, isLoading, isError } = useGetInvoiceOrdersQuery({
        page, limit, orderNumber, companyName, buyerName, fabricsName, sort
    });
    const { data: companies } = useGetCompanyQuery();
    const { data: products } = useGetProductQuery();

    const [createProformaInvoice, { isLoading: isInvoiceCreatingLoading }] = useCreateProformaInvoiceMutation();
    const [createBillInfromation, { isLoading: isBillCreatingLoading }] = useCreateBillInformationMutation();
    const [getOrdersInvoice, { data: piOrders, isError: isPiOrderError }] = useGetOrdersInvoiceMutation();

    const [open, setOpen] = useState(false);
    const [billingWay, setBillingWay] = useState("");
    const [billSteps, setBillSteps] = useState(0);

    const { selectedValues } = useAppSelector(state => state.invoiceSlice);
    const { piValue, totalAmount, totalQuantity } = useAppSelector(state => state.pI);

    const dispatch = useAppDispatch();

    const companyOptions = useMemo(() => companies?.map(c => c.companyName) || [], [companies]);
    const buyerOptions = useMemo(() => {
        if (!companyName) return [];
        const selectedCompany = companies?.find(c => c.companyName === companyName);
        return selectedCompany?.buyers?.map(b => b.buyerName) || [];
    }, [companyName, companies]);
    const fabricOptions = useMemo(() => products?.map(p => p.fabricsName) || [], [products]);

    if (isLoading) return <Loading />;
    if (isError) return <Error data={"Error fetching data. Please try again."} />;

    const handleProformaInvoice = () => {
        getOrdersInvoice(selectedValues);
        setBillSteps(1);
    };

    const handleRadioChanges = (data) => {
        setBillingWay(data.item);
        dispatch(addBillingSystem(data.item));
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

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 pb-24 relative">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-brand-green tracking-tight">Invoice Generation</h1>
                <p className="text-gray-500 mt-2">Select confirmed orders to generate proforma invoices or bills.</p>
            </div>

            {/* Beautiful Filter Section */}
            <Card className="mb-8 border-none shadow-sm bg-white dark:bg-gray-900/50">
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Order Number Search */}
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

                        {/* Company Filter */}
                        <InputDropDown
                            label={
                                <span className="flex items-center gap-2">
                                    <HiOutlineOfficeBuilding className="text-emerald-500" /> Company
                                </span>
                            }
                            options={companyOptions}
                            handleInputDropdown={(e) => { setCompanyName(e.target.value); setPage(1); }}
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
                            handleInputDropdown={(e) => { setBuyerName(e.target.value); setPage(1); }}
                            placeholder={companyName ? "Select Buyer" : "Choose Company First"}
                            labelblock={false}
                            disabled={!companyName}
                        />

                        {/* Fabrics Filter */}
                        <InputDropDown
                            label={
                                <span className="flex items-center gap-2">
                                    <HiOutlineCube className="text-emerald-500" /> Fabric Type
                                </span>
                            }
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

            {/* Data Table with Pagination */}
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

            {/* Sticky Floating Action Button */}
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
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            {billSteps === 2 ? (
                                <div className="space-y-6">
                                    {isPiOrderError ? (
                                        <Error data={"Mismatch: Please select orders from the same Company and Buyer for a single invoice."} />
                                    ) : (
                                        <>
                                            <DialogHeader>
                                                <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                                                    Creating <span className="text-emerald-600">{billingWay}</span>
                                                </DialogTitle>
                                                <p className="text-gray-500">Orders: {selectedValues.join(", ")}</p>
                                            </DialogHeader>
                                            <div className="rounded-lg border overflow-hidden">
                                                <Table tableHeadings={tableHeadings} >
                                                    {piOrders?.map((item, index) => (
                                                        <ModalTable key={index} detail={item} billingWays={billingWay} />
                                                    ))}
                                                    <tr className="bg-gray-50 font-bold border-t">
                                                        <td colSpan={4} className="text-right p-4">Grand Total</td>
                                                        <td className="p-4">{totalQuantity} KG</td>
                                                        <td></td>
                                                        <td className="p-4 text-emerald-700">$ {totalAmount.toLocaleString()}</td>
                                                    </tr>
                                                </Table>
                                            </div>
                                        </>
                                    )}
                                    <div className="flex items-center justify-between pt-4 border-t">
                                        <Button variant="ghost" onClick={() => setBillSteps(1)} className="flex items-center gap-2">
                                            <GrPrevious /> Back
                                        </Button>
                                        <Button
                                            onClick={handleSubmit}
                                            disabled={isInvoiceCreatingLoading || isBillCreatingLoading}
                                            className="w-32 bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                                        >
                                            {(isInvoiceCreatingLoading || isBillCreatingLoading) ? "Submitting..." : "Submit"}
                                        </Button>
                                    </div>
                                </div>
                            ) : null}

                            {billSteps === 1 ? (
                                <div className="space-y-6 py-4 text-center">
                                    <DialogHeader>
                                        <DialogTitle className="text-2xl font-semibold">Select Billing Type</DialogTitle>
                                    </DialogHeader>
                                    <div className="max-w-xs mx-auto">
                                        <Radio
                                            array={billingSystemOptions}
                                            handleRadioChange={handleRadioChanges}
                                            selectedValue={billingWay}
                                        />
                                    </div>
                                    <div className="flex justify-center mt-8">
                                        <Button onClick={() => setBillSteps(2)} disabled={!billingWay} className="bg-emerald-600 hover:bg-emerald-700">
                                            Continue <GrNext className="ml-2" />
                                        </Button>
                                    </div>
                                </div>
                            ) : null}
                        </DialogContent>
                    </Dialog>
                </div>
            )}
        </div>
    );
};

export default CreateInvoice;
