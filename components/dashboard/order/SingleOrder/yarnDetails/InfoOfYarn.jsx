"use client"

import { format } from "date-fns";
import { MdDelete } from "react-icons/md";
import { useDeleteYarnDetailsMutation } from "@/lib/features/yarnDetails/yarnDetailsApi";
const InfoOfYarn = ({ item ,index}) => {
    const [deleteYarnInfoWithDetail]=useDeleteYarnDetailsMutation()
    const { receivedQuantity, createdAt, id } = item
    const handleDelete = () => {
        deleteYarnInfoWithDetail(id)
    }
    return (
        <div className="border-t flex">
            <span className="font-mono ">{index+1}.</span>
            <span className="border-r px-2 font-mono ">Received : {receivedQuantity} KG </span>
            <span className="border-r px-1 font-mono ">  Date : {createdAt && format(createdAt, "PPp")} </span>
            <button className="border-r font-mono cursor-pointer" onClick={handleDelete}> <MdDelete size={22} color={"red"} /></button>
        </div>

    )
};
export default InfoOfYarn;