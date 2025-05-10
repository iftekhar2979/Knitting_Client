"use client"

import { format } from "date-fns";
import { MdDelete, MdFileCopy, MdFileDownload } from "react-icons/md";
import { useDeleteYarnInfoWithDetailMutation } from "@/lib/features/yarnDetails/yarnDetailsApi";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReturnChalan from "./Return/ReturnChalan"
const InfoOfYarn = ({ anotherInfo,item, index }) => {
    const [deleteYarnInfoWithDetail, { isError }] = useDeleteYarnInfoWithDetailMutation()
    const { returnQuantity, createdAt, id, yarnInfoID } = item
    const handleDelete = () => {
        deleteYarnInfoWithDetail(id)
    }
    return (
        <>
            <div className="border-t flex">
                <span className="font-mono ">{index + 1}.</span>
                <span className="border-r px-2 font-mono ">Returned Quantity : {returnQuantity} KG </span>
                <span className="border-r px-1 font-mono ">  Date : {createdAt && format(createdAt, "PPp")} </span>
                <button className="border-r font-mono cursor-pointer" onClick={handleDelete}> <MdDelete size={22} color={"red"} /></button>
                <button className="border-r font-mono cursor-pointer"  >

                    <PDFDownloadLink document={<ReturnChalan data={item} anotherInfo={anotherInfo} id={id} />} fileName={`Return Chalan Number ${id}`}>
                        {({ blob, url, loading, error }) =>
                            loading ? 'Loading...' : <MdFileDownload size={22} color="green" />
                        }
                    </PDFDownloadLink></button>
            </div>
            {isError && "Deleting Error"}
        </>

    )
};
export default InfoOfYarn;