"use client"
import { MdDelete } from "react-icons/md"
import { format } from "date-fns"
import { IoMdDownload } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addingId } from "@/lib/features/Chalan/chalanSlice";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useState } from "react";
import Chalan from "@/components/dashboard/chalan/chalan";
import { useGetSingleDeliveryQuery } from "@/lib/features/delivery/deliveryApi";
import { FaEye } from "react-icons/fa";
const Action = ({ id }) => {
    const [chalanName, setChalanName] = useState("")
    const dispatch = useAppDispatch()
    const handleChalan = (chalanId) => {
        setChalanName(chalanId)
        dispatch(addingId({ id: parseFloat(chalanId), name: `Chalan Number ${chalanId}` }))
    }
  
    return (
        <div className='flex' >
        <FaEye size={32} color={"green"} className="cursor-pointer" onClick={() => handleChalan(id)} />
            <MdDelete size={32} color={"red"} className="cursor-pointer" />
        </div>
    )
};
export default Action;