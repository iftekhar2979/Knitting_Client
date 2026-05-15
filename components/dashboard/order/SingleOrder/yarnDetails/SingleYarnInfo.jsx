"use client"

import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAddYarnReceivedMutation, useDeleteYarnDetailsMutation } from "@/lib/features/yarnDetails/yarnDetailsApi";
import { MdDelete, MdUndo, MdCalendarToday, MdBusiness, MdDescription, MdInfo } from "react-icons/md";
import { FaWeightHanging, FaTruck, FaUser, FaBox } from "react-icons/fa";
import InfoOfYarn from "./InfoOfYarn";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Swal from "sweetalert2";
import { BiReset } from "react-icons/bi";
import { getYarnReturnTransactions } from "./getYarnReturnTransactions";

const SingleYarnInfo = ({ item }) => {
  const [addYarnReceived, { isLoading: isReturning }] = useAddYarnReceivedMutation();
  const [returnVal, setReturnVal] = useState({ amount: 0, westQuantity: 0, role: "", vechileNumber: "", deliveredBy: "" });
  const [deleteYarnDetails] = useDeleteYarnDetailsMutation();

  const {
    id,
    company: { companyName, location },
    yarnType,
    descriptionOfYarn,
    ReceivingQuantity,
    restQuantity,
    createdAt
  } = item;
  const yarnReturnTransactions = getYarnReturnTransactions(item);

  const handleReturn = (e) => {
    const { name, value } = e.target;
    let val = value;

    if (name === "amount" || name === "westQuantity") {
      val = parseFloat(value) || 0;
    }

    setReturnVal(prev => ({ ...prev, [name]: val }));
  };

  const handleSave = async () => {
    if (returnVal.amount <= 0 && returnVal.westQuantity <= 0) {
      return Swal.fire({
        title: 'Empty Return',
        text: 'Please enter return quantity or process loss.',
        icon: 'warning'
      });
    }

    try {
      await addYarnReceived({ from: id, ...returnVal }).unwrap();
      setReturnVal({ amount: 0, westQuantity: 0, role: "", vechileNumber: "", deliveredBy: "" });
      Swal.fire({
        title: 'Success!',
        text: 'Return recorded successfully!',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: 'Failed to record return.',
        icon: 'error'
      });
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will permanently delete this yarn receipt record.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteYarnDetails(id);
      }
    });
  };

  const fulfillmentPercentage = Math.round(((ReceivingQuantity - restQuantity) / ReceivingQuantity) * 100);

  return (
    <Card className="overflow-hidden border-none shadow-lg bg-white group hover:shadow-xl transition-all duration-300">
      <CardHeader className="bg-slate-50/50 border-b pb-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <MdBusiness className="text-slate-400" />
              <CardTitle className="text-lg font-bold text-slate-800 uppercase tracking-tight">{companyName}</CardTitle>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
              <MdCalendarToday />
              <span>Received {format(new Date(createdAt), "PPP")}</span>
            </div>
          </div>
          <Badge variant={restQuantity === 0 ? "secondary" : "default"} className={restQuantity === 0 ? "bg-slate-100 text-slate-500" : "bg-brand-green text-white"}>
            {restQuantity === 0 ? "Fully Returned" : "Active Receipt"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Main Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Yarn Type</p>
            <p className="font-bold text-slate-700 flex items-center gap-2">
              <FaBox className="text-brand-green text-xs" /> {yarnType}
            </p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Weight</p>
            <p className="font-bold text-slate-700 flex items-center gap-2">
              <FaWeightHanging className="text-brand-green text-xs" /> {ReceivingQuantity} <span className="text-[10px] font-normal">Kg</span>
            </p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <p className="text-xs font-bold text-slate-500 uppercase">Return Progress</p>
            <p className="text-xs font-black text-brand-green">{fulfillmentPercentage}%</p>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-green transition-all duration-1000"
              style={{ width: `${fulfillmentPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-bold text-slate-400">
            <span>USED: {Math.round((ReceivingQuantity - restQuantity) * 100) / 100} Kg</span>
            <span>REST: {restQuantity} Kg</span>
          </div>
        </div>

        {/* Sub-items List */}
        {yarnReturnTransactions.length > 0 && (
          <div className="space-y-3 pt-4 border-t">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <MdInfo /> Transactions History
            </p>
            <div className="space-y-2">
              {yarnReturnTransactions.map((transaction, idx) => (
                <InfoOfYarn
                  key={transaction.id}
                  index={idx}
                  anotherInfo={{ id, company: { companyName, location }, yarnType, descriptionOfYarn, ReceivingQuantity, createdAt }}
                  item={transaction}
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="bg-slate-50/50 p-4 border-t flex gap-3">
        {restQuantity > 0 && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex-1 bg-white hover:bg-brand-green hover:text-white border border-slate-200 text-slate-700 font-bold transition-all shadow-sm">
                <MdUndo className="mr-2" /> Record Return
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] border-none shadow-2xl p-0 overflow-hidden">
              <div className="bg-brand-green p-6 text-white">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black flex items-center gap-3">
                    <MdUndo className="text-3xl" /> Return Transaction
                  </DialogTitle>
                </DialogHeader>
              </div>
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Return Qty (Kg)</Label>
                    <div className="relative">
                      <FaWeightHanging className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                      <Input type="number" name="amount" placeholder="0.00" className="pl-10 h-11 border-slate-200 rounded-xl" onChange={handleReturn} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-500">Process Loss (Kg)</Label>
                    <div className="relative">
                      <BiReset className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 text-lg" />
                      <Input type="number" name="westQuantity" placeholder="0.00" className="pl-10 h-11 border-slate-200 rounded-xl" onChange={handleReturn} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 text-emerald-900">Rolls</Label>
                      <Input type="text" name="role" placeholder="Qty" className="h-11 border-slate-200 rounded-xl" onChange={handleReturn} />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 text-emerald-900">Vehicle No</Label>
                      <div className="relative">
                        <FaTruck className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                        <Input type="text" name="vechileNumber" placeholder="DHAKA-..." className="pl-10 h-11 border-slate-200 rounded-xl" onChange={handleReturn} />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-slate-500 text-emerald-900">Through By</Label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                      <Input type="text" name="deliveredBy" placeholder="Personnel Name" className="pl-10 h-11 border-slate-200 rounded-xl" onChange={handleReturn} />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <DialogClose asChild>
                    <Button variant="outline" className="flex-1 h-12 rounded-xl font-bold">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      className="flex-1 h-12 bg-brand-green hover:bg-brand-accent text-white font-black rounded-xl shadow-lg shadow-brand-green/20"
                      onClick={handleSave}
                    >
                      CONFIRM RETURN
                    </Button>
                  </DialogClose>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
        <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50 font-bold px-2" onClick={handleDelete}>
          <MdDelete size={20} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SingleYarnInfo;
