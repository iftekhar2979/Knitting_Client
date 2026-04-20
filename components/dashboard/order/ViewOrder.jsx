"use client";
import { useState, useMemo, useEffect } from "react";
import { useGetOrderQuery } from "@/lib/features/order/orderApi";
import { DataTable } from "../company/DataTable";
import { columns } from "./columns";
import Loading from "@/components/utils/Loading";
import Error from "@/components/utils/Error";

// Custom hook for debouncing values
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const ViewOrder = () => {
  const [pageIndex, setPageIndex] = useState(0); // 0-based index
  const [pageSize, setPageSize] = useState(30);
  const [filters, setFilters] = useState([]);

  // Debounce the filters to avoid excessive API calls
  const debouncedFilters = useDebounce(filters, 500);

  // Map tanstack table filters to API parameters
  const queryParams = useMemo(() => {
    const params = {
      page: pageIndex + 1,
      limit: pageSize,
    };

    debouncedFilters.forEach(filter => {
      if (filter.value !== undefined && filter.value !== null && filter.value !== "") {
        params[filter.id] = filter.value;
      }
    });

    return params;
  }, [pageIndex, pageSize, debouncedFilters]);

  const { data, isLoading, isError, error } = useGetOrderQuery(queryParams, {
    refetchOnMountOrArgChange: true,
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Note: We don't reset pageIndex here immediately because filters are debounced.
    // We'll reset it when the debounced filters actually change.
  };

  // Reset to first page when debounced filters change
  useEffect(() => {
    setPageIndex(0);
  }, [debouncedFilters]);

  if (isLoading) return <Loading />;
  if (isError) return <Error data={"Fetching Data Error"} />;

  return (
    <DataTable
      columns={columns}
      data={data?.orders || []}
      total={data?.total || 0}
      pageIndex={pageIndex}
      pageSize={pageSize}
      onPageChange={setPageIndex}
      onPageSizeChange={setPageSize}
      onFilterChange={handleFilterChange}
      manualFiltering={true}
      searchingValue={"orderNumber"}
      placeholder={"Filter with Order Number..."}
    />
  );
};

export default ViewOrder;

