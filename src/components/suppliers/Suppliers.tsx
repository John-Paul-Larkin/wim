import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { Column, useGlobalFilter, useSortBy, useTable } from "react-table";
import useFetchData from "../../hooks/useFetchData";
import { GlobalFilter } from "./../GlobalFilter";
import { SingleSupplierDetails } from "./SingleSupplierDetails";

export const Suppliers = () => {
  const [data, setData] = useState<SupplierData[]>([]);
  const [idOfCurrentlySelectedRow, setIdOfCurrentlySelectedRow] = useState<number | null>(null);

  // fetch the initial table data
  const { fetchedData, loading, error, refetchData } = useFetchData<SupplierData[]>("/supplier/");

  useEffect(() => {
    if (fetchedData) {
      // Reverse the array so the last entered item will be at the top of the table
      setData(fetchedData.reverse());
    }
  }, [fetchedData]);

  // Once the data is fetched, set the default row to the record at top of the table
  if (idOfCurrentlySelectedRow === null && data.length > 0) {
    setIdOfCurrentlySelectedRow(data[0].supplier_id);
  }

  // define column configuration object.
  const columns: Column<SupplierData>[] = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Rep",
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
        Header: "Supplier ID",
        accessor: "supplier_id",
      },
    ],
    []
  );
  
  //used below to distinguish the row within the table
  const columnContainingId = 6;
  // eslint-disable-next-line
  const handleClickOnRow = (event: any) => {
    const id = event.nativeEvent.target.parentNode.childNodes[columnContainingId].innerText;

    setIdOfCurrentlySelectedRow(Number(id));
  };

  const tableInstance = useTable({ columns, data }, useGlobalFilter, useSortBy);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter } = tableInstance;
  const { globalFilter } = state;

  // Once we have an id of a selected record, find the record within the data array
  let detailsSelectedSupplier = {} as SupplierData;
  if (idOfCurrentlySelectedRow) {
    const SingleSupplierData = data?.find((row) => row.supplier_id === idOfCurrentlySelectedRow);
    if (SingleSupplierData) {
      detailsSelectedSupplier = SingleSupplierData;
    }
  }

  return (
    <>
      <div className="heading">
        {" "}
        <span>Suppliers</span>
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
                    <motion.tr {...row.getRowProps()} onClick={handleClickOnRow} initial={{ y: 50 }} animate={{ y: 0 }}
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
        {detailsSelectedSupplier && (
          <SingleSupplierDetails
            setIdOfCurrentlySelectedRow={setIdOfCurrentlySelectedRow}
            supplierDetails={detailsSelectedSupplier}
            refetchData={refetchData}
            loading={loading}
          />
        )}
      </>
    </>
  );
};
