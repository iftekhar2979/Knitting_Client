"use client"

import { format } from "date-fns";
import { MdDelete } from "react-icons/md";
import {  useDeleteYarnInfoWithDetailMutation } from "@/lib/features/yarnDetails/yarnDetailsApi";
const InfoOfYarn = ({ item ,index}) => {
    const [deleteYarnInfoWithDetail,{isError}]=useDeleteYarnInfoWithDetailMutation()
    const { receivedQuantity, createdAt, id ,yarnInfoID} = item
    const handleDelete = () => {
        deleteYarnInfoWithDetail(id)
    }
    return (
        <>
        <div className="border-t flex">
            <span className="font-mono ">{index+1}.</span>
            <span className="border-r px-2 font-mono ">Received : {receivedQuantity} KG </span>
            <span className="border-r px-1 font-mono ">  Date : {createdAt && format(createdAt, "PPp")} </span>
            <button className="border-r font-mono cursor-pointer" onClick={handleDelete}> <MdDelete size={22} color={"red"} /></button>
        </div>
        {isError && "Deleting Error"}
        </>

    )
};
export default InfoOfYarn;