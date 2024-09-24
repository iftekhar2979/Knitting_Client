"use client"
import Loading from '@/components/utils/Loading';
import { useGetSingleYarnDetailsQuery } from '@/lib/features/yarnDetails/yarnDetailsApi';
import react from 'react';
import SingleYarnInfo from './SingleYarnInfo';
import { FaDownload } from "react-icons/fa6";
import { CSVLink, CSVDownload } from "react-csv";
import { format } from 'date-fns';

const YarnDetailsInfo = ({ id }) => {

    const { data, isLoading, isError } = useGetSingleYarnDetailsQuery(id)
    if (isLoading) {
        return <Loading />
    }
    let headers=[
        { label: "Company Name", key: "company" },
        { label: "Yarn Type", key: "yarnType" },
        { label: "Received Quantity", key: "receiving_Quantity" },
        { label: "Rest Quantity", key: "rest_Quantity" },
        { label: "Returned Quantity", key: "return_quantity" },
        { label: "Received At", key: "received_at" },
        
      ];
let statementDate=data?.map(item=>{
    return {
        company:item.company.companyName,
        yarnType:item.yarnType,
        receiving_Quantity:item.ReceivingQuantity,
        rest_Quantity:item.restQuantity,
        received_at: new Date(item.createdAt),
        return_quantity: item.ReceivingQuantity -item.restQuantity
    }
})
    return (
        <div>
            <h2 className="text-center text-3xl underline font-serif flex">Yarn Information  </h2>
            <CSVLink data={statementDate} headers={headers}><FaDownload size={30}/></CSVLink>;
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 font-serif my-4">
                {data?.map((item ,index)=> <SingleYarnInfo key={item.id} index={index} item={item} />)}
            </div>
    </div>
    )
};
export default YarnDetailsInfo;