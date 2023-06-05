import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { Column, useGlobalFilter, useSortBy, useTable } from "react-table";
import useFetchData from "../../hooks/useFetchData";
import { GlobalFilter } from "./../GlobalFilter";
import "./Tables.css";
import { SingleCustomerDetails } from "./SingleCustomerDetails";

export const Customers = () => {
  const [data, setData] = useState<CustomerData[]>([]);
  const [idOfCurrentlySelectedRow, setIdOfCurrentlySelectedRow] = useState<number | null>(null);
  //used below to distinguish the column within the table
  const columnContainingId = 6;

  const { fetchedData, loading, error, refetchData } = useFetchData<CustomerData[]>("/customer/");
  useEffect(() => {
    if (fetchedData) {
      // Reverse the array so the last entered item will be at the top of the table
      setData(fetchedData.reverse());
    }
  }, [fetchedData]);
  // Once the data is fetched, set the default row to the record at top of the table
  if (idOfCurrentlySelectedRow === null && data.length > 0) {
    setIdOfCurrentlySelectedRow(data[0].customer_id);
  }

  // define column configuration object.
  const columns: Column<CustomerData>[] = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: " Rep",
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
        Header: "ID",
        accessor: "customer_id",
      },
    ],
    []
  );

  // eslint-disable-next-line
  const handleClickOnRow = (event: any) => {
    const id = event.nativeEvent.target?.parentNode.childNodes[columnContainingId].innerText;

    setIdOfCurrentlySelectedRow(Number(id));
  };

  const tableInstance = useTable({ columns, data }, useGlobalFilter, useSortBy);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } = tableInstance;
  const { globalFilter } = state;

  // Once we have an id of a selected record, find the record within the data array
  let detailsSelectedCustomer = {} as CustomerData;
  if (idOfCurrentlySelectedRow) {
    const SingleCustomerData = data.find((row) => row.customer_id === idOfCurrentlySelectedRow);
    if (SingleCustomerData) {
      detailsSelectedCustomer = SingleCustomerData;
    }
  }

  return (
    <>
      <h1>
        {" "}
        <span>Customers</span>
      </h1>
      <>
        <div className="table-wrapper">
          {loading && (
            <div className="error-loading">
              <span>Loading.....</span>
            </div>
          )}
          {error && (
            <div className="error-loading">
              <span>Error. {error?.message}</span>
            </div>
          )}
          {!loading && !error && (
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr className="table-heading" {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render("Header")}
                        {/* exclude 'contact phone'  and 'Eircode' from sort*/}
                        {column.Header !== "Contact phone" && column.Header !== "Eircode" && (
                          <span className="sort-arrows">{column.isSorted ? column.isSortedDesc ? <FaSortUp /> : <FaSortDown /> : <FaSort />}</span>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <motion.tr
                      {...row.getRowProps()}
                      onClick={handleClickOnRow}
                      initial={{ y: 50 }}
                      animate={{ y: 0 }}
                      className={row.cells[columnContainingId].value === idOfCurrentlySelectedRow ? "row-selected" : ""}
                    >
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
            setIdOfCurrentlySelectedRow={setIdOfCurrentlySelectedRow}
            customerDetails={detailsSelectedCustomer}
            refetchData={refetchData}
            loading={loading}
          />
        )}
      </>
    </>
  );
};
