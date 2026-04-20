// components/dashboard/chalan/ShowChalan.jsx
"use client"
import React from 'react';
import { useAppSelector } from '@/lib/hooks';
import { useGetSingleDeliveryQuery } from '@/lib/features/delivery/deliveryApi';
import { Button } from '@/components/ui/button';
import { FaPrint } from 'react-icons/fa';
import Loading from '@/components/utils/Loading';
import Error from "@/components/utils/Error";
import dynamic from 'next/dynamic';

// ✅ Each wrapper is dynamically imported as a whole unit — no cross-boundary children
const ChalanViewer = dynamic(() => import('./ChalanViewer'), { ssr: false, loading: () => <Loading /> });
const ChalanDownloadLink = dynamic(() => import('./ChalanDocumentLink'), { ssr: false });

const ShowChalan = () => {
    const state = useAppSelector(state => state.chalanSlice);
    const { data, isLoading, isError } = useGetSingleDeliveryQuery(state?.id, { skip: !state?.id });
    const chalanRef = React.useRef(null);

    if (isLoading) return <Loading />;
    if (isError) return <Error data={"Fetching Error!!!"} />;
    if (!state?.id || !data) return null;

    // Sanitize Redux proxy state
    const sanitizedData = JSON.parse(JSON.stringify(data));
    const sanitizedState = JSON.parse(JSON.stringify(state));

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="relative">
            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    body * { visibility: hidden !important; }
                    .print-section, .print-section * { visibility: visible !important; }
                    .print-section { position: absolute; left: 0; top: 0; width: 100% !important; margin: 0 !important; padding: 0 !important; }
                    @page { size: auto; margin: 0mm; }
                }
            `}} />

            <h2 className='text-center my-6 font-bold text-2xl print:hidden'>
                Showed Chalan: {sanitizedState.id}
            </h2>

            <div className='w-full lg:w-10/12 mx-auto my-6 print-section'>
                <ChalanViewer
                    data={sanitizedData}
                    state={sanitizedState}
                    reference={chalanRef}
                />
            </div>

            <div className='flex justify-center gap-4 mb-10 print:hidden'>
                <ChalanDownloadLink
                    reference={chalanRef}
                    fileName={sanitizedState?.chalanName}
                />
                <Button variant="outline" onClick={handlePrint}>
                    <FaPrint className="mr-2" />
                    Print Chalan
                </Button>
            </div>
        </div>
    );
};

export default ShowChalan;