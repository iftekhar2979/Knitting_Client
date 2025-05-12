"use client"
import { DataTable } from '@/components/dashboard/company/DataTable';
import Error from '@/components/utils/Error';
import Loading from '@/components/utils/Loading';
import { useGetAllDeliveryQuery, } from '@/lib/features/delivery/deliveryApi';
import { columns } from './columns';
import { useState } from 'react';

const AllDeliveryLists = ({}) => {
    const [pageIndex, setPageIndex] = useState(0); // 0-based index
    const [pageSize, setPageSize] = useState(50);
  
    const { data, isLoading, isError, error } = useGetAllDeliveryQuery({
      page: pageIndex + 1,
      limit: pageSize,
    }, {
      refetchOnMountOrArgChange: true,
    });
  
    if(isLoading){
        return <Loading/>
    }
    if(isError){
        return <Error data={'Fetching Data Error !!!'}/>
    }
    return (
        <>

         <DataTable
              columns={columns}
              data={data?.data || []}
              total={data?.total || 0}
              pageIndex={pageIndex}
              pageSize={pageSize}
              onPageChange={setPageIndex}
              onPageSizeChange={setPageSize}
              searchingValue={"id"}
              placeholder={"Filter with Chalan Number..."}
            />
        </>
    )
};
export default AllDeliveryLists;