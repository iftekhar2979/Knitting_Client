"use client";
import { useState } from "react";
import { useGetOrderQuery } from "@/lib/features/order/orderApi";
import { DataTable } from "../company/DataTable";
import { columns } from "./columns";
import Loading from "@/components/utils/Loading";
import Error from "@/components/utils/Error";

const ViewOrder = () => {
  const [pageIndex, setPageIndex] = useState(0); // 0-based index
  const [pageSize, setPageSize] = useState(50);

  const { data, isLoading, isError, error } = useGetOrderQuery({
    page: pageIndex + 1,
    limit: pageSize,
  }, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error data={"Fetching Data Error"} />;
console.log(data)
  return (
    <DataTable
      columns={columns}
      data={data?.orders || []}
      total={data?.total || 0}
      pageIndex={pageIndex}
      pageSize={pageSize}
      onPageChange={setPageIndex}
      onPageSizeChange={setPageSize}
      searchingValue={"orderNumber"}
      placeholder={"Filter with Order Number..."}
    />
  );
};

export default ViewOrder;
