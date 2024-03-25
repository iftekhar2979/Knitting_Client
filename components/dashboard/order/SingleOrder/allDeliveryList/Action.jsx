
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FaDownload } from "react-icons/fa6";

import Chalan from "@/components/dashboard/chalan/chalan";
const Action = ({ id ,data}) => {
  
    return (
        <div className='flex' >
            <PDFDownloadLink document={<Chalan data={data} id={data.id} />} fileName={`Chalan Number ${data.id}`}>
                {({ blob, url, loading, error }) =>
                    loading ? 'Loading...' : <FaDownload size={32} color={"green"} className="cursor-pointer" />
                }
            </PDFDownloadLink>
        </div>
    )
};
export default Action;