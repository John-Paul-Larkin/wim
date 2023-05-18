import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { Column, useGlobalFilter, useSortBy, useTable } from "react-table";
import useFetchData from "../../hooks/useFetchData";
import { GlobalFilter } from "./../GlobalFilter";
import "./Customer.css";
import { SingleCustomerDetails } from "./SingleCustomerDetails";
// import { SingleCustomerDetails } from "./SingleCustomerDetails";

export const Customers = () => {
  const [data, setData] = useState<CustomerData[]>([]);
  const [customerIdOfCurrentlySelectedRow, setCustomerIdOfCurrentlySelectedRow] = useState<number | null>(null);

  // fetch the data
  const { fetchedData, loading, error, refetchData } = useFetchData<CustomerData[]>("/customer/");

  useEffect(() => {
    if (fetchedData) {
      // Reverse the array so the last entered item will be at the top of the table
      setData(fetchedData.reverse());
    }
  }, [fetchedData]);

  // Once the data is fetched, set the default row to the record at top of the table
  if (customerIdOfCurrentlySelectedRow === null && data.length > 0) {
    setCustomerIdOfCurrentlySelectedRow(data[0].customer_id);
  }

  // define column configuration object.
  const columns: Column<CustomerData>[] = React.useMemo(
    () => [
      {
        Header: "Business name",
        accessor: "name",
      },
      {
        Header: "Business rep",
        accessor: "rep",
      },
      {
        Header: "Contact phone",
        accessor: "contact_phone",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Eircode",
        accessor: "eircode",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Cust ID",
        accessor: "customer_id",
      },
    ],
    []
  );

  // eslint-disable-next-line
  const handleClickOnRow = (event: any) => {
    const id = event.nativeEvent.target.parentNode.childNodes[6].innerText;

    setCustomerIdOfCurrentlySelectedRow(Number(id));
  };

  const tableInstance = useTable({ columns, data }, useGlobalFilter, useSortBy);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } = tableInstance;
  const { globalFilter } = state;

  // Once we have an id of a selected record, find the record within the data array
  let detailsSelectedCustomer = {} as CustomerData;
  if (customerIdOfCurrentlySelectedRow) {
    const SingleCustomerData = data?.find((row) => row.customer_id === customerIdOfCurrentlySelectedRow);
    if (SingleCustomerData) {
      detailsSelectedCustomer = SingleCustomerData;
    }
  }

  return (
    <>
      <div className="heading">
        {" "}
        <span>Customers</span>
      </div>
      <>
        <div className="table-wrapper">
          {loading && <div className="error-loading">Loading.....</div>}
          {error && <div className="error-loading">Error. {error?.message}</div>}
          {!loading && !error && (
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr className="table-heading" {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render("Header")}
                        <span className="sort-arrows">{column.isSorted ? column.isSortedDesc ? <FaSortUp /> : <FaSortDown /> : <FaSort />}</span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);

                  return (
                    <motion.tr {...row.getRowProps()} onClick={handleClickOnRow} initial={{ y: 50 }} animate={{ y: 0 }}>
                      {row.cells.map((cell) => {
                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                      })}
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
        {detailsSelectedCustomer && (
          <SingleCustomerDetails
            setCustomerIdOfCurrentlySelectedRow={setCustomerIdOfCurrentlySelectedRow}
            customerDetails={detailsSelectedCustomer}
            refetchData={refetchData}
            loading={loading}
          />
        )}
      </>
    </>
  );
};
