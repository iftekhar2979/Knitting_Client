"use client"
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import react, { useEffect } from 'react';
import Chalan from './chalan';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useGetSingleDeliveryQuery } from '@/lib/features/delivery/deliveryApi';
import { Button } from '@/components/ui/button';
import { MdDownload, MdDownloadDone, MdFontDownload } from 'react-icons/md';
import { FaDownload, FaPrint } from 'react-icons/fa';
import Loading from '@/components/utils/Loading';

const ShowChalan = (props) => {
    const state = useAppSelector(state => state.chalanSlice)
    const dispatch = useAppDispatch()
    const { data, isLoading, isError } = useGetSingleDeliveryQuery(state?.id)

    if (isLoading) {
        return <Loading/>
    }
    if (isError) {
        return <Error />
    }
    const handlePrint=()=>{
        console.log('value')
    }


    return (
        <>{state.id && data ?
            <div>
                <h2 className='text-center my-6 font-bold text-2xl'>Showed Chalan : {state.id}</h2>
                <PDFViewer className='w-9/12 mx-auto my-6' height={1100} showToolbar={false}>
                    <Chalan data={data} id={data.id} />

                </PDFViewer>
                <div className='flex justify-center '>
                <PDFDownloadLink document={<Chalan data={data} id={data.id} />} fileName={state.chalanName}>
                    {({ blob, url, loading, error }) =>
                        loading ? 'Loading...' : <Button><FaDownload style={{marginRight:"4px"}}/>Download</Button>
                    }
                </PDFDownloadLink>
                <Button className='ml-4'><FaPrint style={{marginRight:"4px"}} onClick={handlePrint}/>Print Now</Button>
                </div>

            </div>
            :
            ""
        }
        </>
    )
};
export default ShowChalan;