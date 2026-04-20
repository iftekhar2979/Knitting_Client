"use client"

import { useState } from "react";
import { format } from "date-fns";
import { MdDelete, MdFileDownload, MdHistory } from "react-icons/md";
import { useDeleteYarnInfoWithDetailMutation } from "@/lib/features/yarnDetails/yarnDetailsApi";
import { generateReturnChalanPdf } from "./Return/generateReturnChalanPdf";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Swal from "sweetalert2";

const InfoOfYarn = ({ anotherInfo, item, index }) => {
    const [deleteYarnInfoWithDetail] = useDeleteYarnInfoWithDetailMutation();
    const [isGenerating, setIsGenerating] = useState(false);
    const { returnQuantity, createdAt, id, westQuantity } = item;

    const handleDelete = () => {
        Swal.fire({
            title: 'Remove Transaction?',
            text: "This will delete this specific return entry.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteYarnInfoWithDetail(id);
            }
        });
    };

    const handleDownload = async () => {
        setIsGenerating(true);
        try {
            await generateReturnChalanPdf(item, anotherInfo, id);
        } catch (error) {
            console.error("PDF download failed", error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="flex items-center justify-between p-3 bg-slate-50/80 rounded-xl border border-slate-100 group/item hover:bg-white hover:border-brand-green/20 transition-all duration-200">
            <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 text-[10px] font-bold text-slate-500">
                    {index + 1}
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-slate-700">{returnQuantity} <span className="text-[10px] font-normal text-slate-400">Kg Return</span></span>
                        {westQuantity > 0 && (
                            <Badge variant="outline" className="text-[10px] py-0 h-4 border-orange-200 text-orange-600 bg-orange-50 font-bold uppercase">
                                +{westQuantity} Kg Loss
                            </Badge>
                        )}
                    </div>
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1 font-medium">
                        <MdHistory /> {createdAt && format(new Date(createdAt), "PPp")}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                    onClick={handleDownload}
                    disabled={isGenerating}
                >
                    {isGenerating ? <span className="animate-spin text-xs">...</span> : <MdFileDownload size={18} />}
                </Button>
                
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-red-400 hover:text-red-600 hover:bg-red-50" 
                    onClick={handleDelete}
                >
                    <MdDelete size={18} />
                </Button>
            </div>
        </div>
    );
};

export default InfoOfYarn;