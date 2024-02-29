"use client"
import Loading from '@/components/utils/Loading';
import { useGetSingleYarnDetailsQuery } from '@/lib/features/yarnDetails/yarnDetailsApi';
import react from 'react';
import SingleYarnInfo from './SingleYarnInfo';

const YarnDetailsInfo = ({ id }) => {

    const { data, isLoading, isError } = useGetSingleYarnDetailsQuery(id)
    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <h2 className="text-center text-3xl underline font-serif">Yarn Information</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 font-serif my-4">
                {data?.map(item => <SingleYarnInfo key={item.id} item={item} />)}
            </div>
    </div>
    )
};
export default YarnDetailsInfo;